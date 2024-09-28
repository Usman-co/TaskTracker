import React, { useContext, useRef } from "react";
import { TasksContext } from "../store/TasksContext";
import { useNavigate } from "react-router";

const CreateTasks = () => {
  const { addTasks } = useContext(TasksContext);
  const navigate = useNavigate();

  const titleElement = useRef();
  const durationElement = useRef();
  const dueDateElement = useRef();
  const categoryElement = useRef();

  const handleAddTask = (event) => {
    event.preventDefault();
    const title = titleElement.current.value;
    const duration = durationElement.current.value;
    const dueDate = dueDateElement.current.value;
    const category = categoryElement.current.value;
console.log('new code')
    titleElement.current.value = "";
    durationElement.current.value = "";
    dueDateElement.current.value = "";
    if (!title || !duration || !dueDate) {
      alert("Please fill all fields");
      return;
    }

    const newTask = {
      title,
      duration,
      dueDate,
      category,
      elapsedTime: 0,
      extraTime: 0,
      completed: false,
    };

    addTasks(newTask);
    navigate("/");
  };
  return (
    <>
      <form
        className="bg-gray-200 shadow-xl text-black rounded-lg w-96 text-center px-4 py-4 font-bold duration-300 hover:-translate-y-1"
        onSubmit={handleAddTask}
        action="/upload"
        method="post"
        encType="multipart/form-data"
      >
        <h1 className="my-2 font-bold text-2xl">Add Your New Task Work</h1>
        <div className="flex flex-wrap justify-between text-white">
        <input className="w-40 rounded py-1 px-2  mb-2 font-semibold   text-black" type="text" ref={titleElement} placeholder="Title..." />
        <input className="w-40 mb-2 rounded py-1 px-2 font-semibold  text-black"  type="text" placeholder="Time duration... "
          ref={durationElement}
           />
        <input className="w-40 rounded py-1 px-2 font-normal   text-black"  type="date" ref={dueDateElement} placeholder="Enter due date" ></input>
        <select name="tasks" id="tasks" ref={categoryElement} className="w-40 rounded py-1 px-2 font-normal text-black" >
          <option value="No category">No Category</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="wishlist">Wishlist</option>
          <option value="birthday">Birthday</option>
        </select>
        </div>
        <button className="py-1 px-3 rounded mt-4 hover:-translate-y-1 duration-300 bg-emerald-500 hover:bg-emerald-600 text-white">Save</button>
      </form>
    </>
  );
};

export default CreateTasks;
