import React, { useState } from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as chartjs, defaults} from 'chart.js/auto';

defaults.maintainAspectRatio = false;
defaults.responsive = true

const TaskStatusList = () => {
  const [isSwitch, setSwitch] = useState("Daily")

  return (
    <div className=" mt-2 border-2 border-inherit  drop-shadow-md  px-6 py-10 container mx-auto p-4 max-w-2xl">
      <h1 className='text-2xl mb-2 font-bold max-sm:text-lg'>Task Completion Chart</h1>

      {isSwitch === "Weekly" ?   <div className='my-4 mb-6 w-full h-96'>
  <Bar data={{
    labels:["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets:[{
      label:"On time",
      data:[12,6,8,14,3,2,11],
      backgroundColor:"#10B981"
    },{
      label:"Overdue",
      data:[10,29,18,17,31,23,25],
      backgroundColor:"#EF4444"
    },
  ]
  }} 
  />
  </div> : 
      <div className='my-4 mb-6 w-full h-96'>
         <Bar  className='mt-' data={{
    labels:["Mon", "Tue", "Wed", "Thu","Fri","Sat","Sun"],
    datasets:[{
      label:"On time",
      data:[2,6,8,4,3,2,1],
      backgroundColor:"#10B981",
    },{
      label:"Overdue",
      data:[3,1,4,5,1,3,2],
      backgroundColor:"#EF4444"
    },
  ]
  }} 
  />
      </div>
      }
 

  <span className=' px-2 py-4 space-x-2  rounded-md max-sm:px-1 max-sm:py-2 max-sm:space-x-1'>
    <button className={`py-2 px-2 rounded-md text-sm  max-sm:px-1 max-sm:py-1  ${
            isSwitch === "Daily" ? "bg-black text-white" : " text-black"
          }`}  onClick={()=> {setSwitch("Daily")}}>Daily</button>
    <button className={`py-2 px-2 rounded-md text-sm max-sm:px-1 max-sm:py-1 ${
            isSwitch === "Weekly" ? "bg-black text-white" : " text-black"
          }`}  onClick={()=> {setSwitch("Weekly")}}>Weekly</button>
    </span>
    </div>
  )
}

export default TaskStatusList;