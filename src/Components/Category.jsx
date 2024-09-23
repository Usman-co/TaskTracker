import React, { useContext, useState } from "react";
import { TasksContext } from "../store/TasksContext";

const Category = () => {
  const { tasksList } = useContext(TasksContext);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredTasks =
    selectedCategory === "All"
      ? tasksList
      : tasksList.filter((task) => task.category === selectedCategory);

  return (
    <>
    <div className="buttons">
      <div className="buttons-container">
        <div>
          <button className="btn" onClick={() => handleCategoryClick("All")}>
            All
          </button>
        </div>
        <div>
          
          <button className="btn" onClick={() => handleCategoryClick("work")}>
            Work
          </button>
        </div>
        <div>
          
          <button
            className="btn"
            onClick={() => handleCategoryClick("personal")}
          >
            Personal
          </button>
        </div>
        <div>
          <button
            className="btn"
            onClick={() => handleCategoryClick("birthday")}
          >
            Birthday
          </button>
        </div>
        <div>
          <button
            className="btn"
            onClick={() => handleCategoryClick("wishlist")}
          >
            Wishlist
          </button>
        </div>
      </div>

      <div className="tasks-container">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div key={task.id} className="task-card">
              <h3>{task.title}</h3>
              <p>Category: {task.category}</p>
              <p>Due Date: {task.dueDate}</p>
            </div>
          ))
        ) : (
          <p>No tasks found for this category.</p>
        )}
      </div>
    </div>
  </>
  )
}

export default Category;