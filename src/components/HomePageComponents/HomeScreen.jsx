import HomeTabs from "./HomeTabs";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TaskCard from "./TaskCard";
import { useContext } from "react";
import { TaskContext } from "../../TaskContext";

const HomeScreen = () => {
  const { tasks, showSelected, completedFilter, searchQuery, tabsFilter } =
    useContext(TaskContext);

  const filteredTasks = completedFilter
    ? tasks.filter((task) => task.selected)
    : tabsFilter !== "All"
    ? tasks.filter((task) =>
        task.category.toLowerCase().includes(tabsFilter.toLowerCase())
      )
    : tasks.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

  console.log(tabsFilter);

  return (
    <div className="flex-grow items-center justify-center  w-full h-[100%] bg-gray-200 overflow-scroll">
      <div className="p-5 mt-5 ml-20 mr-20">
        <div className="mb-5">
          <p className="text-2xl font-extrabold text-gray-700">Your Notes</p>
        </div>
        <div className="flex items-center justify-between">
          <HomeTabs />
          <span className="flex mb-10 ">
            <FormControlLabel
              control={<Checkbox onChange={showSelected} />}
              label="Show only completed components"
              labelPlacement="end"
            />
          </span>
        </div>
        {filteredTasks.length !== 0 ? (
          <div className="grid grid-cols-3 gap-2">
            {filteredTasks.map((task, id) => (
              <div key={id}>
                <TaskCard task={task} id={id} />
              </div>
            ))}
          </div>
        ) : (
          <div>
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/empty-wallet-5521510-4610094.png?f=webp"
              alt="string"
              className="mx-auto w-150"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
