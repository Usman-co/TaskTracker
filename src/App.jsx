import React, { useContext } from "react";
import "./App.css";
import TasksList from "./Components/TasksList";
import { TasksContext, TasksProvider } from "./store/TasksContext";
import CreateTasks from "./Components/CreateTasks";
import TaskStatusList from "./Components/TaskStatusList";

function App() {
  const {tasksList} = useContext(TasksContext)
  return (
    <TasksProvider>
      <div  className="text-center w-full bg-black p-4 text-white text-2xl max-md:text-xl max-sm:text-base font-bold max-sm:normal">
          <h1 >
            Hi 🙋‍♂️ Dude! Don't be rude Let’s add tasks 👨‍💻 to make the day easier.
          </h1>
        </div>
        <div className=" mt-2 border-2 border-inherit  drop-shadow-md  px-6 py-10 container mx-auto p-4 max-w-2xl">
          <div className="mb-8">
        <CreateTasks />
        <TasksList/>
          </div>
        </div>
        <TaskStatusList tasksList ={tasksList} />
    </TasksProvider>
  );
}

export default App;