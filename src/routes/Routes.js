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
import Patients from "../views/patients/Patients"
import PrescriptionCerttificate from "../views/prescriptions/PrescriptionCertificate";
import HealthRecord from "../views/prescriptions/HealthRecord";
import Register from "../views/login/Register";
import Profile from "../views/users/Profile";

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
          <Route path='/patients' element={<Patients/>}/>
          <Route path='/generate/:id' element={<PrescriptionCerttificate/>}/>
          <Route path='/viewrecord/:id' element={<HealthRecord/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}