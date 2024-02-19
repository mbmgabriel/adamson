import React, { useEffect, useState } from "react";
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
import Prescriptions1 from "../views/prescriptions/CreatePrescription";
import Patients from "../views/patients/Patients"
import PrescriptionCerttificate from "../views/prescriptions/PrescriptionCertificate";
import HealthRecord from "../views/prescriptions/HealthRecord";
import Register from "../views/login/Register";
import Profile from "../views/users/Profile";
import Prescribed from "../views/prescriptions/Prescribed";
import DispensingDrugs from "../views/dispensers/DispensingDrugs";
import Dispensed from "../views/dispensers/CreateDispense";
import ProductFormat from "../views/medicines/ProductFormat";

export default function Routing() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = window.sessionStorage.getItem("token")
    console.log({token})
    if(token != null){
      setIsLoggedIn(true)
      setLoading(false)
    }
  }, [])


  return (
    <div className="content">
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<Home/>}/> */}

          {
            !loading && isLoggedIn ? (
              <>
                <Route path='/home' element={<Home/>}/>
                <Route path='/users' element={<Users/>}/>
                <Route path='/animals' element={<Animals/>}/>
                <Route path='/medicines' element={<Medicines/>}/>
                <Route path='/dispensers' element={<Dispensers/>}/>
                <Route path='/prescriptions' element={<Prescriptions/>}/>
                <Route path='/prescriptions1' element={<Prescriptions1/>}/>
                <Route path='/patients' element={<Patients/>}/>
                <Route path='/generate/:id' element={<PrescriptionCerttificate/>}/>
                <Route path='/viewrecord/:id' element={<HealthRecord/>}/>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/prescribed' element={<Prescribed/>}/>
                <Route path='/dispensingdrugs' element={<DispensingDrugs/>}/>
                <Route path='/dispensed' element={<Dispensed/>}/>
                <Route path='/format' element={<ProductFormat/>}/>
              </>
            ) : (
              <>
                <Route path='/register' element={<Register/>}/>
                <Route path='/' element={<Login/>}/>
              </>
            )
          }
          

          
        </Routes>
      </BrowserRouter>
    </div>
  );
}