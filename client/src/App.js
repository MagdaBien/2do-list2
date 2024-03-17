import { useState } from "react";
import io from "socket.io-client";
import { useEffect } from "react";
import AddTaskForm from "./components/AddTaskForm";
import EditTaskForm from "./components/EditTaskForm";

const App = () => {
  const [socket, setSocket] = useState();
  const [tasks, setTasks] = useState([]);
  const [action, setAction] = useState("add");
  const [editedTask, setEditedTask] = useState();

  useEffect(() => {
    const socket = io("ws://localhost:8000", { transports: ["websocket"] });
    setSocket(socket);
    socket.on("addedTask", (task) => addTask(task));
    socket.on("updatedTask", (task) => updateTask(task));
    socket.on("removedTask", (taskId) => removeTask(taskId, false));
    socket.on("updateData", (tasks) => setTasks(tasks));

    return () => {
      socket.disconnect();
    };
  }, []);

  const removeTask = (id, isEmitted) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
    if (isEmitted) socket.emit("removeTask", id);
  };

  const editTask = (myTask) => {
    setAction("edit");
    setEditedTask(myTask);
  };

  const addTask = (newTask) => {
    setTasks((tasks) => [...tasks, newTask]);
  };

  const updateTask = (myTask) => {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === myTask.id ? { ...task, ...myTask } : task
      )
    );
  };

  const addHandlerSubmit = (myTask) => {
    addTask(myTask);
    socket.emit("addTask", myTask);
  };

  const editHandlerSubmit = (myTask) => {
    updateTask(myTask, true);
    socket.emit("updateTask", myTask);
    setAction("add");
  };

  return (
    <div className="App">
      <header>
        <h1>ToDoList.app</h1>
      </header>

      <section className="tasks-section" id="tasks-section">
        <h2>Tasks</h2>

        {action === "add" ? (
          <AddTaskForm addHandlerSubmit={addHandlerSubmit} />
        ) : (
          <EditTaskForm
            editHandlerSubmit={editHandlerSubmit}
            editedTask={editedTask}
          />
        )}

        <ul className="tasks-section__list" id="tasks-list">
          {tasks.map((task) => (
            <li key={task.id} className="task">
              <div>{task.name}</div>
              <div>
                <button
                  className="btn btn--green"
                  onClick={(e) => {
                    editTask({ id: task.id, name: task.name });
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn--red"
                  onClick={(e) => {
                    removeTask(task.id, true);
                  }}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default App;
