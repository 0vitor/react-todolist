import { useState } from "react";
import { Task } from "../interfaces/Task";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

interface taskMethods {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

function CreateTask({setTasks}: taskMethods) {
  const [task, setTask] = useState<Task>({
    id: "",
    name: "",
    description: "",
    state: "todo"
  })

  function handleChange(fieldName: string, value: string) {
    setTask((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }))
  }

  function addTask(e: React.FormEvent) {
    e.preventDefault()

    if(!task.name) return toast.error("task need a name")

    console.log(task.name)
    const newTask: Task = {
      ...task,
      id: uuidv4(),
    };

    setTasks((prevState) => [...prevState, newTask]);
    toast.success("task created")
  }


  return (
    <>
    <form onSubmit={addTask}>
      <input
          className="border-2 border-slate-400 rounded-md bg-slate-100 mr-4 h-12 w-64 px-1"
          onChange={(e) => handleChange("name", e.target.value)}
          value={task?.name}
          type="text"
          placeholder="name"
        />
      <input
          className="border-2 border-slate-400 rounded-md bg-slate-100 mr-4 h-12 w-64 px-1"
          onChange={e => handleChange("description", e.target.value)}
          value={task?.description}
          type="text"
          placeholder="description"
        />
      <button className="bg-cyan-500 rounded-md px-4 h-12 text-white">
        Create
      </button>
    </form>

    </>
  )
}

export { CreateTask }
