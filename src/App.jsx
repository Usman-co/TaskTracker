import React from "react";
import { Route, Routes } from 'react-router'
import './App.css'
import TasksList from './Components/TasksList'
import WelcomMessage from './Components/WelcomMessage'
import {  TasksProvider } from './store/TasksContext'
import CreateTasks from './Components/CreateTasks'
import Category from "./Components/Category";
import TaskStatusList from "./Components/TaskStatusList";

function App() {


  return (
    <TasksProvider>
     <WelcomMessage/>
     <Routes>
     <Route path='/' element ={<TasksList />} />
     <Route path='/create-tasks' element ={<CreateTasks/>} />
     <Route path = '/category' element = {<Category/>} />
     <Route path="/task-status" element = {<TaskStatusList/>} />
     </Routes>
    </TasksProvider>
  )
}

export default App
