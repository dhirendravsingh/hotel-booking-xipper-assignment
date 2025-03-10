
import './App.css'
import Hotels from './pages/Hotels'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Booking from './pages/booking';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoutes';
import WebCheckin from './pages/WebCheckin';
import CheckingIn from './pages/CheckingIn';
function App() {

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/hotels" element={<ProtectedRoute><Hotels/></ProtectedRoute>} />
      <Route path="/" element={<Login/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>} />
      <Route path="/booking/:id" element={<Booking/>}/>
      <Route path="/webcheckin" element={<ProtectedRoute><WebCheckin/></ProtectedRoute>}/>
      <Route path="/webcheckin/:bookingId" element={<ProtectedRoute><CheckingIn/></ProtectedRoute>}/>

     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
