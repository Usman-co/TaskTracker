import React from "react";
import "./App.css";
import TasksList from "./Components/TasksList";
import { TasksProvider } from "./store/TasksContext";
import CreateTasks from "./Components/CreateTasks";

function App() {
  return (
    <TasksProvider>
      <div className="flex flex-col h-screen ">
      <div  className="text-center w-full bg-black p-4 text-white text-2xl max-md:text-xl max-sm:text-base font-bold max-sm:normal">
          <h1 >
            Hi 🙋‍♂️ Usman! Let’s add tasks 👨‍💻 to make the day easier.
          </h1>
        </div>
        <div className=" mt-2 border-2 border-inherit  drop-shadow-md  px-6 py-10 container mx-auto p-4 max-w-4xl">
        <CreateTasks />
        <TasksList/>
        </div>
      </div>
    </TasksProvider>
  );
}

export default App;
