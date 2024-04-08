import { TaskProvider } from "./TaskContext.jsx";
import Home from "./Home";

function App() {
  return (
    <TaskProvider>
      <Home />
    </TaskProvider>
  );
}

export default App;
