import React from "react";
import { useNavigate } from "react-router";
import { BiCategory } from "react-icons/bi";
import { MdOutlineHome } from "react-icons/md";
import { GiProgression } from "react-icons/gi";

const WelcomMessage = () => {
  // const { tasksList } = useContext(TasksContext);
  // const [selectedCategory, setSelectedCategory] = useState("All");

  // const handleCategoryClick = (category) => {
  //   setSelectedCategory(category);
  // };

  // const filteredTasks =
  //   selectedCategory === "All"
  //     ? tasksList
  //     : tasksList.filter((task) => task.category === selectedCategory);

  const navigate = useNavigate()
  return (
    <>
      <div className="welcome-msg">
        <h1 >
        Hi 🙋‍♂️ Usman! Let’s add tasks 👨‍💻 to make the day easier
        </h1>
        <div className="icons-container">
        <button className="category-btn " onClick={() => navigate('/')}><MdOutlineHome/></button>
        <button className="category-btn " onClick={() => navigate('/category')}><BiCategory/></button>
        <button className="category-btn " onClick={() => navigate('/task-status')}><GiProgression/></button>
        </div>
        {/* <div className="buttons-container">
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
              onClick={() => handleCategoryClick("personel")}
            >
              Personel
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
        </div> */}
      </div>
    </>
  );
};

export default WelcomMessage;
