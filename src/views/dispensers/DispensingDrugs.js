import React, { useEffect, useState } from "react";
import { Link, redirect, BrowserRouter, useNavigate } from 'react-router-dom'
import { Modal, Form, Button, Select, Toast } from "react-bootstrap";
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
import DispensersAPI from "../../api/DispensersAPI"
import Dispensed from "./CreateDispense";

export default function DispensingDrugs() {
  const [loading, setLoading] = useState(true);
  const [prescriptionData, setPrescriptionData] = useState([]);
	const [presDrugs, setPresDrugs] = useState([]);
	const [trackingNo, setTrackingNo] = useState('');
	const [dispenseData, setDispenseData] = useState([]);
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
	const [drugDispensed, setDrugDispensed] = useState([])
	const storeId = localStorage.getItem("userID")

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    handleGetAllPrescriptions();
    // handleGetAllMedicines();
    // handleGetAllAnimals();
    // handleGetAllPatients();
		handleStoreDispensed();
  }, []);   

  

  const notifyUpload = () => 
  toast("Wow so easy !");

  const notifyAlreadyDispensed = () => 
  toast.warning("Already Dispensed");

  const notifyNoTrack = () => 
  toast.warning("Please input VDO no.");


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
      notifyUpload()
      
    }else{
      setLoading(false);
      // alert("Something went wrong while uploading class list")
    }
  }

  const handleGetAllPrescriptions = async () => {
    setLoading(true);
    const response = await new PrescriptionAPI().prescriptions();
    if (response.ok) {
        setPrescriptionData(response.data);
    } else {
      // toast.error("Something went wrong while fetching user");
    }
    setLoading(false);
  };

	const handleGetDispense = async (e) => {
		e.preventDefault()
    console.log(trackingNo)
    setLoading(true);
    const response = await new DispensersAPI().getDispense(trackingNo);
    if (response.ok) {
        setDispenseData(response.data);
				setPresDrugs(response.data.prescriptionProduct)
				console.log(response.data.prescriptionProduct)
    } else {
      if(trackingNo === ""){
        notifyNoTrack();
      }else{
        notifyAlreadyDispensed();
      }
    }
    setLoading(false);
  };

	const handleStoreDispensed = async () => {
    setLoading(true);
		
    const response = await new DispensersAPI().getStoreDispensed(storeId);
    if (response.ok) {
        setDrugDispensed(response.data);
				console.log(response.data)
    } else {
      // toast.error("Something went wrong while fetching user");
    }
    setLoading(false);
  };

  // const handleGetAllMedicines = async () => {
  //   setLoading(true);
  //   const response = await new MedicinesAPI().medicines();
  //   if (response.ok) {
  //       setMedicineData(response.data);
  //   } else {
  //     // toast.error("Something went wrong while fetching user");
  //   }
  //   setLoading(false);
  // };

  // const handleGetAllAnimals = async () => {
  //   setLoading(true);
  //   const response = await new AnimalsAPI().animals();
  //   if (response.ok) {
  //       setAnimalData(response.data);
  //   } else {
  //     // toast.error("Something went wrong while fetching user");
  //   }
  //   setLoading(false);
  // };

  // const handleGetAllPatients = async () => {
  //   setLoading(true);
  //   const response = await new PatientsAPI().patients();
  //   if (response.ok) {
  //       setPatientData(response.data);
  //   } else {
  //     // toast.error("Something went wrong while fetching user");
  //   }
  //   setLoading(false);
  // };

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
        // toast.error("Something went wrong while updating the term");
      }
    } else {
      const response = await new PrescriptionAPI().createPrescriptions(data);
      if (response.ok) {
        toast.success("Successfully Created Term");
        handleGetAllPrescriptions();
        reset();
        setShowForm(false);
      } else {
        toast.error(response.data.errorMessage);
      }
    }
    setLoading(false);
  };

  const handleDeleteAnimal = async (id) => {
    setLoading(true);
    setResetNotify(false);
    const response = await new PrescriptionAPI().deletePrescriptions(id);
    if (response.ok) {
      toast.success("Successfully Deleted Animal");
      handleGetAllPrescriptions();
    } else {
      // toast.error("Something went wrong while deleting user");
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
        <div className="container m-t-10">
					<Form onSubmit={handleGetDispense}>
            <div className="main-title-pages m-b-10"> Prescription to Dispense 
							<div className="m-b-20"> 
								<input
									type='text'
									size='30'
									className='form-control m-b-10'
									placeholder='Enter VDO No. here'
                  name="vdo"
									onChange={(e) => setTrackingNo(e.target.value)}
								/>
								<button type='submit' className='btn btn-primary'>
									Search
								</button> 
							</div>
							<div>
								<table className="table table-bordered">
									<tr>
										<th>Client</th>
										<th>Date Prescribed</th>
										<th>Prescribed Drugs</th>
										<th>Actions</th>
									</tr>
									<tbody>
										<tr>
											<td>
												{dispenseData.patientName}
											</td>
											<td>
												{dispenseData.datePrescribed}
											</td>
											<td>
											{presDrugs.map((pd,index)=>(
												<span>
													<span>{pd.productName}</span>
													<br></br>
													<span>Amount: {pd.amount}</span>
													<br></br>
													<span>Strength: {pd.strength}</span>
													<br></br>
													<span>Unit Size: {pd.unitSize}</span>
													<hr></hr>
												</span>
											))}
											</td>
											<td>
											<button
												onClick={() => {
													setSelectedPrescription(dispenseData);
													localStorage.setItem("trackingNo", dispenseData.trackingNo)
                          localStorage.setItem("productid", presDrugs[0].productId)
                          localStorage.setItem("pname", presDrugs[0].productName)
                          localStorage.setItem("amount", presDrugs[0].amount)
													window.open(`http://localhost:3000/dispensed`, '_blank')
													// window.open(`http://localhost:3000/dispensed/${row.original.id}`, '_blank')
												}}
												className='btn btn-danger btn-sm m-r-5'
											>
												<i className="fa fa-arrow-right"></i>Dispense
											</button>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
            </div>
					</Form>
			
				Dispensed Drugs
				{/* {drugDispensed.productName} */}
				<ReactTable
        pageCount={100}
        list={drugDispensed}
        filterable
        data={drugDispensed}
        columns={[
          {
            Header: "",
            columns: [
              {
                Header: "Dispensing",
                id: "dispenserName",
                accessor: (d) => d.dispenserName,
              },
              {
                Header: "Date Dispensed",
                id: "dispersedDate",
                accessor: (d) => d.dispersedDate,
              },
							{
                Header: "Drug",
                id: "productName",
                accessor: (d) => d.productName,
              },
							{
                Header: "Amount",
                id: "amount",
                accessor: (d) => d.amount,
              },
            ],
          },
        ]}
        csv
        edited={drugDispensed}
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
        </div>
      </div>
    </>
  );
}
