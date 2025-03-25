import { useState } from 'react'
import './App.css'
import AdminRoutes from './Routes/AdminRoutes';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import LogIn from './components/LogIn';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<LogIn/>}>
      <Route path="/login" element={<LogIn/>}></Route>
      </Route>
      </Routes>
        <AdminRoutes />
      </BrowserRouter>
      
    </>
  )
}

export default App
