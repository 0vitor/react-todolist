import { Task } from "../interfaces/Task";
import React from 'react'
import { v4 as uuidv4 } from "uuid";
import { useDrag, useDrop } from "react-dnd";

interface taskMethods {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

function ListTasks({ tasks, setTasks }: taskMethods) {

  const status = ["todo", "in-progress", "done"];

  return (
    <div className="flex justify-center gap-16" key={uuidv4()}>
      {status.map((state) => (
        <div className="flex flex-col" key={uuidv4()}>
          <TaskList
            key={uuidv4()}
            state={state}
            tasks={tasks}
            setTasks={setTasks}
          />
        </div>
      ))}
    </div>
  );
}

const TaskList = ({
  state,
  tasks,
  setTasks,
}) => {

  const addItemToSection = (id) => {
    console.log(id)

    const newTasks = tasks.map(task => {
      if(task.id === id) {
        return {...task, state}
      }
      return task
    })

    console.log(tasks)
    setTasks(newTasks)
    console.log(tasks)

  }

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: Task) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }))

  return (
  <div
    ref={drop}
    className={`h-full ${isOver ? "bg-slate-200": ""}`}
    data-column={state}
  >
    <Header state={state} key={uuidv4()} />
    {tasks
      .filter((task: Task) => task.state === state)
      .map((task: Task) => (
        <Task
          task={task}
          tasks={tasks}
          setTasks={setTasks}
          key={task.id}
        />
      ))}
  </div>
)};

const Header = ({ state }) => {
  let bg = "bg-slate-500";

  if (state == "in-progress") {
    bg = "bg-purple-500";
  }

  if (state == "done") {
    bg = "bg-green-500";
  }

  return (
    <div
      className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white w-64`}
    >
      <h2>{state}</h2>
    </div>
  );
};

const Task = ({ task, tasks, setTasks }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: {id: task.id},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  const removeTask = (id) => {
    const fTasks = tasks.filter((task) => task.id !== id);

    setTasks(fTasks);
  };

  return (
    <div
      className={`relative p-4 mt-8 shadow-md rounded-md cursor-grabbing ${isDragging ? "opacity-25": "opacity-100"}`}
      ref={drag}
    >
      <h3>{task.name}</h3>
      <p>{task.description}</p>
      <button
        className="absolute right-1 bottom-1 text-slate-400"
        onClick={() => removeTask(task.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
    </div>
  );
};

export { ListTasks };
