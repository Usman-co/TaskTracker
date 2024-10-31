import React, { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as chartjs, defaults } from "chart.js/auto";
import { TasksContext } from "../store/TasksContext";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

const dailyChartData = (tasks) => {
  const dailyData = [
    { name: "Mon", onTime: 0, overdue: 0 },
    { name: "Tue", onTime: 0, overdue: 0 },
    { name: "Wed", onTime: 0, overdue: 0 },
    { name: "Thu", onTime: 0, overdue: 0 },
    { name: "Fri", onTime: 0, overdue: 0 },
    { name: "Sat", onTime: 0, overdue: 0 },
    { name: "Sun", onTime: 0, overdue: 0 },
  ];

  tasks.forEach((task) => {
    if (task.completed) {
      const taskDate = new Date(task.date);
      const dayIndex = taskDate.getDay() - 1;


      if (dayIndex >= 0 && dayIndex < 7) {
        if (task.elapsedTime <=  parseInt(task.duration * 60)) {
          dailyData[dayIndex].onTime += 1;
        } else {
          dailyData[dayIndex].overdue += 1;
        }
      }
    }
  });
  return dailyData;
};
const weeklyChartData = (tasks) => {
  const weeklyData = [
    { name: "Week 1", onTime: 0, overdue: 0 },
    { name: "Week 2", onTime: 0, overdue: 0 },
    { name: "Week 3", onTime: 0, overdue: 0 },
    { name: "Week 4", onTime: 0, overdue: 0 },
  ];

  tasks.forEach((task) => {
    if (task.completed) {
      const taskDate = new Date(task.date);
      const weekIndex = Math.floor(taskDate.getDate() / 7);
      if (weekIndex >= 0 && weekIndex < 4) {
        if (parseInt(task.elapsedTime , 10) <= parseInt(task.duration * 60 , 10)){
          weeklyData[weekIndex].onTime += 1;
        } else {
          weeklyData[weekIndex].overdue += 1;
        }
      }
    }
  });
  return weeklyData;
};

const TaskStatusList = () => {
  const tasks = useContext(TasksContext)
  const tasksList = tasks.tasksList
  const [isSwitch, setSwitch] = useState("Daily");
  const [dailyData, setDailyData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);


  useEffect(() => {
    const completedTasks = tasksList.filter((task) => task.completed);
    setDailyData(dailyChartData(completedTasks));
    setWeeklyData(weeklyChartData(completedTasks));
  }, [tasksList]);

  return (
    <div className=" mt-2 border-2 border-inherit  drop-shadow-md  px-6 py-10 container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl mb-2 font-bold max-sm:text-lg">
        Task Completion Chart
      </h1>

      {isSwitch === "Weekly" ? (
        <div className="my-4 mb-6 w-full h-96">
          <Bar
            data={{
              labels: weeklyData.map((data) => data.name),
              datasets: [
                {
                  label: "Overdue",
                  data: weeklyData.map((task) => task.overdue),
                  backgroundColor: "#EF4444",
                },
                {
                  label: "On Time",
                  data: weeklyData.map((task) => task.onTime),
                  backgroundColor: "#10B981",
                },
              ],
            }}
          />
        </div>
      ) : (
        <div className="my-4 mb-6 w-full h-96">
          <Bar
            data={{
              labels: dailyData.map((data) => data.name),
              datasets: [
                {
                  label: "Overdue",
                  data: dailyData.map((task) => task.overdue),
                  backgroundColor: "#EF4444",
                },
                {
                  label: "On Time",
                  data: dailyData.map((task) => task.onTime),
                  backgroundColor: "#10B981",
                },
              ],
            }}
          />
        </div>
      )}

      <span className=" px-2 py-4 space-x-2  rounded-md max-sm:px-1 max-sm:py-2 max-sm:space-x-1">
        <button
          className={`py-2 px-2 rounded-md text-sm  max-sm:px-1 max-sm:py-1  ${
            isSwitch === "Daily" ? "bg-black text-white" : " text-black"
          }`}
          onClick={() => {
            setSwitch("Daily");
          }}
        >
          Daily
        </button>
        <button
          className={`py-2 px-2 rounded-md text-sm max-sm:px-1 max-sm:py-1 ${
            isSwitch === "Weekly" ? "bg-black text-white" : " text-black"
          }`}
          onClick={() => {
            setSwitch("Weekly");
          }}
        >
          Weekly
        </button>
      </span>
    </div>
  );
};

export default TaskStatusList;
