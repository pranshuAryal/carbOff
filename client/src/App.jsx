import './index.css'
import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router'
import Login from './pages/login'
import Signup from './pages/signup'
import Dashboard from './pages/dashboard'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/' element={<Dashboard/>}/>
        

      </Routes>
    </div>
  )
}

export default App
