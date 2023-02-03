import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login'
import Welcome from './features/auth/Welcome'
import RequireAuth from './features/auth/RequireAuth'
import Register from './features/auth/Register'
import Home from './features/home/Home'
import Employees from './features/employees/Employees'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        {/* public routes */}
        <Route index element={<Public />}/>
        <Route path='login' element={<Login />}/>
        <Route path='register' element={<Register/>} />

        {/* Protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="welcome" element={<Welcome/>} />
          <Route path="home" element={ <Home/> } />
          <Route path="employees" element={<Employees/>} />
          {/* <Route path="employees" element={<Employees/>} /> */}
          {/* <Route path="employees" element={<Employees/>} /> */}
        </Route>
      </Route>
    </Routes>
  
  )
}

export default App;




