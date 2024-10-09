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
    <>
      <form
        onSubmit={handleAddTask}
        action="/upload"
        method="post"
        encType="multipart/form-data"
      >
         <h1 className="mb-4 font-bold">Add Tasks</h1>
      <div className="flex space-x-2 mb-4 ">
        <input
          type="text"
          placeholder="Enter task name"
          ref={titleElement}
          className=" mb-2 rounded py-1 px-2 font-normal  text-black"
        />
        <input
          type="number"
          placeholder="Planned time (minutes)"
          ref={durationElement}
          className=" mb-2 rounded py-1 px-2 font-normal  text-black"
        />
        <button className="bg-black text-white mt-0 flex py-2 px-4 rounded-md ">
          <p className="h-4 w-4 mr-2 mt-1 ">
            <IoMdAdd />
          </p>
          Add Task
        </button>
      </div>
      </form>
    </>
  );
};

export default CreateTasks;
