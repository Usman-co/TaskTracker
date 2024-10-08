import React, { useState, useEffect, useContext } from "react";
import { FaPlay } from "react-icons/fa6";
import { FaPause } from "react-icons/fa6";
import { MdDoneOutline } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { TasksContext } from "../store/TasksContext";
import { CiClock2 } from "react-icons/ci";

const TaskItem = ({ task }) => {
  const { deletTask, updateTask } = useContext(TasksContext);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(task.elapsedTime || 0);

  useEffect(() => {
    let timer;;

    if (isRunning) {
      timer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRunning]);

  const startTimer = () => {
    updateTask({...task , completed: false})
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const taskComplete = () => {
    
    setIsRunning(false)
    updateTask({
      ...task,
      elapsedTime,
      completed: true,
    });
  };

  return (
        <div className={`${task.completed && task.elapsedTime > task.duration && "bg-green-50" } ${task.completed && task.elapsedTime <= task.duration && "bg-red-50" } flex flex-col p-4 border-2 border-inherit rounded-lg`}>
          <div className="flex items-center justify-between mb-2">
          <div className="fle items-center space-x-4">
        <input  type="checkbox" 
        onClick={taskComplete} className="h-4 w-4 cursor-pointer bg-black" />
      
      <h3 className="font-semibold">
        {task.title}
      </h3>
      </div>
      {isRunning ? 
      <button
        className=" rounded bg-red-500 mx-2 text-white duration-300 h-7 w-8 my-2"
        onClick={stopTimer}
      >
        <FaPause className="text-right pl-2 h-5 w-6" />
      </button> : 
      <button
        className=" rounded bg-black text-white duration-300  h-7 w-8 my-2"
        onClick={startTimer}
      >
        <FaPlay className="text-right pl-2 w-6" />
      </button>}
      </div>
      <div className="flex items-center justify-between space-x-1">
      <p className="text-sm  flex items-center"> <CiClock2 className="mx-1"/> {timeFormat(elapsedTime)} / {timeFormat(task.duration * 60)}</p>   
      </div>
      {task.completed && task.elapsedTime < task.duration &&(
        <span className=" text-green-600 bg-green-100 rounded">
          Great job! you completed the task on time!
        </span>
      ) 
      }
      {
        task.completed && task.elapsedTime >= task.duration && <span className="bg-red-100 text-red-500"> Task not completed within planned time </span>
      }
      </div>
  );
};


const timeFormat = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
};


export default TaskItem;
