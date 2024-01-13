import { DragEvent, useEffect } from "react";
import { Task } from "../interfaces/Task";
import { v4 as uuidv4 } from "uuid";

interface taskMethods {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

function ListTasks({ tasks, setTasks }: taskMethods) {
  const dragStart = (event) => {
    if (event.target.className.includes("card")) {
      event.target.classList.add("dragging");
    }
  };

  const dragEnd = (event) => {
    if (event.target.className.includes("card")) {
      event.target.classList.remove("dragging");
    }
  };

  useEffect(() => {
    document.addEventListener("dragstart", dragStart);
    document.addEventListener("dragend", dragEnd);

    return () => {
      document.removeEventListener("dragstart", dragStart);
      document.removeEventListener("dragend", dragEnd);
    };
  }, []);

  const dragEnter = (event: DragEvent<HTMLElement>) => {
    event.currentTarget.classList.add("drop");
  };

  const dragLeave = (event: DragEvent<HTMLElement>) => {
    event.currentTarget.classList.remove("drop");
  };

  const drag = (event: DragEvent<HTMLElement>, taskId: string) => {
    event.dataTransfer.setData("text/plain", taskId);
  };

  const drop = (event: DragEvent<HTMLDivElement>, column: string) => {
    const taskId = event.dataTransfer.getData("text/plain");
    event.currentTarget.classList.remove("drop");

    event.preventDefault();

    const updatedState = tasks.map((task) =>
      task.id === taskId ? { ...task, state: column } : task
    );

    setTasks(updatedState);
  };

  const allowDrop = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  const dragDropMethods = {
    allowDrop,
    drop,
    drag,
    dragEnd,
    dragEnter,
    dragLeave,
    dragStart,
  };

  const status = ["todo", "in-progress", "done"];
  return (
    <div className="flex justify-center gap-16">
        {status.map((state) => (
          <div className="flex flex-col">
            <Header state={state} />
            <List
              key={uuidv4()}
              dragDropMethods={dragDropMethods}
              status={state}
              tasks={tasks}
            />
          </div>
        ))}
    </div>
  );
}

const Header = ({ state }) => {
  let bg = "bg-slate-500"

  if (state == 'in-progress') {
    bg = "bg-purple-500"
  }

  if(state == 'done') {
    bg = 'bg-green-500'
  }

  return (
    <div className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white w-64`}>
      <h2>{state}</h2>
    </div>
  );
};

const List = ({ dragDropMethods, status, tasks }) => (
  <div
    className=""
    data-column={status}
    onDragEnter={dragDropMethods.dragEnter}
    onDragLeave={dragDropMethods.dragLeave}
    onDragOver={dragDropMethods.allowDrop}
    onDrop={(event) => dragDropMethods.drop(event, status)}
  >
    {tasks
      .filter((task: Task) => task.state === status)
      .map((task: Task) => (
        <Task drag={dragDropMethods.drag} task={task}/>
      ))}
  </div>
);

const Task = ({drag, task}) => {
  return (<div
        className="relative p-4 mt-8 shadow-md rounded-md cursor-grabbing"
        key={task.id}
        draggable="true"
        onDragStart={(event) => drag(event, task.id)}
        data-id={task.id}
      >
        <h3>{task.name}</h3>
        <p>{task.description}</p>
      </div>
    )
}
export { ListTasks };
