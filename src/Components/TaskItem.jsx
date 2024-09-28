import React, { useState, useEffect, useContext } from "react";
import { FaPlay } from "react-icons/fa6";
import { FaPause } from "react-icons/fa6";
import { MdDoneOutline } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { TasksContext } from "../store/TasksContext";

const TaskItem = ({ task }) => {
  const { deletTask, updateTask } = useContext(TasksContext);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(task.elapsedTime || 0);
  const [extraTime, setExtraTime] = useState(task.extraTime || 0);
  const [completionMsg, setCompletionMsg] = useState("");
  const [duration, setDuration] = useState(() => {
    if (typeof task.duration === "string") {
      let totalDuration = 0;
      const hoursMatch = task.duration.match(/(\d+)\s*hours?/);
      const minutesMatch = task.duration.match(/(\d+)\s*minutes?/);

      if (hoursMatch) {
        totalDuration += parseInt(hoursMatch[1], 10) * 3600;
      }

      if (minutesMatch) {
        totalDuration += parseInt(minutesMatch[1], 10) * 60;
      }

      return totalDuration;
    }

    return task.duration;
  });

  useEffect(() => {
    let timer;
    let extraTimer;

    if (isRunning && duration > 0) {
      timer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
        setDuration((prevDuration) => Math.max(prevDuration - 1, 0));
      }, 1000);
    } else if (isRunning && duration === 0) {
      extraTimer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
        setExtraTime((prevTime) => prevTime + 1);
      }, 1000);
      // setIsRunning(true);
      // setExtraTime("Extra time start")
      // setCompletionMsg("Task is Completed.");c
    }

    return () => {
      clearInterval(timer);
      clearInterval(extraTimer);
    };
  }, [isRunning, duration]);

  const startTimer = () => {
    setIsRunning(true);
    setCompletionMsg("");
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const taskComplete = () => {
    if (elapsedTime > duration) {
      const result = elapsedTime - duration;
      setExtraTime(result);
    }
    setIsRunning(false);
    setDuration(duration);
    setCompletionMsg("Completed");

    updateTask({
      ...task,
      duration,
      elapsedTime,
      extraTime,
      completed: true,
    });
  };

  return (
    <div className="my-2 w-72 px-2 py-2 rounded-xl text-center text-black hover:shadow hover:-translate-y-2 hover:bg-black hover:text-white mb-4 duration-300 bg-gray-200 shadow-2xl  ">
      <div
        className="font-semibold text-2xl cursor-pointer text-red-500 text-end"
        onClick={() => deletTask(task.id)}
      >
        <MdDeleteForever />
      </div>
      <h3
        style={{ textDecorationLine: completionMsg ? "line-through" : "none" }}
      >
        {task.title}
      </h3>
      <p>Time spent: {formatTime(elapsedTime)}</p>
      <p>Duration Time : {timeFormat(duration)}</p>
      <p>Due Date: {task.dueDate}</p>
      {completionMsg && (
        <p className=" text-green-600 bg-green-100 rounded">
          {completionMsg}👍{`Extra time: ${formatTime(extraTime)}`}
        </p>
      )}
      <button
        className=" rounded bg-green-500 text-white duration-300 hover:shadow hover:-translate-y-1 h-7 w-8 my-2"
        onClick={startTimer}
      >
        <FaPlay className="text-right pl-2 w-6" />
      </button>
      <button
        className=" rounded bg-red-600 mx-2 text-white duration-300 hover:shadow hover:-translate-y-1 h-7 w-8 my-2"
        onClick={stopTimer}
      >
        <FaPause className="text-right pl-2 h-5 w-6" />
      </button>
      <button
        onClick={taskComplete}
        className=" rounded bg-blue-600 mx-2 text-white duration-300 hover:shadow hover:-translate-y-1 h-7 w-8 my-2"
      >
        <MdDoneOutline className="text-right pl-2 h-5 w-6" />
      </button>
    </div>
  );
};

const formatTime = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${hrs > 0 ? `${hrs}h ` : ""}${mins > 0 ? `${mins}m ` : ""}${secs}s`;
};

const timeFormat = (duration) => {
  const hrs = Math.floor(duration / 3600);
  const mins = Math.floor((duration % 3600) / 60);
  const secs = duration % 60;

  return `${hrs > 0 ? `${hrs}h ` : ""}${mins > 0 ? `${mins}m ` : ""}${secs}s`;
};

export default TaskItem;
