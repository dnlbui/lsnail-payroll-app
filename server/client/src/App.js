//import React, { useEffect } from 'react';
//import { useDispatch, useSelector } from 'react-redux';
//import { fetchUser } from '../actions';
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login'
import Welcome from './features/auth/Welcome'
import RequireAuth from './features/auth/RequireAuth'

const App = () => {

  return (
    <div className='container'>
    <Routes>
      <Route path='/' element={<Layout/>}>
        {/* public routes */}
        <Route index element={<Public />}/>
        <Route path='login' element={<Login />}/>

        {/* Protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="welcome" element={<Welcome/>} />
        </Route>
        
      </Route>
    </Routes>
    </div>
  )
}

export default App;




