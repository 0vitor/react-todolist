import { DragEvent, useEffect } from "react";
import { Task } from "../interfaces/Task";

interface taskMethods {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

function ListTasks({tasks, setTasks}: taskMethods) {

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
    event.currentTarget.classList.remove('drop')

    event.preventDefault()

    const updatedState = tasks.map((task) =>
      task.id === taskId ? { ...task, state: column } : task
    );

    setTasks(updatedState);
  };

  const allowDrop = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  };

  return (
      <>
      <div className="todo">
        <div className="title-todo">
          <h2>todo</h2>
        </div>

        <div
          className="todo-list"
          data-column="todo"
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDragOver={allowDrop}
          onDrop={(event) => drop(event, "todo")}
        >

          {tasks
            .filter((card) => card.state === "todo")
            .map((todoCard) => (
              <article
                key={todoCard.id}
                className="task"
                draggable="true"
                onDragStart={(event) => drag(event, todoCard.id)}
                data-id={todoCard.id}
              >
                <h3>{todoCard.name}</h3>
                <p>{todoCard.description}</p>
              </article>
            ))}
        </div>

      </div>
      <div
        className="in-progress"
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDragOver={allowDrop}
        onDrop={(event) => drop(event, "in progress")}
      >
        <div className="title-done">
          <h2>in progress</h2>
        </div>

        {tasks
          .filter((card) => card.state === "in progress")
          .map((todoCard) => (
            <article
              key={todoCard.id}
              className="task"
              draggable="true"
              onDragStart={(event) => drag(event, todoCard.id)}
              data-id={todoCard.id}
            >
              <h3>{todoCard.name}</h3>
              <p>{todoCard.description}</p>
            </article>
          ))}
      </div>

      <div
        className="done"
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDragOver={allowDrop}
        onDrop={(event) => drop(event, "done")}
      >
        <div className="title-done">
          <h2>done</h2>
        </div>
        {tasks
          .filter((card) => card.state === "done")
          .map((todoCard) => (
            <article
              key={todoCard.id}
              className="task"
              draggable="true"
              onDragStart={(event) => drag(event, todoCard.id)}
              data-id={todoCard.id}
            >
              <h3>{todoCard.name}</h3>
              <p>{todoCard.description}</p>
            </article>
          ))}
      </div>
      </>
  );
}

export { ListTasks };
