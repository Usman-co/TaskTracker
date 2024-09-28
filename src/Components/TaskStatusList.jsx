import React, { useContext } from 'react'
import { TasksContext } from '../store/TasksContext';

const TaskStatusList = () => {
  const {tasksList} = useContext(TasksContext)

   const  pendingTasks = tasksList.filter(tasks => !tasks.completed)
   const completedTasks = tasksList.filter(tasks => tasks.completed)

  return (
    <div className='flex  justify-around font-bold'>
      <div  className="my-2 p-2 w-96  rounded-xl text-center text-black hover:shadow hover:-translate-y-2 hover:bg-green-600 hover:text-white mb-4 duration-300 bg-gray-200 shadow-2xl">
       <h3 className='my-2'>Completed Tasks</h3>
       {completedTasks.length > 0 ? (
        <ul >
          {completedTasks.map(task => (
            <li key={task.id} className='bg-green-100 text-green-600 rounded-md py-3 px-1 mb-2'>
              {task.title}  Completed
            </li>
          ))}
        </ul>
       ) : <p className='bg-red-300 text-red-500'>NO COMPLETED TASKS YET</p> }
      </div>
      <div  className="my-2 p-2 w-96  rounded-xl text-center text-black hover:shadow hover:-translate-y-2 hover:bg-yellow-600 hover:text-white mb-4 duration-300 bg-gray-200 shadow-2xl">
        <h3 className='my-2'>Pending Tasks</h3>
        {pendingTasks.length > 0 ? (
          <ul > 
            {pendingTasks.map(task => (
              <li key={task.id} className='bg-yellow-100 text-yellow-600 rounded-md py-3 px-1'> 
              {task.title} - {task.duration} minutes left
              </li>
            ))}
          </ul>
        ) : <p className='bg-emerald-200 rounded-md p-2 text-emerald-400'>NO PENDING TASKS</p>}
      </div>
    </div>
  )
}

export default TaskStatusList;