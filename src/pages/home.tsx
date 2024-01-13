import { useState } from 'react';
import { CreateTask } from '../components/CreateTask';
import { Task } from '../interfaces/Task';
import { ListTasks } from '../components/ListTasks';

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
    <div className=''>

      <input
        onChange={(e) => handleChangeSearch(e.target.value)}
        value={query}
        type="text"
        placeholder="escreva sua pesquisa"
      />

      <CreateTask tasks={tasks} setTasks={setTasks}/>
      <ListTasks tasks={tasks} setTasks={setTasks}/>
    </div>
  );
}

export { Home };
