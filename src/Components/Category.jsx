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
    <div className=" rounded px-5 py-5 w-full bg-emerald-500 ">
      <ul className="flex justify-evenly mb-4 text-white">
        {/* <div> */}
          <li className="cursor-pointer bg-black py-2 px-4 rounded-xl hover:-translate-y-1 duration-300 hover:bg-gray-200 hover:text-black" onClick={() => handleCategoryClick("All")}>
            All
          </li>
        {/* </div> */}
        {/* <div> */}
          
          <li className="cursor-pointer bg-black py-2 px-4 rounded-xl hover:-translate-y-1 duration-300 hover:bg-gray-200 hover:text-black" onClick={() => handleCategoryClick("work")}>
            Work
          </li>
        {/* </div> */}
        {/* <div> */}
          
          <li
            className="cursor-pointer bg-black py-2 px-4 rounded-xl hover:-translate-y-1 duration-300 hover:bg-gray-200 hover:text-black"
            onClick={() => handleCategoryClick("personal")}
          >
            Personal
          </li>
        {/* </div> */}
        {/* <div> */}
          <li
            className="cursor-pointer bg-black py-2 px-4 rounded-xl hover:-translate-y-1 duration-300 hover:bg-gray-200 hover:text-black"
            onClick={() => handleCategoryClick("birthday")}
          >
            Birthday
          </li>
        {/* </div> */}
        {/* <div> */}
          <li
            className="cursor-pointer bg-black py-2 px-4 rounded-xl hover:-translate-y-1 duration-300 hover:bg-gray-200 hover:text-black"
            onClick={() => handleCategoryClick("wishlist")}
          >
            Wishlist
          </li>
        {/* </div> */}
      </ul>

      <div className="grid grid-cols-3 ">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div key={task.id} className="my-2 w-72 px-2 py-2  rounded-xl text-center text-black hover:shadow hover:-translate-y-2 hover:bg-black hover:text-white mb-4 duration-300 bg-gray-200 shadow-2xl">
              <h3>{task.title}</h3>
              <p>Category: {task.category}</p>
              <p>Due Date: {task.dueDate}</p>
            </div>
          ))
        ) : (
          <p className="text-white text-center">No tasks found for this category.</p>
        )}
      </div>
    </div>
  </>
  )
}

export default Category;