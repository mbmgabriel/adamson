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
  const [tempData, setTempData] = useState([]);
  const presId = sessionStorage.getItem("pId")
  const userid = sessionStorage.getItem("userID")
  const siglink = `https://cdn.vetdrums.org/user/${userid}/Signature/Signature.png`
  const [addForm1, setAddForm1] = useState(false);
  const [addForm2, setAddForm2] = useState(false);
  const [finalizedPrescriptions, setFinalizedPrescriptions] = useState(false);
  const [prescButton, setPrescButton] = useState(false)


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
    if (
      data.prescriptionProduct[0].amount !== "" &&
      data.prescriptionProduct[0].amountMeasurement !== "" &&
      data.prescriptionProduct[0].measurement !== "" &&
      data.prescriptionProduct[0].productId !== "" &&
      data.prescriptionProduct[0].unitSize !== "" &&
      data.prescriptionProduct[0].strength !== ""
    ) {
      const arr = data
      setTempData([...tempData, arr]);
      setPrescButton(true);

    }
    setLoading(false);
    console.log('tempData', tempData)

  };

  const clickFile = (link) => {
    navigator.clipboard.writeText(link)
    toast.success('File link copied to clipboard.')
  };

  useEffect(() => {
  }, [tempData]);

  const handleSave = async () => {
    const e = document.getElementById("client");
    const value = e.value;
    const text = e.options[e.selectedIndex].text;

    tempData.forEach(async data => {
      data.patientId = value
      data.petTypeId = parseInt(data?.petTypeId)
      data.patientId = parseInt(data?.patientId)
      data.noOfPets = parseInt(data?.noOfPets)

      let formattedData = {}
      let prescriptionProduct = []

      Object.keys(data).forEach(item => {
        if (item.includes('prescriptionProduct')) {
          data[item]?.forEach(item => {
            if (
              item?.amountMeasurement !== "" ||
              item?.measurement !== "" ||
              item?.strength !== "" ||
              item?.unitSize !== ""
            ) {
              prescriptionProduct.push(item)
            }
          })
        } else {
          formattedData[item] = data[item]
        }
      })
      formattedData.prescriptionProduct = prescriptionProduct

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
    })
  }

  const handleAddPrescription1 = () => {
    setTempData([])
    setAddForm1(true)
    setPrescButton(false)
  }

  const handleAddPrescription2 = () => {
    setTempData([])
    setAddForm2(true)
    setPrescButton(false)
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
      <div className="App mb-5">
        <header className="App-header">
          <HeaderMain />
        </header>
        <div className="container m-t-10">
          <div className="header-presciption">
            Create Prescription
          </div>
          <form onSubmit={handleSubmit(submitForm)}>
            <div class="mb-3 row">
              <label className='col-sm-2 col-form-label'>Diagnosis</label>
              <div class="col-sm-10">
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
              </div>
            </div>
            <div class="mb-3 row">
              <label className='col-sm-2 col-form-label'>Purpose</label>
              {/* <label className='col-sm-2 col-form-label'>Description</label>
              <div class="col-sm-10">
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  type='text'
                  size='30'
                  className='form-control'
                  placeholder='Enter text here'
                />
                <p className='text-danger'>{errors.description?.message}</p>
              </div> */}
              <div class="col-sm-10">
                <Form.Select {...register(`description`)} >
                  <option value="">Select Purpose</option>
                  <option value="treatment">treatment</option>
                  <option value="control">control</option>
                  <option value="prevention">prevention</option>

                </Form.Select>
              </div>
            </div>

            {/* <label className='col-sm-2 col-form-label'>Amount</label>
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

            <div class="mb-3 row">
              <label className='col-sm-2 col-form-label'>Signature Link</label>
              <div class="col-sm-10">
                <input
                  // {...register("signatureLink", {
                  //   required: "signatureLink is required",
                  // })}
                  type='text'
                  size='30'
                  className='form-control'
                  placeholder='Enter link here'
                />
                <br />
                <i className="fa fa-copy" onClick={() => clickFile(siglink)} style={{ paddingRight: 5 }} />
                Copy your signature
                <p className='text-danger'>{errors.signatureLink?.message}</p>
              </div>
            </div>

            <div class="mb-3 row">
              <label className='col-sm-2 col-form-label'>Animal Type</label>
              <div class="col-sm-10">
                <Form.Select {...register("petTypeId", { required: true })}>
                  <option value="">Select Animal</option>
                  {
                    animalData.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </Form.Select>
                <button type='button' className='btn btn-primary' onClick={() => handleGetAllAnimals()}>
                  <i className="fa fa-refresh"></i>
                </button>
              </div>
            </div>

            <div class="mb-3 row">
              <label className='col-sm-2 col-form-label'>No. of Animals</label>
              <div class="col-sm-10">
                <input
                  {...register("noOfPets", {
                    required: "No. of Animals is required",
                  })}
                  type='number'
                  size='30'
                  className='form-control'
                  placeholder='Enter text here'
                />
                <p className='text-danger'>{errors.noOfPets?.message}</p>
              </div>
            </div>

            {/* Medicine Details */}
            <div class="mb-3 row">
              <label className='col-sm-2 col-form-label'>Drug</label>
              {/* field array */}
              <div class="col-sm-10">
                <Form.Select {...register(`prescriptionProduct[0].productId`)} >
                  <option value="">Select Drug</option>
                  {
                    medicineData.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.name}<span> - {item.description}</span> - {item.formatType}
                      </option>
                    ))}
                </Form.Select>
              </div>
            </div>

            <div class="mb-3 row">
              <label className='col-sm-2 col-form-label'>Quantity</label>
              <div class="col-sm-10">
                <input
                  {...register(`prescriptionProduct[0].amount`, {
                    required: "Amount is required",
                  })}
                  type='number'
                  size='30'
                  className='form-control m-b-10'
                  placeholder='quantity of products'
                />
                <Form.Select {...register(`prescriptionProduct[0].amountMeasurement`)} >
                  <option value="">Select Measurement</option>
                  <option value="bottle/s">bottle</option>
                  <option value="cannister/s">cannister</option>
                  <option value="sack/s">sack</option>
                  <option value="bag/s">bag</option>
                </Form.Select>
                <span style={{ color: "blue", fontSize: "12px" }}>*Number of product unit sizes to dispense</span>
              </div>
            </div>

            <div class="mb-3 row">
              <label className='col-sm-2 col-form-label'>Unit Size</label>
              <div class="col-sm-10">
                <input
                  {...register(`prescriptionProduct[0].unitSize`, {
                    required: "Unit Size is required",
                  })}
                  type='text'
                  size='30'
                  className='form-control m-b-10'
                  placeholder='volume of product in each bag...'
                />

                <Form.Select {...register(`prescriptionProduct[0].measurement`)} >
                  <option value="">Select Measurement</option>
                  <option value="milligram/s">milligram</option>
                  <option value="gram/s">gram</option>
                  <option value="kilogram/s">kilogram</option>
                  <option value="milliliter/s">milliliter</option>
                  <option value="liter/s">liter</option>
                </Form.Select>
                <span style={{ color: "blue", fontSize: "12px" }}>Volume of product in each format bag, cannister, bottle etc...</span>
              </div>
            </div>

            <div class="mb-3 row">
              <label className='col-sm-2 col-form-label'>Strength</label>
              <div class="col-sm-10">
                <input
                  {...register(`prescriptionProduct[0].strength`, {
                    required: "Strength is required",
                  })}
                  type='number'
                  size='30'
                  className='form-control m-b-10'
                  placeholder='active ingredient content in percent'
                />
                <span style={{ color: "blue", fontSize: "12px" }}>Active ingredient content in %</span>
              </div>
            </div>

            {
              addForm1 &&
              <>
                <div class="mb-3 row">
                  <label className='col-sm-2 col-form-label'>Drug</label>
                  {/* field array */}
                  <div class="col-sm-10">
                    <Form.Select {...register(`prescriptionProduct[1].productId`)} >
                      <option value="">Select Drug</option>
                      {
                        medicineData.map((item, index) => (
                          <option key={index} value={item.id}>
                            {item.name}<span> - {item.description}</span> - {item.formatType}
                          </option>
                        ))}
                    </Form.Select>
                  </div>
                </div>

                <div class="mb-3 row">
                  <label className='col-sm-2 col-form-label'>Quantity</label>
                  <div class="col-sm-10">
                    <input
                      {...register(`prescriptionProduct[1].amount`, {
                        required: "Amount is required",
                      })}
                      type='number'
                      size='30'
                      className='form-control m-b-10'
                      placeholder='quantity of products'
                    />
                    <Form.Select {...register(`prescriptionProduct[1].amountMeasurement`)} >
                      <option value="">Select Measurement</option>
                      <option value="bottle/s">bottle</option>
                      <option value="cannister/s">cannister</option>
                      <option value="sack/s">sack</option>
                      <option value="bag/s">bag</option>
                    </Form.Select>
                    <span style={{ color: "blue", fontSize: "12px" }}>*Number of product unit sizes to dispense</span>
                  </div>
                </div>

                <div class="mb-3 row">
                  <label className='col-sm-2 col-form-label'>Unit Size</label>
                  <div class="col-sm-10">
                    <input
                      {...register(`prescriptionProduct[1].unitSize`, {
                        required: "Unit Size is required",
                      })}
                      type='text'
                      size='30'
                      className='form-control m-b-10'
                      placeholder='volume of product in each bag...'
                    />

                    <Form.Select {...register(`prescriptionProduct[1].measurement`)} >
                      <option value="">Select Measurement</option>
                      <option value="milligram/s">milligram</option>
                      <option value="gram/s">gram</option>
                      <option value="kilogram/s">kilogram</option>
                      <option value="milliliter/s">milliliter</option>
                      <option value="liter/s">liter</option>
                    </Form.Select>
                    <span style={{ color: "blue", fontSize: "12px" }}>Volume of product in each format bag, cannister, bottle etc...</span>
                  </div>
                </div>

                <div class="mb-3 row">
                  <label className='col-sm-2 col-form-label'>Strength</label>
                  <div class="col-sm-10">
                    <input
                      {...register(`prescriptionProduct[1].strength`, {
                        required: "Strength is required",
                      })}
                      type='number'
                      size='30'
                      className='form-control m-b-10'
                      placeholder='active ingredient content in percent'
                    />
                    <span style={{ color: "blue", fontSize: "12px" }}>Active ingredient content in %</span>
                  </div>
                </div>
              </>
            }
            {
              addForm2 &&
              <>
                <div class="mb-3 row">
                  <label className='col-sm-2 col-form-label'>Drug</label>
                  {/* field array */}
                  <div class="col-sm-10">
                    <Form.Select {...register(`prescriptionProduct[2].productId`)} >
                      <option value="">Select Drug</option>
                      {
                        medicineData.map((item, index) => (
                          <option key={index} value={item.id}>
                            {item.name}<span> - {item.description}</span> - {item.formatType}
                          </option>
                        ))}
                    </Form.Select>
                  </div>
                </div>

                <div class="mb-3 row">
                  <label className='col-sm-2 col-form-label'>Quantity</label>
                  <div class="col-sm-10">
                    <input
                      {...register(`prescriptionProduct[2].amount`, {
                        required: "Amount is required",
                      })}
                      type='number'
                      size='30'
                      className='form-control m-b-10'
                      placeholder='quantity of products'
                    />
                    <Form.Select {...register(`prescriptionProduct[2].amountMeasurement`)} >
                      <option value="">Select Measurement</option>
                      <option value="bottle/s">bottle</option>
                      <option value="cannister/s">cannister</option>
                      <option value="sack/s">sack</option>
                      <option value="bag/s">bag</option>
                    </Form.Select>
                    <span style={{ color: "blue", fontSize: "12px" }}>*Number of product unit sizes to dispense</span>
                  </div>
                </div>

                <div class="mb-3 row">
                  <label className='col-sm-2 col-form-label'>Unit Size</label>
                  <div class="col-sm-10">
                    <input
                      {...register(`prescriptionProduct[2].unitSize`, {
                        required: "Unit Size is required",
                      })}
                      type='text'
                      size='30'
                      className='form-control m-b-10'
                      placeholder='volume of product in each bag...'
                    />

                    <Form.Select {...register(`prescriptionProduct[2].measurement`)} >
                      <option value="">Select Measurement</option>
                      <option value="milligram/s">milligram</option>
                      <option value="gram/s">gram</option>
                      <option value="kilogram/s">kilogram</option>
                      <option value="milliliter/s">milliliter</option>
                      <option value="liter/s">liter</option>
                    </Form.Select>
                    <span style={{ color: "blue", fontSize: "12px" }}>Volume of product in each format bag, cannister, bottle etc...</span>
                  </div>
                </div>

                <div class="mb-3 row">
                  <label className='col-sm-2 col-form-label'>Strength</label>
                  <div class="col-sm-10">
                    <input
                      {...register(`prescriptionProduct[2].strength`, {
                        required: "Strength is required",
                      })}
                      type='number'
                      size='30'
                      className='form-control m-b-10'
                      placeholder='active ingredient content in percent'
                    />
                    <span style={{ color: "blue", fontSize: "12px" }}>Active ingredient content in %</span>
                  </div>
                </div>
              </>
            }
            <hr />
            <br />
            <button
              disabled={prescButton}
              type='submit'
              className='btn btn-primary'
              onClick={() => setFinalizedPrescriptions(true)}
            >
              Add Prescription
            </button>
            <p style={{ color: '#f01', fontStyle: 'italic' }}>{`* always add prescription before saving prescription`}</p>
          </form>
          <button className="mx-1" onClick={() => handleAddPrescription1()}>{`Add 2nd Prescription`}</button>
          <button className="mx-1" onClick={() => handleAddPrescription2()}>{`Add 3rd Prescription`}</button>
          <br />
          <br />

          <div class="mb-3 row">
            <label className='col-sm-2 col-form-label m-b-10'>Client</label>
            <div class="col-sm-10">
              <select id="client" className="form-control">
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
              </select>
            </div>
          </div>
          <br />
          {finalizedPrescriptions && <button onClick={() => handleSave()} className='btn btn-primary' type="submit">Save Prescription</button>}
        </div>
      </div>
    </>
  );
}
