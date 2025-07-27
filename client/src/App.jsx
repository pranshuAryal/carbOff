import './index.css'
import { useState } from 'react'
import {BrowserRouter, Routes, Route, useLocation} from 'react-router'
import Login from './pages/login'
import Signup from './pages/signup'
import Dashboard from './pages/dashboard'
import ProtectedRoute from './components/protectedRoutes'
import MainLayout from './components/mainlayout'


function App() {
  const location = useLocation();
  const showLayout = ["/", "/Calculator"].includes(location.pathname);

  return (
    <div className='flex h-screen'> 
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
