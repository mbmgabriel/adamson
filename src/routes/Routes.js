import React, {  } from "react";
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import Login from '../views/login/Login'
import Home from '../views/home/Home'

export default function Routing() {
  return (
    <div className="content">
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<Home/>}/> */}
          <Route path='/' element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}