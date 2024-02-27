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

export default function Prescriptions1() {
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
    const [addForm, setAddForm] = useState(true);
    const [addForm1, setAddForm1] = useState(false);
    const [addForm2, setAddForm2] = useState(false);
    const [pButton1, setPButton1] = useState(false);
    const [pButton2, setPButton2] = useState(true);
    const [pButton3, setPButton3] = useState(false);
    const [finalizedPrescriptions, setFinalizedPrescriptions] = useState(false);
    const [prescButton, setPrescButton] = useState(false);
    const [tempDeleteData, setTempDeleteData] = useState([]);
    const [showForm, setShowForm] = useState(false);

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

  const handleCloseModal = () => {
    setShowForm(false);
  };

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

  console.log({tempDeleteData})

  const submitForm = async (data) => {
    console.log({data})
    setLoading(true);
    if (
      data.prescriptionProduct[0].amount !== "" &&
      data.prescriptionProduct[0].amountMeasurement !== "" &&
      data.prescriptionProduct[0].measurement !== "" &&
      data.prescriptionProduct[0].productId !== "" &&
      data.prescriptionProduct[0].unitSize !== "" &&
      data.prescriptionProduct[0].strength !== ""
    ) {

      const arr = data;

      tempDeleteData.push(arr);

      setTempData([...tempData, arr]);
      console.log(data)
      setPrescButton(true);
      console.log({tempData, "arr" : arr.prescriptionProduct})

      if(addForm === true){
        setAddForm(false);
      }
      if(addForm1 === true){
        setAddForm1(false)
      }
      if(addForm2 === true){
        setAddForm2(false)
      }
    }
    setLoading(false);
  };

  const handleDeleteDrugFromArray = () => {
    const index = tempDeleteData?.indexOf(0);

    tempDeleteData.splice(index, 1);

    console.log({tempDeleteData})
  };

  const clickFile = (link) => {
    navigator.clipboard.writeText(link)
    toast.success('File link copied to clipboard.')
  }

  useEffect(() => {
  }, [tempData]);

  const handleSave = async () => {
    const e = document.getElementById("client");
    const value = e.value;
    const text = e.options[e.selectedIndex].text;

    tempDeleteData.forEach(async data => {
      data.patientId = value
      data.petTypeId = parseInt(data?.petTypeId)
      data.patientId = parseInt(data?.patientId)
      data.noOfPets = parseInt(data?.noOfPets)

      let formattedData = {};
      let prescriptionProduct = [];

      Object.keys(data).forEach(item => {
        if (item.includes('prescriptionProduct')) {
          data[item]?.forEach(item => {
            if (
              item?.amountMeasurement !== "" ||
              item?.measurement !== "" ||
              item?.strength !== "" ||
              item?.unitSize !== ""
            ) {
              return prescriptionProduct.push(item);
            }
          })
        } else {
          return formattedData[item] = data[item];
        }
      })
      formattedData.prescriptionProduct = prescriptionProduct;

      console.log({formattedData_lenth: formattedData?.prescriptionProduct ?? '' })

      const response = await new PrescriptionAPI().createPrescriptions(formattedData);

      if (response.ok) {
        notifySuccessPrescription()
        handleGetPrescription();
        reset();
        // setShowForm(false);
        // navigate('/prescriptions')
      } else {
        toast.error(response.data.errorMessage);
        handleGetPrescription();
        handleGetAllMedicines();
        handleGetAllAnimals();
        handleGetAllPatients();
      }
    })
  }

  const handleAddPrescription = () => {
    setTempData([])
    setAddForm(true)
    setPrescButton(false)
  }

  const handleAddPrescription1 = () => {
    setTempData([])
    setAddForm1(true)
    setPrescButton(false)
    setPButton2(false)
    setPButton3(true)
  }

  const handleAddPrescription2 = () => {
    setTempData([])
    setAddForm2(true)
    setPrescButton(false)
    setPButton3(false)
  }

  return(
    <>
      {/* Toast */}
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
      {/* End of Toast */}

      <Modal show={showForm} onHide={() => handleCloseModal()}>
        <Modal.Header className='font-10' closeButton>
          Prescription Preview
        </Modal.Header>
        <Modal.Body>
          {tempData.map((item) => (
            item.prescriptionProduct.map((item1)=>(
              <span>{item1.strength}</span>
            ))
          ))}
        </Modal.Body>
      </Modal>

      <div className="App mb-5">
        <header className="App-header">
          <HeaderMain />
        </header>
        <div className="container">
          <div className="pcard">
            <span className="header-title-addpres">Add Prescriptions</span>
            <div class="card-body">
              <form onSubmit={handleSubmit(submitForm)}>
                <div className="geninfo">
                <label className="col-form-label header-title-geninfo">General Information</label>
                  <div class="mb-3">
                    <label class="col-form-label">Diagnosis</label>
                    <input
                      {...register("title", {
                        required: "Diagnosis is required",
                      })}
                      type='text'
                      size='30'
                      className='form-control'
                      placeholder='Enter diagnosis here'
                    />
                    <p className='text-danger'>{errors.title?.message}</p>
                  </div>
                  <Row>
                  <Col sm={4}>
                  <div class="mb-3">
                    <label class="col-form-label">Purpose</label>
                    <Form.Select {...register(`description`)} >
                      <option value="">Select Purpose</option>
                      <option value="treatment">Treatment</option>
                      <option value="control">Control</option>
                      <option value="prevention">Prevention</option>
                    </Form.Select>
                  </div>
                  </Col>
                  <Col sm={4}>
                  <div class="mb-3 ">
                    <label className='col-form-label'>Animal Type</label>
                    <Form.Select {...register("petTypeId", { required: true })}>
                      <option value="">Select Animal</option>
                      {
                        animalData.map((item, index) => (
                          <option key={index} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                    </Form.Select>
                    {/* <button type='button' className='btn btn-primary' onClick={() => handleGetAllAnimals()}>
                      <i className="fa fa-refresh"></i>
                    </button> */}
                  </div>
                  </Col>
                  <Col sm={4}>
                  <div class="mb-3">
                    <label className='col-form-label'>No. of Animals</label>
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
                  </Col>
                  </Row>
                  <div class="mb-3">
                    <label class="col-form-label">Signature Link</label>
                    <i className="fa fa-copy" onClick={() => clickFile(siglink)} style={{ paddingRight: 5, marginLeft:5 }} />
                    <small>Copy and Paste</small>
                    <input
                      {...register("signatureLink", {
                        required: "signatureLink is required",
                      })}
                      type='text'
                      size='30'
                      className='form-control'
                      placeholder='Paste link here'
                    />
                    <br />
                    <p className='text-danger'>{errors.signatureLink?.message}</p>
                  </div>
                </div>
                {tempData.map((item) => (
                  item.prescriptionProduct.map((item1)=>(
                    <span>{item1.strength}</span>
                  ))
                ))}

                {
                addForm &&
                <>
                <div className="geninfo">
                  
                  <label className="col-form-label header-title-geninfo">Medicine Information</label>
                  <br></br>
                  <span style={{color:"red"}}>First Drug</span>
                  <div class="mb-3">
                    <label className='col-form-label'>Drug</label>
                    {/* field array */}
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
                  
                  <Row>
                    <Col sm={6}>
                      <div class="mb-3">
                        <label className='col-form-label'>Quantity</label>
                          <input
                            {...register(`prescriptionProduct[0].amount`, {
                              required: "Amount is required",
                            })}
                            type='number'
                            size='30'
                            className='form-control m-b-10'
                            placeholder='Quantity of products'
                          />
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div class="mb-3">
                        <label className='col-form-label'>Measurement</label>
                        <Form.Select {...register(`prescriptionProduct[0].amountMeasurement`)} >
                          <option value="">Select Measurement</option>
                          <option value="bottle/s">bottle</option>
                          <option value="cannister/s">cannister</option>
                          <option value="sack/s">sack</option>
                          <option value="bag/s">bag</option>
                        </Form.Select>
                        <span style={{ color: "blue", fontSize: "12px" }}>*Number of product unit sizes to dispense</span>
                      </div>
                    </Col>

                    <Col sm={6}>
                      <div class="mb-3">
                        <label className='col-form-label'>Unit Size</label>
                        <input
                          {...register(`prescriptionProduct[0].unitSize`, {
                            required: "Unit Size is required",
                          })}
                          type='text'
                          size='30'
                          className='form-control m-b-10'
                          placeholder='Volume of product in each bag...'
                        />
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div class="mb-3">
                        <label className='col-form-label'>Unit Measurement</label>
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
                    </Col>
                  </Row>
                  <div class="mb-3">
                    <label className='col-form-label'>Strength</label>
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
                </>
                }
                
                {
                addForm1 &&
                <>
                <div className="geninfo">
               
                  <label className="col-form-label header-title-geninfo">Medicine Information</label>
                  <br></br>
                  <span style={{color:"red"}}>Second Drug</span>
                  <div class="mb-3">
                    <label className='col-form-label'>Drug</label>
                    {/* field array */}
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
                  
                  <Row>
                    <Col sm={6}>
                      <div class="mb-3">
                        <label className='col-form-label'>Quantity</label>
                          <input
                            {...register(`prescriptionProduct[1].amount`, {
                              required: "Amount is required",
                            })}
                            type='number'
                            size='30'
                            className='form-control m-b-10'
                            placeholder='Quantity of products'
                          />
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div class="mb-3">
                        <label className='col-form-label'>Measurement</label>
                        <Form.Select {...register(`prescriptionProduct[1].amountMeasurement`)} >
                          <option value="">Select Measurement</option>
                          <option value="bottle/s">bottle</option>
                          <option value="cannister/s">cannister</option>
                          <option value="sack/s">sack</option>
                          <option value="bag/s">bag</option>
                        </Form.Select>
                        <span style={{ color: "blue", fontSize: "12px" }}>*Number of product unit sizes to dispense</span>
                      </div>
                    </Col>

                    <Col sm={6}>
                      <div class="mb-3">
                        <label className='col-form-label'>Unit Size</label>
                        <input
                          {...register(`prescriptionProduct[1].unitSize`, {
                            required: "Unit Size is required",
                          })}
                          type='text'
                          size='30'
                          className='form-control m-b-10'
                          placeholder='Volume of product in each bag...'
                        />
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div class="mb-3">
                        <label className='col-form-label'>Unit Measurement</label>
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
                    </Col>
                  </Row>
                  <div class="mb-3">
                    <label className='col-form-label'>Strength</label>
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
                <div className="geninfo">
                
                  <label className="col-form-label header-title-geninfo">Medicine Information</label>
                  <br></br>
                  <span style={{color:"red"}}>Third Drug</span>
                  <div class="mb-3">
                    <label className='col-form-label'>Drug</label>
                    {/* field array */}
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
                  
                  <Row>
                    <Col sm={6}>
                      <div class="mb-3">
                        <label className='col-form-label'>Quantity</label>
                          <input
                            {...register(`prescriptionProduct[2].amount`, {
                              required: "Amount is required",
                            })}
                            type='number'
                            size='30'
                            className='form-control m-b-10'
                            placeholder='Quantity of products'
                          />
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div class="mb-3">
                        <label className='col-form-label'>Measurement</label>
                        <Form.Select {...register(`prescriptionProduct[2].amountMeasurement`)} >
                          <option value="">Select Measurement</option>
                          <option value="bottle/s">bottle</option>
                          <option value="cannister/s">cannister</option>
                          <option value="sack/s">sack</option>
                          <option value="bag/s">bag</option>
                        </Form.Select>
                        <span style={{ color: "blue", fontSize: "12px" }}>*Number of product unit sizes to dispense</span>
                      </div>
                    </Col>

                    <Col sm={6}>
                      <div class="mb-3">
                        <label className='col-form-label'>Unit Size</label>
                        <input
                          {...register(`prescriptionProduct[2].unitSize`, {
                            required: "Unit Size is required",
                          })}
                          type='text'
                          size='30'
                          className='form-control m-b-10'
                          placeholder='Volume of product in each bag...'
                        />
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div class="mb-3">
                        <label className='col-form-label'>Unit Measurement</label>
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
                    </Col>
                  </Row>
                  <div class="mb-3">
                    <label className='col-form-label'>Strength</label>
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
                    Confirm Prescription
                  </button>
                  {/* <button
                    className='btn btn-primary'
                    onClick={() => setShowForm(true)}
                  >
                    See
                  </button> */}
                  <p style={{ color: '#f01', fontStyle: 'italic' }}>{`* always add prescription before saving prescription`}</p>
                </form>
                {pButton1 && <button className="mx-1" onClick={() => handleAddPrescription()}>{`Add Drug`}</button>}
                {pButton2 && <button className="btn btn-primary" onClick={() => handleAddPrescription1()}>{`Add Another Drug`}</button>}
                {pButton3 && <button className="btn btn-primary" onClick={() => handleAddPrescription2()}>{`Add Another Drug`}</button>}
                {<button className="btn btn-primary" onClick={() => handleDeleteDrugFromArray()}>{`Remove Drug`}</button>}

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
            {/* End of card body */}
          </div>
        </div>

      </div>

    </>
  )

}