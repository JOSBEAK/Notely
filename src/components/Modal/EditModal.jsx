import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useContext } from "react";
import { TaskContext } from "../../TaskContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: 4,
};
const TaskSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  category: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  description: Yup.string().required("Required"),
});

// eslint-disable-next-line react/prop-types
export default function EditModal({ open, handleClose, id }) {
  //   const [age, setAge] = React.useState("");
  //   const [numberOfWords, setNumberOfWords] = React.useState(0);

  //   const handleChange = (event) => {
  //     setAge(event.target.value);
  //   };
  //   const handleDescrChange = (e) => {
  //     setNumberOfWords(e.target.value.length);
  //   };
  const { tasks, editTask } = useContext(TaskContext);

  const handleFormSubmit = (values) => {
    editTask(values, id);
    handleClose();
  };

  const formik = useFormik({
    initialValues: {
      title: tasks[id].title,
      category: tasks[id].category,
      description: tasks[id].description,
      selected: false,
    },
    validationSchema: TaskSchema,
    onSubmit: (values) => handleFormSubmit(values),
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-gray-700">Edit Note</p>
              <button onClick={handleClose}>X</button>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex flex-col">
                <label htmlFor="title">Title</label>

                <input
                  id="title"
                  placeholder="Add Title"
                  className="p-2 bg-gray-200 rounded-md"
                  name="title"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                />
                {formik.touched.title && formik.errors.title ? (
                  <div>{formik.errors.title}</div>
                ) : null}
              </span>
              <span>
                <p>Category</p>
                <Box sx={{ minWidth: 200 }}>
                  <FormControl fullWidth>
                    <span>
                      <InputLabel id="category">Category</InputLabel>
                    </span>
                    <Select
                      labelId="category"
                      id="category-select"
                      name="category"
                      value={formik.values.category}
                      label="Category"
                      onChange={formik.handleChange}
                      sx={{ maxHeight: 40, background: "#e4e7eb" }}
                    >
                      <MenuItem value="Business">Business</MenuItem>
                      <MenuItem value="Home">Home</MenuItem>
                      <MenuItem value="Personal">Personal</MenuItem>
                    </Select>
                    {formik.touched.category && formik.errors.category ? (
                      <div>{formik.errors.category}</div>
                    ) : null}
                  </FormControl>
                </Box>
              </span>
            </div>
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <span className="flex ">
                  <label htmlFor="description" className="font-bold">
                    Description
                  </label>
                  <p className="text-gray-400">(optional)</p>
                </span>
                <p className="text-gray-400 ">{0}/200</p>
              </div>
              <div className="mt-2 ">
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  id="description"
                  name="description"
                  label="Add Description"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                />
                {formik.touched.description && formik.errors.description ? (
                  <div>{formik.errors.description}</div>
                ) : null}
              </div>
            </div>
            <div className="flex justify-end mt-2 ">
              <button className="mr-2 text-gray-400" onClick={handleClose}>
                Cancel
              </button>
              <button
                type="submit"
                className="p-3 ml-2 font-bold text-white bg-blue-400 rounded-3xl"
              >
                Edit
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
