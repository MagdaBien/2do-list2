import { useState } from "react";

const TaskForm = ({ action, handlerSubmit, defInputValue }) => {
  const [taskName, setTaskName] = useState(defInputValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    handlerSubmit(taskName);
    setTaskName("");
  };

  return (
    <form id="add-task-form" onSubmit={handleSubmit}>
      <input
        className="text-input"
        autoComplete="off"
        type="text"
        placeholder="Type your description"
        id="task-name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button className="btn" type="submit">
        {action === "add" ? "ADD" : "SAVE CHANGE"}
      </button>
    </form>
  );
};

export default TaskForm;
