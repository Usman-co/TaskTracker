import React from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import TasksList from "./Components/TasksList";
// import WelcomMessage from './Components/WelcomMessage'
import { TasksProvider } from "./store/TasksContext";
import CreateTasks from "./Components/CreateTasks";
import Category from "./Components/Category";
import TaskStatusList from "./Components/TaskStatusList";
import Sidebar from "./Components/Sidebar";

function App() {
  return (
    <TasksProvider>
      <div className="flex flex-col h-screen ">
      <div  className=" sticky top-0 text-center w-full  shadow-xl bg-black p-4 text-white text-2xl font-bold ">
          <h1 >
            Hi 🙋‍♂️ Usman! Let’s add tasks 👨‍💻 to make the day easier.
          </h1>
        </div>
        <div className="flex flex-grow">

        <div className="w-1/6 shadow-2xl">
            <Sidebar />
          </div>

        <div className=" flex-grow p-8 bg-white">
          <Routes>
            <Route path="/" element={<TasksList />} />
            <Route path="/create-tasks" element={<CreateTasks />} />
            <Route path="/category" element={<Category />} />
            <Route path="/task-status" element={<TaskStatusList />} />
          </Routes>
        </div>
      </div>
      </div>
    </TasksProvider>
  );
}

export default App;
