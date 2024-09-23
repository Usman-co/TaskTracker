  import React, { useState, useEffect, useContext } from "react";
  import { FaPlay } from "react-icons/fa6";
  import { FaPause } from "react-icons/fa6";
  import { MdDoneOutline } from "react-icons/md";
  import { MdDeleteForever } from "react-icons/md";
  import { TasksContext } from "../store/TasksContext";

  const TaskItem = ({ task }) => {
    const { deletTask, updateTask } = useContext(TasksContext);
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(task.elapsedTime || 0 );
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
      }else if (isRunning && duration === 0 ) {
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
      setDuration(0);
      setCompletionMsg("Completed");
    
      // Update task in the backend
      updateTask({
        ...task,
        duration,
        elapsedTime,
        extraTime,
        completed: true,
      });
    };

    // const taskComplete = () => {
    //   console.log("Task before updating:", task);
    //   if (elapsedTime > task.duration) {
    //     const result = elapsedTime - task.duration;
    //     setExtraTime(result);
    //   }
    //   setIsRunning(false);
    //   setDuration(duration);
    //   setCompletionMsg("Completed");
    //   updateTask({
    //     ...task,
    //     title,
    //     duration,
    //     elapsedTime,
    //     extraTime,
    //     completed: true,
    //   });
    // };

    return (
      <center className="task-card">
        <div className="delete-icon-btn" onClick={() => deletTask(task.id)}>
          <MdDeleteForever />
        </div>
        <h3 style={{ textDecorationLine: completionMsg ? "line-through" : "none" }}>
          {task.title}
        </h3>
        <p>Time spent: {formatTime(elapsedTime)}</p>
        <p>Left Time : {timeFormat(duration)}</p>
        <p>Due Date: {task.dueDate}</p>
        {completionMsg && (
          <p style={{ color: "green" }}>
            {completionMsg}👍{`Extra time: ${formatTime(extraTime)}`}
          </p>
        )}
        <button className="time-start-btn btn " onClick={startTimer}>
          <FaPlay />
        </button>
        <button className="time-stop-btn btn " onClick={stopTimer}>
          <FaPause />
        </button>
        <button onClick={taskComplete} className="time-reset-btn btn">
          <MdDoneOutline />
        </button>
      </center>
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
