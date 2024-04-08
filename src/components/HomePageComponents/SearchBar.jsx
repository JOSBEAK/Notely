import Button from "@mui/material/Button";

import { useContext, useState } from "react";
import AddModal from "../Modal/AddModal";
import { TaskContext } from "../../TaskContext";
const SearchBar = () => {
  const [openAddModal, setOpenAddModal] = useState(false);

  const { addTask, setSearchQuery, searchQuery } = useContext(TaskContext);
  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };
  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value); // Update search query state
  };
  return (
    <div className="drop-shadow-xl h-[10vh] w-full bg-[#e0e0e0] items-center flex justify-center ">
      <>
        <input
          type="text"
          color="black"
          className="bg-gray-200 w-[80%] items-center p-2 rounded-[.25rem]"
          placeholder="Search .."
          value={searchQuery} // Bind input value to search query state
          onChange={handleSearch} // Call handleSearch on input change
        />
      </>
      <Button
        variant="contained"
        sx={{ marginLeft: "2vh", borderRadius: 4 }}
        onClick={handleOpenAddModal}
      >
        + Add
      </Button>
      <AddModal
        open={openAddModal}
        handleClose={handleCloseAddModal}
        addTask={addTask}
      />
    </div>
  );
};

export default SearchBar;
