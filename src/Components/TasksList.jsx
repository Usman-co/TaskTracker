import React, { useContext } from 'react'
import { TasksContext } from '../store/TasksContext';
import TaskItem from './TaskItem';
import { MdAssignmentAdd } from "react-icons/md";
import { useNavigate } from 'react-router';

const TasksList = () => {
  const {tasksList} = useContext(TasksContext)
  const navigate = useNavigate()
  return (
    <>
     <div className='tasks-container'>
        {tasksList && tasksList.length > 0 ? (
          tasksList.map((task, index) => (
            <TaskItem key={index} task={task} />
          ))
        ) : (
          <p>No tasks available</p>
        )}
        <button className="add-tasks-btn" onClick={() => navigate('/create-tasks')}>
          <MdAssignmentAdd />
        </button>
        </div>
    </>
  )
}

export default TasksList;