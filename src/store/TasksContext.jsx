import React, { createContext, useEffect, useReducer } from "react";

export const TasksContext = createContext({
  tasksList: [],
  addTasks: () => {},
  deletTask: () => {},
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

  // useEffect(() => {
    
  //   const fetchTasks = () => {
  //     fetch("http://localhost:3000/tasks")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         dispatchTasks({ type: SET_TASKS, payload: data });
  //       })
  //       .catch((error) => {
  //         console.error("Failed to fetch tasks:", error);
  //       });
  //   };
  
  //   fetchTasks();
  // }, []);
  
  
  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:3000/tasks");
        const data = await response.json();
        const validatedData = data.map((task) => ({
          ...task,
          duration: task.duration || 0,
          elapsedTime: task.elapsedTime || 0,
          extraTime: task.extraTime || 0,
        }));
  
        dispatchTasks({ type: SET_TASKS, payload: validatedData });
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
  
    fetchTasks();
  }, []);
  

  const addTasks = (task) => {
    fetch("http://localhost:3000/tasks", {
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
  
  const deletTask = (taskId) => {
    fetch(`http://localhost:3000/tasks/${taskId}`, {
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
    fetch(`http://localhost:3000/tasks/${updatedTask.id}`, {
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
    <TasksContext.Provider value={{ tasksList, addTasks, deletTask , updateTask}}>
      {children}
    </TasksContext.Provider>
  );
};





// import React, { createContext, useEffect, useReducer } from "react";
// import { TasksData } from "./TasksData";

// export const TasksContext = createContext({
//   tasksList: [],
//   addTasks: () => {},
//   deletTask: () => {},
// });

// const ADD_TASKS = "ADD_TASKS";
// const DELETE_TASK = "DELETE_TASK";
// const tasksReducer = (currentTasks, action) => {
//   if (action.type === DELETE_TASK) {
//     return currentTasks.filter((task) => task.id !== action.payload);
//   }else if (action.type === ADD_TASKS) {
//     return [action.payload, ...currentTasks];
//   } else
//   return currentTasks;
// };

// export const TasksProvider = ({ children }) => {
//   const Tasks = TasksData;
//   const [tasksList, dispatchTasks] = useReducer(tasksReducer, Tasks, () => {
//     const localTasks = localStorage.getItem("tasksList");
//     try {
//       return localTasks ? JSON.parse(localTasks) : Tasks;
//     } catch (error) {
//       console.error("Failed to parse local tasks:", error);
//       return Tasks;
//     }
//   });

//   useEffect(() => {
//     try {
//       localStorage.setItem("tasksList", JSON.stringify(tasksList));
//     } catch (error) {
//       console.error("Failed to save tasks to localStorage:", error);
//     }
//   }, [tasksList]);
  
//   const addTasks = (title, durationTime, dueDate, category) => {
//     dispatchTasks({
//       type: "ADD_TASKS",
//       payload: {
//         id: Date.now(),
//         title: title,
//         duration: durationTime,
//         category: category,
//         dueDate: dueDate,
//         elapsedTime: 0,
//         isRunning: false,
//         extraTime:0,
//       },
//     });
//   };

//   const deletTask = (taskId) => {
//     dispatchTasks({
//       type: "DELETE_TASK",
//       payload: taskId,
//     });
//   };
//   return (
//     <TasksContext.Provider value={{ tasksList, addTasks, deletTask }}>
//       {children}
//     </TasksContext.Provider>
//   );
// };
