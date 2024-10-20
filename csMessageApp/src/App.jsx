import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import Dashboard from './Dashboard'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import AskQuestion from './askQuestion'
import Header from './components/Header'


function App() {
 
  return (
    
    
   <Routes>
    <Route path='/' element=  {<Login/>} />
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/askQuestion' element={<AskQuestion/>}/>
   </Routes>
   
  )
}

export default App
