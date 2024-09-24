import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css'
import About from "./components/About/About"
import Contact from "./components/Contact/Contact"
import Footer from "./components/Footer/Footer"
import ForgotPassword from "./components/ForgotPassword/ForgotPassword"
import ResetPassword from "./components/ForgotPassword/ResetPassword"
import Home from "./components/Home/Home"
import Login from "./components/Login/Login"
import NavBar from "./components/NavBar/NavBar"
import Services from "./components/Services/Services"
import UserRegistration from "./components/UserRegistration/UserRegistration"
import UserView from "./components/UserViwe/UserView"
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
        <Route path="/forgot-password" element={<ForgotPassword></ForgotPassword>} />
        <Route path="/reset-password" element={<ResetPassword></ResetPassword>} />
        <Route path="/UserRegistration" element={<UserRegistration></UserRegistration>}></Route>
        <Route path="/UserView" element={<UserView></UserView>}></Route>
      </Routes>
     <Footer></Footer>
    </BrowserRouter>
    </>
  )
}

export default App
