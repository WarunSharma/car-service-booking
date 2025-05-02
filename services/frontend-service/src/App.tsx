import { Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import BookAppointment from './pages/BookAppointment'

function App() {

  return (
    <Routes>
      <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>}/>
      <Route path='/book' element={<ProtectedRoute><BookAppointment /></ProtectedRoute>}/>
      <Route path='/signup' element={<Signup />}/>
      <Route path='/login' element={<Login />}/>
    </Routes>
  )
}

export default App
