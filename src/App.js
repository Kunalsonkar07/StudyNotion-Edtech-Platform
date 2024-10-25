import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import LoginForm from "./components/core/Auth/LoginForm";
import SignupForm from "./components/core/Auth/SignupForm";
import Navbar from "./Pages/Navbar";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgetPassword from "./Pages/ForgetPassword";
import UpdatePassword from "./Pages/UpdatePassword";



// import About from "./Pages/About";

const App = () => {
  return (
    <div className="max-w-screen min-h-screen bg-richblack-900 flex flex-col font-inter overflow-x-hidden -z-50">
        <Navbar></Navbar>
        <Routes>
            <Route path="/"  element={<Home/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/forgot-password" element={<ForgetPassword/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/update-password/:id" element={<UpdatePassword/>}/>
            <Route path="/dashboard" element={<About></About>} ></Route>
        </Routes>
    </div>
  );
};

export default App;
