import React, {  } from "react";
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import Login from '../views/login/Login'
import Home from '../views/home/Home'
import Users from "../views/users/Users";
import Animals from "../views/animals/Animals";
import Medicines from "../views/medicines/Medicines";
import Dispensers from "../views/dispensers/Dispensers";
import Prescriptions from "../views/prescriptions/Prescriptions";

export default function Routing() {
  return (
    <div className="content">
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<Home/>}/> */}
          <Route path='/' element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/users' element={<Users/>}/>
          <Route path='/animals' element={<Animals/>}/>
          <Route path='/medicines' element={<Medicines/>}/>
          <Route path='/dispensers' element={<Dispensers/>}/>
          <Route path='/prescriptions' element={<Prescriptions/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}