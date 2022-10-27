import React, { useEffect, useState } from "react";
import { Modal, Form, Button, Select } from "react-bootstrap";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import PrescriptionAPI from "../../api/PrescriptionAPI"
import MedicinesAPI from "../../api/MedicinesAPI"
import AnimalsAPI from "../../api/AnimalsAPI"
import PatientsAPI from "../../api/PatientsAPI"
import SweetAlert from "react-bootstrap-sweetalert";
import HeaderMain from "../headers/header";
import "../../../node_modules/font-awesome/css/font-awesome.css"
import UsersAPI from "../../api/UsersAPI"
import Prescriptions from "../prescriptions/Prescriptions";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [fileData, setFileData] = useState([]);
	const [showForm, setShowForm] = useState(false);
  const [resetNotify, setResetNotify] = useState(false);
	const [filesToUpload, setFilesToUpload] = useState({});
	const [showUploadModal, setShowUploadModal] = useState(false);
	const userid = localStorage.getItem("userID")

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    handleGetUserFile();
  }, []);   

	const notifyUpload = () => 
  toast("Wow so easy !");

  const handleGetUploadedUserFile = (file) => {
    getBase64(file).then(
      data => {
        console.log(file.name)
        let toUpload = {
          // classId: id,
          "userId": JSON.parse(userid),
          "base64String": data,
          "filename": file.name
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
    let response = await new UsersAPI().uploadFile(userid, filesToUpload)
    if(response.ok){
      setLoading(false);
      handleGetUserFile();
      // toast.success("Successfully uploaded the class list.")
      alert('success')
      notifyUpload()
      
    }else{
      setLoading(false);
      alert("Something went wrong while uploading class list")
    }
  }

	const submitForm = async (data) => {
    setLoading(true);
    
      const response = await new UsersAPI().createUser(data);
      if (response.ok) {
        toast.success("Successfully Created Term");
        reset();
        setShowForm(false);
      } else {
        toast.error(response.data.errorMessage);
      }
    
    setLoading(false);
  };

  const handleGetUserFile = async () => {
    setLoading(true);
    const response = await new UsersAPI().userfile(userid);
    if (response.ok) {
        setFileData(response.data);
    } else {
      toast.error("Something went wrong while fetching user");
    }
    setLoading(false);
  };

	const handleShowUploadModal = () => {
    return(
      <Modal  size="lg" show={showUploadModal} onHide={()=> setShowUploadModal(false)} aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header className='class-modal-header' closeButton>
          <Modal.Title id="example-modal-sizes-title-lg" >
            Upload a file
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleUploadFile(e)} >  
            <Form.Group className="mb-3">
              <Form.Control type="file" accept=".xls,.xlsx,.png,.jpg" onChange={(e) => handleGetUploadedUserFile(e.target.files[0])} />
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
        <div className="container">
          <div className="row">
						<div className='col-md-3 m-b-15'></div>
							<div className='col-md-6 m-b-15' style={{position:"center"}}>
						
								<header className="App-header m-t-50" style={{fontSize:"30px", marginBottom:"30px", marginTop:"100px", fontWeight:"bold"}}>
									User Profile
									<button className='btn btn-primary m-l-10' size="sm" onClick={() =>  setShowUploadModal(true)}>
										<i className="fa fa-plus fa-2xl"></i> Upload file
									</button> 
								</header>
								{handleShowUploadModal()}
								<table>
									<tr>
										<th>Filename</th>
										<th>URL</th>
									</tr>
									<tbody>
									{fileData.map((fd,index)=>(
									<tr>
										<td>{fd.filename}</td>
										<td>{fd.path}
                    <button
												onClick={() => {
													window.open(`${fd.path}`, '_blank')
												}}
												className='btn btn-danger btn-sm m-r-5'
											>
												<i className="fa fa-arrow-eye"></i>View / Download
											</button>
                    </td>
                    
									</tr>
									))}
									</tbody>
								</table>
							</div>
						<div className='col-md-3 m-b-15'></div>
          </div>
        </div>
      </div>
    </>
  );
}
