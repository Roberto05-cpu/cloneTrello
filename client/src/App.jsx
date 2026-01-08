import { Route, Routes, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import About from "./pages/About"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Sidebar from "./components/Sidebar"

function App() {

  const location = useLocation()
  const current = location.pathname

  return (
    <div className="">
      <div className={`${current.includes("dashboard") ? "hidden" : "block"}`}>
        <Navbar />
      </div>
      <div className={`${!current.includes("dashboard") ? "hidden" : "block"} flex w-full min-h-screen`}>
        <div className="w-[18%] max-h-screen overflow-y-auto"><Sidebar/></div>
        <div className="w-[82%]"><Dashboard/></div>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
