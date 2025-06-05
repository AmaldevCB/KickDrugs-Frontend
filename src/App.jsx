import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import { ToastContainer } from 'react-toastify'
import PageNotFound from './pages/PageNotFound'
import ForgotPswd from './pages/ForgotPswd'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/forgotPassword' element={<ForgotPswd/>}/>

      <Route path='*' element={<PageNotFound/>}/>
    </Routes>

    <ToastContainer position="top-center" autoClose={2000} />
    </>
  )
}

export default App
