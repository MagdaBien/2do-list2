import { v4 as uuidv4 } from "uuid";
import TaskForm from "./TaskForm";

const AddTaskForm = ({ addHandlerSubmit }) => {
  const handlerSubmit = (taskName) => {
    const myTask = { id: uuidv4(), name: taskName };
    addHandlerSubmit(myTask);
  };

  return (
    <div id="editForm" className="add-form">
      <TaskForm action="add" handlerSubmit={handlerSubmit} defInputValue="" />
    </div>
  );
};

export default AddTaskForm;
