import React, { useContext, useState } from "react";
import { TasksContext } from "../store/TasksContext";
import TaskItem from "./TaskItem";
import { MdAssignmentAdd } from "react-icons/md";
import { useNavigate } from "react-router";

const TasksList = () => {
  const { tasksList } = useContext(TasksContext);

  return (
    <div>
      <div className="space-y-4">
        {tasksList && tasksList.length > 0 ? (
          tasksList.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))
        ) : (
          <p>No tasks available</p>
        )}
      </div>
    </div>
  );
};

export default TasksList;