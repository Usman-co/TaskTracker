import React, { useContext } from 'react'
import { TasksContext } from '../store/TasksContext';

const TaskStatusList = () => {
  const {tasksList} = useContext(TasksContext)

   const  pendingTasks = tasksList.filter(tasks => !tasks.completed)
   const completedTasks = tasksList.filter(tasks => tasks.completed)

  return (
    <div className='status-container'>
      <section>
        <h3>Pending Tasks</h3>
        {pendingTasks.length > 0 ? (
          <ul> 
            {pendingTasks.map(task => (
              <li key={task.id}> 
              {task.title} - {task.duration} minutes left
              </li>
            ))}
          </ul>
        ) : <p>NO PENDING TASKS</p>}
      </section>
      <section>
       <h3>Completed Tasks</h3>
       {completedTasks.length > 0 ? (
        <ul>
          {completedTasks.map(task => (
            <li key={task.id}>
              {task.title}  Completed
            </li>
          ))}
        </ul>
       ) : <p>NO COMPLETED TASKS</p> }
      </section>
    </div>
  )
}

export default TaskStatusList;