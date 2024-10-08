import React, { useContext, useState } from "react";
import { TasksContext } from "../store/TasksContext";
import TaskItem from "./TaskItem";
import { MdAssignmentAdd } from "react-icons/md";
import { useNavigate } from "react-router";

const TasksList = () => {
  const { tasksList } = useContext(TasksContext);
  // const navigate = useNavigate();
  // const [searchTask, setSearchTask] = useState("");

  // const filteredTask = tasksList.filter((item) =>
  //   item.title.toLowerCase().includes(searchTask.toLowerCase())
  // );

  return (
    <div>
      {/* <input
        className="bg-gray-200 text-black py-1 px-2 rounded my-2 shadow-xl hover:-translate-y-1 duration-300"
        type="text"
        value={searchTask}
        onChange={(e) => setSearchTask(e.target.value)}
        placeholder="Search tasks..."
      /> */}
      <div className="space-y-4">
        {tasksList && tasksList.length > 0 ? (
          tasksList.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))
        ) : (
          <p>No tasks available</p>
        )}
      </div>
      {/* <div className="text-center ">
        <button
          className=" hover:-translate-y-1 duration-300 bg-gray-200  rounded"
          onClick={() => navigate("/create-tasks")}
        >
          <MdAssignmentAdd className="w-10 h-10 text-black shadow-xl hover:shadow-2xl" />
        </button>
      </div> */}
    </div>
  );
};

export default TasksList;
