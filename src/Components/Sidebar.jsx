import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { GiProgression } from "react-icons/gi";
import { BiTask } from "react-icons/bi";
import { TbCategory2 } from "react-icons/tb";
import { IoIosArrowForward } from "react-icons/io";

const Sidebar = () => {
  // const [on , setOn] = useState(false)
  return (
    <>
     <div className="w-50  duration-300  bg-emerald-400 fixed h-full px-2 py-4 text-white shadow-xl max-sm:w-20 max-md:w-30 max-lg:w-40 max-xl:w-50 max-2xl:w-90">
      {/* <div>
       <IoIosArrowForward className={`bg-white border-2 border-black text-black text-2xl font-bold cursor-pointer absolute rounded-full -right-3 top-9 w-7 ${!on &&  'rotate-180'}`} onClick={() => setOn(!on)}></IoIosArrowForward>
      </div> */}
      <div className='flex px-2 py-2'>
      <h1 className="duration-300 origin-left font-medium text-xl"  >
        Tasks Traker
        </h1>
      </div>
        <hr className="border-b-1  border-black" />
        <ul className="mt-3  font-bold">
          <li  className=" mb-2 rounded hover:shadow hover:bg-black hover:text-white py-2">
            <Link to = '/' className="px-3">
            <BiTask className = 'h-6 w-6 inline-block mr-2 -mt-2'></BiTask>
            Tasks
            </Link>
          </li>
          <li  className=" mb-2 rounded hover:shadow  hover:bg-black hover:text-white py-2">
            <Link to = '/category' className="px-3">
            <TbCategory2 className = 'h-6 w-6 inline-block mr-2 -mt-2'></TbCategory2>
            Category 
            </Link>
          </li>
          <li className=" mb-2 rounded hover:shadow  hover:bg-black hover:text-white py-2">
            <Link to ="/task-status" className="px-3">
            <GiProgression className = 'h-6 w-6 inline-block mr-2 -mt-2'></GiProgression>
            Status 
            </Link>
            </li>
        </ul>
      </div>
    </>
  )
}

export default Sidebar