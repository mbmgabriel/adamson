import React, { useEffect, useState } from "react";
import { Link, redirect, BrowserRouter, useNavigate } from 'react-router-dom'
import { Modal, Form, Button, Select, Toast, Alert } from "react-bootstrap";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import 'react-toastify/dist/ReactToastify.css';
import PrescriptionAPI from "../../api/PrescriptionAPI"
import MedicinesAPI from "../../api/MedicinesAPI"
import AnimalsAPI from "../../api/AnimalsAPI"
import PatientsAPI from "../../api/PatientsAPI"
import SweetAlert from "react-bootstrap-sweetalert";
import HeaderMain from "../headers/header";
import "../../../node_modules/font-awesome/css/font-awesome.css"
import Badge from 'react-bootstrap/Badge';

export default function Prescriptions() {
  const [loading, setLoading] = useState(true);
  const [prescriptionData, setPrescriptionData] = useState([]);
  const [prescriptionUserData, setPrescriptionUserData] = useState([]);
  const [medicineData, setMedicineData] = useState([]);
  const [animalData, setAnimalData] = useState([]);
  const [patientData, setPatientData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [resetNotify, setResetNotify] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [filesToUpload, setFilesToUpload] = useState({});
  const navigate = useNavigate();
  const presId = localStorage.getItem("pId")
  const userid = localStorage.getItem("userID")
  const userfullname = localStorage.getItem("name")
  const prc = localStorage.getItem("prc")
  const lto = localStorage.getItem("lto")
  const usertype = localStorage.getItem("userType")
  const storeid = localStorage.getItem("storeID")
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    handleGetAllPrescriptions();
    handleGetAllMedicines();
    handleGetAllAnimals();
    handleGetAllPatients();
    handleGetAllPrescriptionsUser();
  }, []);   

  

  const notifySuccessPrescription = () => 
  toast("Successfully created Prescription");


  const handleGetUploadedFile = (file) => {
    getBase64(file).then(
      data => {
        console.log(file.name)
        let toUpload = {
          // classId: id,
          
          "prescriptionId": JSON.parse(presId),
          "base64String": data,
          "filename": file.name
        };
        setFilesToUpload(toUpload)
      }
    );
  }

  const handleGetUploadedUserFile = (file) => {
    getBase64(file).then(
      data => {
        console.log(file.name)
        let toUpload = {
          // classId: id,
          data: {
          "userId": JSON.parse(presId),
          "base64String": data,
          "filename": file.name}
        };
        setFilesToUpload(toUpload)
      }
    );
  }

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const handleUploadFile = async(e) => {
    e.preventDefault();
    setShowUploadModal(false);
    setLoading(true);
    let response = await new PrescriptionAPI().uploadHealthRecord(presId, filesToUpload)
    if(response.ok){
      setLoading(false);
      handleGetAllPrescriptions();
      // toast.success("Successfully uploaded the class list.")
      alert('success')
      
    }else{
      setLoading(false);
      alert("Something went wrong while uploading class list")
    }
  }

  const handleGetAllPrescriptions = () => {
    setLoading(true);
    const response = new PrescriptionAPI().prescriptions();
    if (response.ok) {
        setPrescriptionData(response.data);
    } else {
      // toast.error("Something went wrong while fetching user");
      // handleGetAllPrescriptions()
    
    }
    setLoading(false);
  };

  const handleGetAllPrescriptionsUser = async () => {
    setLoading(true);
    const response = await new PrescriptionAPI().getPrescriptionUser(userid);
    if (response.ok) {
        setPrescriptionUserData(response.data);
    } else {
      // toast.error("Something went wrong while fetching user");
      handleGetAllPrescriptions()
    }
    setLoading(false);
  };

  const handleGetAllMedicines = async () => {
    setLoading(true);
    const response = await new MedicinesAPI().medicines();
    if (response.ok) {
        setMedicineData(response.data);
    } else {
      // toast.error("Something went wrong while fetching user");
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
      handleGetAllAnimals();
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
    }
    setLoading(false);
  };

  const submitForm = async (data) => {
    setLoading(true);
    if (selectedPrescription != null) {
      const response = await new PrescriptionAPI().updatePrescriptions(selectedPrescription.id, data);
      if(response.ok) {
        toast.success("Successfully Updated Animal Data")
        handleGetAllPrescriptions()
        reset()
        setShowForm(false)
        setSelectedPrescription(null)
      }else{
        toast.error("Something went wrong while updating the term");
      }
    } else {
      const response = await new PrescriptionAPI().createPrescriptions(data);
      if (response.ok) {
        notifySuccessPrescription()
        handleGetAllPrescriptions();
        reset();
        setShowForm(false);
      } else {
        toast.error(response.data.errorMessage);
      }
    }
    setLoading(false);
  };

  const handleDeletePrescription = async (id) => {
    setLoading(true);
    setResetNotify(false);
    const response = await new PrescriptionAPI().deletePrescriptions(id);
    if (response.ok) {
      toast.success("Successfully Deleted Prescription");
      handleGetAllPrescriptions();
    } else {
      toast.error("Something went wrong while deleting user");
    }
    setSelectedPrescription(null);
    setLoading(false);
  };

  const handleCloseModal = () => {
    setShowForm(false);
    setSelectedPrescription(null);
  };

  const handleShowUploadModal = () => {
    return(
      <Modal  size="lg" show={showUploadModal} onHide={()=> setShowUploadModal(false)} aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header className='class-modal-header' closeButton>
          <Modal.Title id="example-modal-sizes-title-lg" >
            Upload Health Record
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleUploadFile(e)} >  
            <Form.Group className="mb-3">
              <Form.Control type="file" accept=".xls,.xlsx,.png,.jpg" onChange={(e) => handleGetUploadedFile(e.target.files[0])} />
            </Form.Group>
            <Form.Group className='right-btn'>
              <Button className='tficolorbg-button' type='submit'>Upload</Button>
            </Form.Group>
          </Form> 
        </Modal.Body>
      </Modal>
    )
  }

  return (
    <>
      {/* {loading && <FullScreenLoader />} */}
      
      <div className="App">
        <header className="App-header">
          <HeaderMain/>
        </header>
        {prc === "" && usertype === "Veterenarian" && <Alert variant="warning">
          You need to Fill up your PRC license no. <a href="/profile">Click Here</a>
        </Alert>}
        {lto === "" && usertype === "Dispenser" && <Alert variant="warning">
            You need to Fill up your LTO license no. <a href="/profile">Click Here</a>
        </Alert>}
      <div className="container m-t-10">
        <div className="main-title-pages m-b-10"> Prescriptions 
          <span className="m-l-10"> 
            {/* <button className='btn btn-primary' size="sm" onClick={() => setShowForm(true)}> */}
            <a style={{textDecoration:"none !important", color:"white"}} href="/prescribed">
            {prc !== "" && usertype === "Veterenarian" && <button className='btn btn-primary' size="sm" >
              <i className="fa fa-plus fa-2xl"></i>
            </button>}
            {/* <button className='btn btn-primary' size="sm" >
              <i className="fa fa-plus fa-2xl"></i></button> */}
            {/* 
            <button className='btn btn-primary' size="sm" >
              <i className="fa fa-plus fa-2xl"></i>
            </button> */}
            </a>
          </span>
        </div>
        {handleShowUploadModal()}

        {/* Haru
        {
          prescriptionData.map((pd, index)=>
          <p>
            <div>{pd.address}</div>
            {
            pd.prescriptionProduct.map((pp, index)=>
              <p>{pp.productName }</p>
            )
            }
          </p>
          )
        } */}
        
      <ReactTable
        pageCount={100}
        list={prescriptionUserData}
        filterable
        data={prescriptionUserData}
        columns={[
          {
            Header: "",
            columns: [
              {
                Header: "Title",
                id: "title",
                accessor: (d) => d.title,
              },
              {
                Header: "Description",
                id: "description",
                accessor: (d) => d.description,
              },
              {
                Header: "Date Prescribed",
                id: "datePrescribed",
                accessor: (d) => d.datePrescribed,
              },
              {
                Header: "Status",
                id: "status",
                accessor: (d) => d.trackingNo === null 
                ? 
                <Badge pill bg="success">
                  Dispensed
                </Badge>
                : 
                <Badge pill bg="info">
                  Not Dispensed
                </Badge>,
              },
              {
                Header: "Actions",
                id: "edit",
                accessor: (d) => d.id,
                Cell: (row) => (
                  <div style={{textAlign:'center'}} className=''>
                    {/* {row.original.trackingNo !== null &&
                      <button
                        onClick={() => {
                          setValue('name', row.original.name)
                          setValue('description', row.original.description)
                          setSelectedPrescription(row.original);
                          setShowForm(true);
                        }}
                        className='btn btn-info btn-sm m-r-5'
                      >
                        <i className="fa fa-edit"></i>
                      </button>
                    } */}
                    <div><Link to={`/generate/${row.original.id}`}
                    onClick={() => {
                      setSelectedPrescription(row.original);
                      localStorage.setItem("pId", row.original.id)
                    }}><button className="btn btn-info btn-sm m-r-5"><i className="fa fa-book"></i>Generate</button>
                    </Link></div>
                    {/* <a href={/generate/} */}
                    {/* <button
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedPrescription(row.original);
                        // window.open(`http://localhost:3000/generate/${row.original.id}`, '_blank')
                        window.open(`https://vetdrums.org/generate/${row.original.id}`, '_blank')
                        localStorage.setItem("pId", row.original.id)
                      }}
                      className='btn btn-info btn-sm m-r-5'
                    >
                      <i className="fa fa-book"></i> Generate Prescription
                    </button> */}
                    {/* <button
                      onClick={() => {
                        setShowUploadModal(true)
                        localStorage.setItem("pId", row.original.id)
                      }}
                      className='btn btn-info btn-sm m-r-5'
                    >
                      <i className="fa fa-upload"></i>
                    </button>

                    <button
                      onClick={() => {
                        window.open(`http://localhost:3000/viewrecord/${row.original.id}`, '_blank')
                        localStorage.setItem("pId", row.original.id)
                      }}
                      className='btn btn-info btn-sm m-r-5'
                    >
                      <i className="fa fa-eye"></i>
                    </button> */}
                    
                    {/* <button
                      onClick={() => {
                        setSelectedPrescription(row.original);
                        setResetNotify(true);
                      }}
                      className='btn btn-danger btn-sm m-r-5'
                    >
                      <i className="fa fa-trash"></i>
                    </button> */}
                  </div>
                ),
              },
            ],
          },
        ]}
        csv
        edited={prescriptionUserData}
        defaultPageSize={10}
        className='-highlight'
      />
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
      <SweetAlert
        showCancel
        show={resetNotify}
        onConfirm={() => handleDeletePrescription(selectedPrescription.id)}
        confirmBtnText='Confirm'
        confirmBtnBsStyle='danger'
        cancelBtnBsStyle='secondary'
        title='Are you sure to delete this prescription?'
        onCancel={() => setResetNotify(false)}
      >
      </SweetAlert>
      <Modal size="lg" show={showForm} onHide={() => handleCloseModal()}>
        <form onSubmit={handleSubmit(submitForm)}>
          <Modal.Header className='font-10' closeButton>
            <span className='font-20'>
              {selectedPrescription != null
                ? `Update ${selectedPrescription.name}`
                : "Create Prescription"}
            </span>
          </Modal.Header>
          <Modal.Body>
            <div className='col-md-12 m-b-15'>
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

              <label className='control-label mb-2'>Amount</label>
                <input
                {...register("amount", {
                  required: "Amount is required",
                })}
                type='text'
                size='30'
                className='form-control'
                placeholder='Enter text here'
              />
              <p className='text-danger'>{errors.amount?.message}</p>

              <label className='control-label mb-2'>Frequency</label>
                <input
                {...register("frequency", {
                  required: "Frequency is required",
                })}
                type='text'
                size='30'
                className='form-control'
                placeholder='Enter text here'
              />
              <p className='text-danger'>{errors.frequency?.message}</p>

              <label className='control-label mb-2'>Animal Type</label>
              <Form.Select {...register("petTypeId", { required: true })}>
                  <option value="">Select Animal</option>
                  {animalData && 
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


              <label className='control-label mb-2'>Drug</label>
              <Form.Select {...register("drugProduct", { required: true })}>
                  <option value="">Select Drug</option>
                  {medicineData && 
                    medicineData.map((item, index) => (
                        <option key={index} value={item.id}>
                            {item.name}
                        </option>
                    ))}
              </Form.Select>

              <label className='control-label mb-2'>Patient</label>
              <Form.Select {...register("patientId", { required: true })}>
                  <option value="">Select Patient</option>
                  {patientData && 
                    patientData.map((item, index) => (
                        <option key={index} value={item.id}>
                            {item.patientName}
                        </option>
                    ))}
              </Form.Select>

              
            </div>
          </Modal.Body>
          <Modal.Footer>
            {selectedPrescription != null ? 
                <button type='submit' className='btn btn-primary'>
                Update Save
              </button>  
              :
              <button type='submit' className='btn btn-primary'>
              Save Prescription
            </button>
            }
          </Modal.Footer>
        </form>
      </Modal>

      


      </div>
      </div>
    </>
  );
}
