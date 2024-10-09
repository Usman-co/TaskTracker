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
    if (!title || !duration ) {
      alert("Please fill all fields");
      return;
    }

    const newTask = {
      title,
      duration,
      elapsedTime: 0,
      extraTime: 0,
      completed: false,
    };

    addTasks(newTask);
  };
  return (
    <div>
      <form
        onSubmit={handleAddTask}
        action="/upload"
        method="post"
        encType="multipart/form-data"
      >
         <h1 className="mb-4 font-bold">Add Tasks</h1>
      <div className="flex space-x-2 mb-4 max-sm:space-x-1 max-sm:flex-col ">
        <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Enter task name"
          ref={titleElement}
          className=" mb-2 rounded py-1 px-2  font-normal  text-black max-sm:w-1/2"
        />
        <input
          type="number"
          placeholder="Planned time (minutes)"
          ref={durationElement}
          className=" mb-2 rounded py-1 px-2 font-normal  text-black max-sm:w-1/2"
        />
        </div>
        
        <button className="bg-black text-white mt-0 flex py-2 px-4 rounded-md max-sm:w-1/4  ">
          <p className="h-4 w-4 mr-2 mt-1 max-sm:h-2 max-sm:w-2 ">
            <IoMdAdd />
          </p>
          Add Task
        </button>
      </div>
      </form>
    </div>
  );
};

export default CreateTasks;
