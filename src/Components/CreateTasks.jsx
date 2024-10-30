import React, { useContext, useRef } from "react";
import { TasksContext } from "../store/TasksContext";
import { useNavigate } from "react-router";
import { IoMdAdd } from "react-icons/io";

const CreateTasks = () => {
  const { addTasks } = useContext(TasksContext);

  const titleElement = useRef();
  const durationElement = useRef();

  const handleAddTask = (event) => {
    event.preventDefault();
    const title = titleElement.current.value;
    const duration = durationElement.current.value;

    titleElement.current.value = "";
    durationElement.current.value = "";
    if (!title || !duration) {
      alert("Please fill all fields");
      return;
    }

    const newTask = {
      title,
      duration,
      elapsedTime: 0,
      completed: false,
      date: new Date().toISOString().split('T')[0]
    };
    console.log("Adding new task:", newTask);
    addTasks(newTask);
  };
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold max-sm:text-lg">Add Tasks</h1>
      <div className="flex flex-col  space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
        <div className="flex space-x-2 max-sm:space-x-1">
        <input
          type="text"
          placeholder="Enter task name"
          ref={titleElement}
          className="w-full  sm:w-auto h-12 max-sm:h-10 rounded-md font-normal px-2 border-2 border-gray-300 text-black"
        />
        <input
          type="number"
          placeholder="Planned time (minutes)"
          ref={durationElement}
           className="w-full  sm:w-auto h-12 max-sm:h-10 rounded-md px-2 font-normal border-2 border-gray-300 text-black"
        />
        <div></div>
        <button
  className="max-sm:w-72 max-sm:px-0 max-sm:text-sm max-sm:h-10  h-12 rounded-md flex items-center justify-center font-normal px-2 border-2 border-gray-300 bg-black text-white"
  onClick={handleAddTask}
>
  <IoMdAdd className="h-4 w-4 mr-1 max-sm:mr-0" />
  Add Task
</button>
        </div>
        
      </div>
    </div>
  );
};

export default CreateTasks;