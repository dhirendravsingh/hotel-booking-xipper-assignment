
import './App.css'
import Hotels from './pages/Hotels'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Booking from './pages/booking';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoutes';
function App() {

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/hotels" element={<ProtectedRoute><Hotels/></ProtectedRoute>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>} />
      <Route path="/booking/:id" element={<Booking/>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
