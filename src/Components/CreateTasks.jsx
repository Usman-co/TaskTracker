import React, { useContext, useRef } from "react";
import { TasksContext } from "../store/TasksContext";
import { useNavigate } from "react-router";
import { CiSaveUp2 } from "react-icons/ci";

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

    titleElement.current.value = "";
    durationElement.current.value = "";
    dueDateElement.current.value = "";
    if (!title || !duration || !dueDate) {
      alert("Please fill all fields");
      return;
    }

    // let totalDuration = 0;
    // const hoursMatch = duration.match(/(\d+)\s*hours?/);
    // const minutesMatch = duration.match(/(\d+)\s*minutes?/);
  
    // if (hoursMatch) {
    //   totalDuration += parseInt(hoursMatch[1], 10) * 3600;
    // }
    // if (minutesMatch) {
    //   totalDuration += parseInt(minutesMatch[1], 10) * 60;
    // }
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
    <center>
      <form
        className="form"
        onSubmit={handleAddTask}
        action="/upload"
        method="post"
        encType="multipart/form-data"
      >
        <p>Add Your New Routine Work</p>
        <div className="form-content-container">
        <input type="text" ref={titleElement} placeholder="enter new task" />
        <input type="text" placeholder="enter time duration"
          ref={durationElement}
           />
        <input type="date" ref={dueDateElement} placeholder="Enter due date" ></input>
        <select name="tasks" id="tasks" ref={categoryElement}>
          <option value="No category">No Category</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="wishlist">Wishlist</option>
          <option value="birthday">Birthday</option>
        </select>
        </div>
        <button className="save-tasks-btn btn"><CiSaveUp2 /></button>
      </form>
    </center>
  );
};

export default CreateTasks;
