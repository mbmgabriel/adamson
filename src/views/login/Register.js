import React, { useEffect, useState } from "react";
import { Modal, Form, Button, Select } from "react-bootstrap";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import PrescriptionAPI from "../../api/PrescriptionAPI"
import MedicinesAPI from "../../api/MedicinesAPI"
import AnimalsAPI from "../../api/AnimalsAPI"
import PatientsAPI from "../../api/PatientsAPI"
import SweetAlert from "react-bootstrap-sweetalert";
import HeaderMain from "../headers/header";
import "../../../node_modules/font-awesome/css/font-awesome.css"
import UsersAPI from "../../api/UsersAPI"

export default function Register() {
  const [loading, setLoading] = useState(true);
  const [prescriptionData, setPrescriptionData] = useState([]);
	const [showForm, setShowForm] = useState(false);
  const [resetNotify, setResetNotify] = useState(false);
	const presId = sessionStorage.getItem("pId")

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

	const notifySuccess = () => 
  toast.success("Successfully Created User");

  useEffect(() => {
    // handleGetPrescription();
  }, []);   

	const submitForm = async (data) => {
    setLoading(true);
    
      const response = await new UsersAPI().userregister(data);
      if (response.ok) {
        // toast.success("Successfully Created User");
				notifySuccess();
        reset();
        setShowForm(false);
      } else {
        toast.error(response.data.errorMessage);
      }
    
    setLoading(false);
  };

  return (
    <>
      {/* {loading && <FullScreenLoader />} */}
			<ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
        <div className="container-fluid">
					<div className="auth-container">
          <div className="row">
							<div className='col-md-8 m-b-15'>
								<div className="login-container register-bg-image"></div>
							</div>
							<div className='col-md-4' style={{position:"center"}}>
							<form onSubmit={handleSubmit(submitForm)}>
								<header className="App-header" style={{fontSize:"30px", marginBottom:"30px", marginTop:"20px", fontWeight:"bold"}}>
									Sign Up for your account!
									<span style={{marginLeft:10}} className="blue">VETDRUMS</span>
								</header>
								<label className='control-label mb-2'>Username</label>
									<input
									{...register("username", {
										required: "email is required",
									})}
									type='text'
									size='30'
									className='form-control'
									placeholder=''
								/>
								<p className='text-danger'>{errors.username?.message}</p>

								<label className='control-label mb-2'>Password</label>
									<input
									{...register("password", {
										required: "Password is required",
									})}
									type='password'
									size='30'
									className='form-control'
									placeholder=''
								/>
								<p className='text-danger'>{errors.password?.message}</p>

								<label className='control-label mb-2'>Name</label>
									<input
									{...register("fullname", {
										required: "Name is required",
									})}
									type='text'
									size='30'
									className='form-control'
									placeholder=''
								/>
								<p className='text-danger'>{errors.fullname?.message}</p>
								
								<label className='control-label mb-2'>Type</label>
								<Form.Select {...register("userTypeId", { required: "User type is required" })}>
										<option value="">Select User Type</option>
										<option value='1'>Farmer</option>
										<option value='2'>Veterinarian</option>
										<option value='3'>Dispensing Unit</option>
								</Form.Select>
								<p className='text-danger'>{errors.userTypeId?.message}</p>


								<Button className="btn btn-md btn-primary btn-auth w-100 d-block mt-4 mb-4" size="md" variant="primary" type="submit">Register</Button>
							</form>
							<div>Back to Login Page <span style={{fontWeight:"bold"}}><a href="/">Click here</a></span></div>
							</div>
							
          </div>
        </div>
      </div>
    </>
  );
}
