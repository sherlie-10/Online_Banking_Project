import React from "react"
import './App.css'
import { BrowserRouter, Routes,Route,Navigate } from "react-router-dom"
import NavBar from "./components/NavBar/NavBar"
import Home from "./components/Home/Home"
import About from "./components/About/About"
import Contact from "./components/Contact/Contact"
import Services from "./components/Services/Services"
import Footer from "./components/Footer/Footer"
import Login from "./components/Login/Login"
import ForgotPassword from "./components/ForgotPassword/ForgotPassword"
import UserRegistration from "./components/UserRegistration/UserRegistration"
function App() {
  

  return (
    <>
    <BrowserRouter>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={
          <>
            <Home></Home>
            <Services></Services>
            <About></About>
            <Contact></Contact>
            
          </>
        }>

        </Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/UserRegistration" element={<UserRegistration></UserRegistration>}></Route>
      </Routes>
     <Footer></Footer>
    </BrowserRouter>
    </>
  )
}

export default App
