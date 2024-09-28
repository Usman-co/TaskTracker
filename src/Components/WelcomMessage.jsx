// import React from "react";
// import { useNavigate } from "react-router";
// import { BiCategory } from "react-icons/bi";
// import { MdOutlineHome } from "react-icons/md";
// import { GiProgression } from "react-icons/gi";

// const WelcomMessage = () => {
//   const navigate = useNavigate();
//   return (
//     <>
//       <div className="flex">
//         <div className="h-screen w-16 bg-gray-800 flex flex-col justify-start items-center py-4">
//           <button
//             className="category-btn text-white text-2xl p-4 hover:bg-gray-700 w-full"
//             onClick={() => navigate("/")}
//           >
//             <MdOutlineHome />
//           </button>
//           <button
//             className="category-btn text-white text-2xl p-4 hover:bg-gray-700 w-full"
//             onClick={() => navigate("/category")}
//           >
//             <BiCategory />
//           </button>
//           <button
//             className="category-btn text-white text-2xl p-4 hover:bg-gray-700 w-full"
//             onClick={() => navigate("/task-status")}
//           >
//             <GiProgression />
//           </button>
//         </div>
//         <div className="flex justify-center w-full bg-gradient-to-r from-teal-500 via-green-500 to-pink-500 h-20 text-white ">
//         <h1 className="">
//           Hi 🙋‍♂️ Usman! Let’s add tasks 👨‍💻 to make the day easier
//         </h1>
//       </div>
//         <div className="flex-grow p-4">{/* Your main content goes here */}</div>
//       </div>
//     </>
//   );
// };

// export default WelcomMessage;
