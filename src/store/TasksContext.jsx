import React, { createContext, useEffect, useReducer } from "react";

export const TasksContext = createContext({
  tasksList: [],
  addTasks: () => {},
  deleteTask: () => {},
  updateTask: () => {}
});

const ADD_TASKS = "ADD_TASKS";
const SET_TASKS = "SET_TASKS";
const DELETE_TASK = "DELETE_TASK";
const UPDATE_TASK = "UPDATE_TASK"
const tasksReducer = (currentTasks, action) => {
  switch (action.type) {
    case SET_TASKS:
      return action.payload;
    case DELETE_TASK:
      return currentTasks.filter((task) => task.id !== action.payload);
    case ADD_TASKS:
      return [ action.payload, ...currentTasks];
      case UPDATE_TASK:
      return currentTasks.map((task) =>
         task.id === action.payload.id ? action.payload : task
      );
    default:
      return currentTasks;
  }
};

export const TasksProvider = ({ children }) => {
  const [tasksList, dispatchTasks] = useReducer(tasksReducer, []);

  useEffect(() => {
    
    const fetchTasks = () => {
      fetch("https://task-traker.netlify.app")
        .then((response) => response.json())
        .then((data) => {
          dispatchTasks({ type: SET_TASKS, payload: data });
        })
        .catch((error) => {
          console.error("Failed to fetch tasks:", error);
        });
    };
  
    fetchTasks();
  }, []);
  
  
  const addTasks = (task) => {
    fetch("https://task-traker.netlify.app/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((response) => response.json())
      .then((newTask) => {
        dispatchTasks({ type: ADD_TASKS, payload: newTask });
      })
      .catch((error) => {
        console.error("Failed to add task:", error);
      });
  };
  
  const deleteTask = (taskId) => {
    fetch(`https://task-traker.netlify.app/${taskId}`, {
      method: "DELETE",
    })
      .then(() => {
        dispatchTasks({ type: DELETE_TASK, payload: taskId });
      })
      .catch((error) => {
        console.error("Failed to delete task:", error);
      });
  };
  
  const updateTask = (updatedTask) => {
    fetch(`https://task-traker.netlify.app//${updatedTask.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatchTasks({ type: UPDATE_TASK, payload: data });
      })
      .catch((error) => {
        console.error("Failed to update task:", error);
      });
  };
  
  

  return (
    <TasksContext.Provider value={{ tasksList, addTasks, deleteTask , updateTask}}>
      {children}
    </TasksContext.Provider>
  );
};
