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
import VerifyEmail from "./Pages/VerifyEmail";
import Sidebar from "./components/common/Sidebar";
import Dashboard from "./Pages/Dashboard";
import Myprofile from "./components/dashboard/Myprofile";
import Courses from "./components/dashboard/Courses";



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
            <Route path="/dashboard" element={<Dashboard/>} >
              
              <Route path="/dashboard/my-profile" element={<Myprofile/>}> </Route>
              <Route path="/dashboard/enrolled-courses" element={<div>couses</div>} ></Route>
              <Route path="/dashboard/cart" element={<div>cart</div>}> </Route>
              <Route path="/dashboard/setting" element={<div>setting</div>}> </Route>
            </Route>
            <Route path="/verify-email" element={<VerifyEmail></VerifyEmail>}></Route>
        </Routes>
    </div>
  );
};

export default App;
