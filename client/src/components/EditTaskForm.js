import TaskForm from "./TaskForm";

const EditTaskForm = ({ editHandlerSubmit, editedTask }) => {
  const handlerSubmit = (taskName) => {
    const myTask = { id: editedTask.id, name: taskName };
    editHandlerSubmit(myTask);
  };

  return (
    <div id="editForm" className="add-form">
      <TaskForm
        action="edit"
        handlerSubmit={handlerSubmit}
        defInputValue={editedTask.name}
      />
    </div>
  );
};

export default EditTaskForm;
