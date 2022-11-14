import React, { useEffect, useState } from "react";
import { Modal, Form, Button, Select, Row, Col } from "react-bootstrap";
import ReactTable from "react-table-v6";
import { Link, redirect, BrowserRouter, useNavigate } from 'react-router-dom'
import "react-table-v6/react-table.css";
import { toast, ToastContainer } from "react-toastify";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import PrescriptionAPI from "../../api/PrescriptionAPI"
import MedicinesAPI from "../../api/MedicinesAPI"
import AnimalsAPI from "../../api/AnimalsAPI"
import PatientsAPI from "../../api/PatientsAPI"
import SweetAlert from "react-bootstrap-sweetalert";
import HeaderMain from "../headers/header";
import "../../../node_modules/font-awesome/css/font-awesome.css"

export default function Prescribed() {
  const [loading, setLoading] = useState(true);
  const [prescriptionData, setPrescriptionData] = useState([]);
  const [prescriptionDrug, setPrescriptionDrug] = useState([]);
	const [medicineData, setMedicineData] = useState([]);
  const [animalData, setAnimalData] = useState([]);
  const [patientData, setPatientData] = useState([]);
	const presId = localStorage.getItem("pId")

	
	const navigate = useNavigate()
	const { control } = useForm();
	const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "test", // unique name for your Field Array
  });

	const notifySuccessPrescription = () => 
  toast("Successfully created Prescription");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    handleGetPrescription();
		handleGetAllMedicines();
    handleGetAllAnimals();
    handleGetAllPatients();
  }, []);   

	const handleGetAllMedicines = async () => {
    setLoading(true);
    const response = await new MedicinesAPI().medicines();
    if (response.ok) {
        setMedicineData(response.data);
    } else {
      // toast.error("Something went wrong while fetching user");
			handleGetAllMedicines();
    }
    setLoading(false);
  };

  const handleGetAllAnimals = async () => {
    setLoading(true);
    const response = await new AnimalsAPI().animals();
    if (response.ok) {
        setAnimalData(response.data);
    } else {
      // toast.error("Something went wrong while fetching user");
    }
    setLoading(false);
  };

  const handleGetAllPatients = async () => {
    setLoading(true);
    const response = await new PatientsAPI().patients();
    if (response.ok) {
        setPatientData(response.data);
    } else {
      // toast.error("Something went wrong while fetching user");
      handleGetAllPatients();
    }
    setLoading(false);
  };

  const handleGetPrescription = async () => {
    setLoading(true);
    const response = await new PrescriptionAPI().getPrescription(presId);
    if (response.ok) {
        setPrescriptionData(response.data);
        setPrescriptionDrug(response.data.prescriptionProduct);
    } else {
      // toast.error("Something went wrong while fetching user");
    }
    setLoading(false);
  };

	const submitForm = async (data) => {
    setLoading(true);
    
			console.log({data})
			let formattedData = {}
			let prescriptionProduct = []
			Object.keys(data).forEach(item => {
				console.log({item})
				if(item.includes('prescriptionProduct')){
					prescriptionProduct.push(data[item])
				}else{
					formattedData[item] = data[item]
				}
			})
			console.log({prescriptionData})
			formattedData.prescriptionProduct = prescriptionProduct
			console.log({formattedData})



      const response = await new PrescriptionAPI().createPrescriptions(formattedData);
      if (response.ok) {
        notifySuccessPrescription()
        handleGetPrescription();
        reset();
        // setShowForm(false);
				navigate('/prescriptions')
      } else {
        toast.error(response.data.errorMessage);
        handleGetPrescription();
		handleGetAllMedicines();
    handleGetAllAnimals();
    handleGetAllPatients();
      }
    setLoading(false);
  };

  const clickFile = (link) => {
    navigator.clipboard.writeText(link)
    toast.success('File link copied to clipboard.')
  }

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
      <ToastContainer />
      <div className="App">
			<header className="App-header">
          <HeaderMain/>
        </header>
        <div className="container m-t-10">
					<div className="header-presciption">
          Create Prescription	
        	</div>
          <div className="">
          <div className='col-md-12 m-b-15'>
					<form onSubmit={handleSubmit(submitForm)}>
              <label className='control-label mb-2'>Title</label>
                <input
                {...register("title", {
                  required: "Title is required",
                })}
                type='text'
                size='30'
                className='form-control'
                placeholder='Enter text here'
              />
              <p className='text-danger'>{errors.title?.message}</p>

              <label className='control-label mb-2'>Description</label>
                <input
                {...register("description", {
                  required: "Description is required",
                })}
                type='text'
                size='30'
                className='form-control'
                placeholder='Enter text here'
              />
              <p className='text-danger'>{errors.description?.message}</p>

              {/* <label className='control-label mb-2'>Amount</label>
                <input
                {...register("amount", {
                  required: "Amount is required",
                })}
                type='text'
                size='30'
                className='form-control'
                placeholder='Enter text here'
              /> */}
              <p className='text-danger'>{errors.amount?.message}</p>

              <label className='control-label mb-2'>Signature Link</label>
                <input
                {...register("signatureLink", {
                  required: "signatureLink is required",
                })}
                type='text'
                size='30'
                className='form-control'
                placeholder='Enter link here'
              />
              <p className='text-danger'>{errors.signatureLink?.message}</p>

              <label className='control-label mb-2'>Animal Type</label>
              <Form.Select {...register("petTypeId", { required: true })}>
                  <option value="">Select Animal</option>
                  {
                    animalData.map((item, index) => (
                        <option key={index} value={item.id}>
                            {item.name}
                        </option>
                    ))}
              </Form.Select>

              <label className='control-label mb-2 m-t-20'>No. of Animals</label>
                <input
                {...register("noOfPets", {
                  required: "No. of Animals is required",
                })}
                type='text'
                size='30'
                className='form-control'
                placeholder='Enter text here'
              />
              <p className='text-danger'>{errors.noOfPets?.message}</p>


              <label className='control-label mb-2 m-r-5'>Drug</label>
              {/* <Form.Select {...register("drugProduct", { required: true })}>
                  <option value="">Select Drug</option>
                  {
                    medicineData.map((item, index) => (
                        <option key={index} value={item.id}>
                            {item.name}
                        </option>
                    ))}
              </Form.Select> */}

							{/* field array */}
									<Form.Select {...register(`prescriptionProduct.productId`)} >
										<option value="">Select Drug</option>
										{
											medicineData.map((item, index) => (
													<option key={index} value={item.id}>
															{item.name}
													</option>
											))}
									</Form.Select>
									<label className='control-label mb-2'>Amount</label>
										<input
										{...register(`prescriptionProduct.amount`, {
											required: "Amount is required",
										})}
										type='text'
										size='30'
										className='form-control m-b-10'
										placeholder='Enter text here'
									/>
									<label className='control-label mb-2'>Unit Size</label>
										<input
										{...register(`prescriptionProduct.unitSize`, {
											required: "Unit Size is required",
										})}
										type='text'
										size='30'
										className='form-control m-b-10'
										placeholder='Enter text here'
									/>
									<label className='control-label mb-2'>Strength</label>
										<input
										{...register(`prescriptionProduct.strength`, {
											required: "Strength is required",
										})}
										type='text'
										size='30'
										className='form-control m-b-10'
										placeholder='Enter text here'
									/>
									<hr></hr>
							<br></br>
							<br></br>
              <label className='control-label mb-2 m-b-10'>Patient</label>
              <Form.Select {...register("patientId", { required: true })}>
                  <option value="">Select Client/Farmer</option>
                  {
                    patientData.map((item, index) => (
                        // <option key={index} value={item.id}>
                        //     {item.userTypeId === 1 && item.fullname}
                        // </option>
                        <option key={index} value={item.id}>
                          {item.patientName}
                        </option>
                    ))}
              </Form.Select>
							<br></br>
							<button type='submit' className='btn btn-primary'>
              Save Prescription
            </button>
						</form>
            </div>		
          </div>
        </div>
      </div>
    </>
  );
}
