import { useState } from 'react';
import { Board } from '../components/ListTasks';
import { CreateTask } from '../components/CreateTask';
import { Task } from '../interfaces/Task';

function Home() {
  const [query, setQuery] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const filteredTasks: Task[] = tasks.filter((task) => {
    return task.name.includes(query);
  });

  function handleChangeSearch(query: string) {
    setQuery(query);
  }

  return (
    <div className='flex flex-row'>

      <input
        onChange={(e) => handleChangeSearch(e.target.value)}
        value={query}
        type="text"
        placeholder="escreva sua pesquisa"
      />

      <CreateTask tasks={tasks} setTasks={setTasks}/>
      <Board tasks={tasks} setTasks={setTasks}/>
    </div>
  );
}

export { Home };
