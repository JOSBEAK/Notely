import * as React from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import { TaskContext } from "../../TaskContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: 4,
};

export default function DeleteModal({ open, handleClose, id }) {
  const { deleteTask } = React.useContext(TaskContext);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-2xl font-bold text-gray-700">Delete Note</p>
            <button onClick={handleClose}>X</button>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span>
              <p className="text-gray-500">
                Are you sure you want to delete this note?
              </p>
            </span>
          </div>
          <div className="flex justify-end">
            <button className="mr-3 text-gray-400" onClick={handleClose}>
              Cancel
            </button>
            <button
              className="p-2 text-white bg-red-600 rounded-full"
              onClick={() => {
                deleteTask(id);
                handleClose();
              }}
            >
              Delete
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
DeleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};
