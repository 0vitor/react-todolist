import { useState } from "react";
import { Link } from "react-router-dom";
import { Board } from "../components/board";

interface Task {
  id: string;
  title: string;
}

function Home() {
  const [title, setTitle] = useState("");
  const [query, setQuery] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const filteredTasks: Task[] = tasks.filter((task) => {
    return task.title.includes(query);
  });

  function handleChange(text: string) {
    console.log(text);
    setTitle(text);
  }

  function addTask() {
    const newTask: Task = {
      id: Math.floor(Math.random() * 1001).toString(),
      title,
    };

    setTasks((prevState) => [...prevState, newTask]);
    setQuery("")
    console.log(tasks);
  }

  function handleChangeSearch(query: string) {
    setQuery(query);
  }

  return (
    <>
      <input
        onChange={(e) => handleChange(e.target.value)}
        value={title}
        type="text"
        placeholder="escreva"
      />

      <input
        onChange={(e) => handleChangeSearch(e.target.value)}
        value={query}
        type="text"
        placeholder="escreva sua pesquisa"
      />

      <button type="button" onClick={addTask}>
        add task
      </button>

      <ul>
        {(filteredTasks || tasks).map((task) => {
          return (
            <>
              <li key={task.id}>{task.title} <Link to={`/update/${task.id}`}>go to update</Link></li>
            </>
          );
        })}
      </ul>

      <Board />
    </>
  );
}

export { Home };
