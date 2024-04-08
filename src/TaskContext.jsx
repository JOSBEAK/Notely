import { createContext, useEffect, useState } from "react";

const TaskContext = createContext();

//Persisiting Storage
const initTasks = [
  {
    title: "Demo Title",
    category: "Personal",
    description:
      "lorem ipsum adapare vou. lorem ipsum adapare vou.lorem ipsum adapare vou.lorem ipsum adapare vou.lorem ipsum adapare vou.",
    selected: false,
  },
];
const getInitialState = () => {
  const tasks = sessionStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : initTasks;
};

//persisting storage

// const tasksArray = [
//   {
//     title: "Grocery Shopping",
//     category: "Personal",
//     description: "Need to buy fruits and vegetables for the week",
//     selected: false,
//   },
//   {
//     title: "Clean House",
//     category: "Home",
//     description: "Vacuum the floors and dust the furniture",
//     selected: false,
//   },
//   {
//     title: "Prepare Presentation",
//     category: "Business",
//     description: "Create slides for upcoming meeting",
//     selected: false,
//   },
//   {
//     title: "Exercise Routine",
//     category: "Personal",
//     description: "Go for a run in the morning",
//     selected: false,
//   },
//   {
//     title: "Fix Leaky Faucet",
//     category: "Home",
//     description: "Call plumber to fix the leak in the kitchen sink",
//     selected: false,
//   },
//   {
//     title: "Client Meeting",
//     category: "Business",
//     description: "Discuss project updates with client",
//     selected: false,
//   },
//   {
//     title: "Read Book",
//     category: "Personal",
//     description: "Start reading 'The Great Gatsby'",
//     selected: false,
//   },
//   {
//     title: "Plan Vacation",
//     category: "Personal",
//     description: "Research destinations for summer vacation",
//     selected: false,
//   },
//   {
//     title: "Pay Bills",
//     category: "Home",
//     description: "Pay electricity and water bills online",
//     selected: false,
//   },
//   {
//     title: "Budget Review",
//     category: "Business",
//     description: "Review monthly expenses and budget allocation",
//     selected: false,
//   },
//   {
//     title: "Yoga Session",
//     category: "Personal",
//     description: "Attend evening yoga class",
//     selected: false,
//   },
//   {
//     title: "Organize Closet",
//     category: "Home",
//     description: "Declutter clothes and organize closet shelves",
//     selected: false,
//   },
//   {
//     title: "Team Meeting",
//     category: "Business",
//     description: "Discuss project timelines and tasks with team members",
//     selected: false,
//   },
//   {
//     title: "Call Parents",
//     category: "Personal",
//     description: "Check in with parents and see how they're doing",
//     selected: false,
//   },
//   {
//     title: "Fix Laptop Issue",
//     category: "Home",
//     description: "Troubleshoot laptop for performance problems",
//     selected: false,
//   },
//   {
//     title: "Client Presentation",
//     category: "Business",
//     description: "Prepare slides and materials for client presentation",
//     selected: false,
//   },
//   {
//     title: "Visit Friend",
//     category: "Personal",
//     description: "Plan a visit to meet a friend for coffee",
//     selected: false,
//   },
//   {
//     title: "Gardening",
//     category: "Home",
//     description: "Plant new flowers in the garden",
//     selected: false,
//   },
//   {
//     title: "Project Deadline",
//     category: "Business",
//     description: "Work on project tasks to meet upcoming deadline",
//     selected: false,
//   },
//   {
//     title: "Learn New Skill",
//     category: "Personal",
//     description: "Start online course to learn coding",
//     selected: false,
//   },
// ];

// eslint-disable-next-line react/prop-types
const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(getInitialState);
  const [completedFilter, setCompletedFilter] = useState(false);

  const [searchQuery, setSearchQuery] = useState(""); // State for holding search query
  const [tabsFilter, setTabsFilter] = useState("All");
  //persisting storage
  useEffect(() => {
    sessionStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const showSelected = () => {
    setCompletedFilter(!completedFilter);
  };
  const addTask = (task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
  };
  const editTask = (updatedTask, id) => {
    const updatedTasks = tasks.map((task, index) =>
      index === id ? { ...task, ...updatedTask } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task, index) => index !== id);
    setTasks(updatedTasks);
  };

  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map((task, index) =>
      index === id ? { ...task, selected: !task.selected } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        toggleTaskCompletion,
        editTask,
        showSelected,
        completedFilter,
        setSearchQuery,
        searchQuery,
        tabsFilter,
        setTabsFilter,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export { TaskProvider, TaskContext };
