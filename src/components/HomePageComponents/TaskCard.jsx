import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditModal from "../Modal/EditModal";
import DeleteModal from "../Modal/DeleteModal";
import { useContext, useState } from "react";
import { TaskContext } from "../../TaskContext";
import PropTypes from "prop-types";

const TaskCard = ({ task, id }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [isCompleted, setIsCompleted] = useState(task.selected || false);

  const { deleteTask, toggleTaskCompletion } = useContext(TaskContext);

  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const formattedDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  return (
    <div
      className={`w-[26rem] h-[14rem] bg-gray-100 shadow-2xl rounded-xl p-3 flex flex-col justify-between${
        isCompleted ? " bg-gray-300" : ""
      }`}
    >
      <span className="flex items-center justify-between">
        <span
          className={`p-2 ${
            isCompleted ? "bg-gray-400" : "bg-purple-400"
          } rounded-3xl`}
        >
          {task.category}
        </span>
        <span>
          <Checkbox
            style={{ color: "gray" }}
            onChange={() => {
              setIsCompleted(!isCompleted);
              toggleTaskCompletion(id);
            }}
            checked={isCompleted}
          />
          <button className="p-2" onClick={handleOpenEditModal}>
            <EditIcon style={{ color: "gray" }} />
          </button>
          <button className="p-2" onClick={handleOpenDeleteModal}>
            <DeleteForeverIcon style={{ color: "gray" }} />
          </button>
        </span>
      </span>
      <div className="overflow-scroll text-gray-700">
        <h1
          className={`text-xl font-bold ${
            isCompleted ? "line-through italic text-gray-500" : ""
          }`}
        >
          {task.title}
        </h1>
        <p
          className={`pt-2 ${
            isCompleted ? "line-through italic text-gray-500" : ""
          }`}
        >
          {task.description}
        </p>
      </div>
      <div className="flex justify-end">
        <p className="text-gray-400">{formattedDate}</p>
      </div>
      <DeleteModal
        open={openDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDelete={() => deleteTask(id)}
        id={id}
      />
      <EditModal
        open={openEditModal}
        handleClose={handleCloseEditModal}
        task={task}
        id={id}
      />
    </div>
  );
};
TaskCard.propTypes = {
  task: PropTypes.shape({
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    // Add more specific PropTypes for other properties if necessary
  }).isRequired,
  id: PropTypes.number.isRequired,
};

export default TaskCard;
