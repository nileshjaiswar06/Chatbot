import Header from "./components/Header"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Chat from "./pages/Chat"
import NotFound from "./pages/NotFound"
import { userAuth } from "./context/AuthContext"
import { Divider } from "@mui/material"

function App() {

  const auth = userAuth()
  return (
    <>
      <Header />
      <Divider sx={{ 
                borderColor: 'rgba(210, 214, 218, 0.24)', // subtle color
                borderBottomWidth: 1.5, 
                marginY: 1 
            }} 
        />
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {auth?.isLoggedIn && auth.user && (<Route path="/chat" element={<Chat />} />)}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
