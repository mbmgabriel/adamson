import React, { useEffect, useState } from "react";
import { Modal, Form, Button, Select, Col, Row } from "react-bootstrap";
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
  const [showUploadModalPRC, setShowUploadModalPRC] = useState(false);
  const [sigLinkData, setSigLinkData] = useState(false);
  const [prcId, setPrcId] = useState("");
	const userid = localStorage.getItem("userID")
  const userfullname = localStorage.getItem("name")
  const prc = localStorage.getItem("prc")
  const lto = localStorage.getItem("lto")
  const usertype = localStorage.getItem("userType")
  const siglink = `http://tfismartasp-001-site18.btempurl.com/user/${userid}/Signature/Signature.png`
  const [sigLinkDataError, setSigLinkDataError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    handleGetUserFile();
    getSigLink();
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

  const handleGetUploadedUserFilePRC = (file) => {
    getBase64(file).then(
      data => {
        console.log(file.name)
        let toUpload = {
          // classId: id,
          "userId": JSON.parse(userid),
          "base64String": data,
          "filename": file.name,
          "cardNo":prcId,
          "cardType":1,
          "cardExpiration": "2022-11-14T08:43:20.918Z",
      	};
				setFilesToUpload(toUpload)
			}
    );
  }

  const getSigLink = async () => {
    let response = await fetch(siglink)
    if (response.ok) {
      setSigLinkData(response.data);
      console.log(response.data.status)
      console.log(response.data)
  } else {
    toast.error("Something went wrong while fetching siglink");
  }
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
    let response = await new UsersAPI().uploadSignature(userid, filesToUpload)
    if(response.ok){
      setLoading(false);
      handleGetUserFile();
      toast.success("Successfully uploaded the class list.")
      notifyUpload()
    }else{
      setLoading(false);
      alert("Something went wrong while uploading class list")
    }
  }

  const handleUploadFilePRC = async(e) => {
    e.preventDefault();
    setShowUploadModalPRC(false);
    setLoading(true);
    let response = await new UsersAPI().uploadPRC(userid, filesToUpload)
    if(response.ok){
      setLoading(false);
      toast.success("Successfully uploaded PRC ID.")
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



  const handleImageError = (e) => {
    // console.log = "https://en.wikipedia.org/wiki/Pluto#/media/File:Pluto_in_True_Color_-_High-Res.jpg"
    // e.target.src = "https://en.wikipedia.org/wiki/Pluto#/media/File:Pluto_in_True_Color_-_High-Res.jpg"
    setSigLinkDataError('No Signature, Upload a signature')
  }

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
              <Form.Control type="file" accept=".png,.jpg" onChange={(e) => handleGetUploadedUserFile(e.target.files[0])} />
            </Form.Group>
            <Form.Group className='right-btn'>
              <Button className='tficolorbg-button' type='submit'>Upload</Button>
            </Form.Group>
          </Form> 
        </Modal.Body>
      </Modal>
    )
  }

  const handleShowUploadModalPRC = () => {
    return(
      <Modal  size="lg" show={showUploadModalPRC} onHide={()=> setShowUploadModalPRC(false)} aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header className='class-modal-header' closeButton>
          <Modal.Title id="example-modal-sizes-title-lg" >
            Upload PRC ID
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleUploadFilePRC(e)} >  
            <Form.Group className="mb-3">
              <Form.Control type="file" accept=".png,.jpg" onChange={(e) => handleGetUploadedUserFilePRC(e.target.files[0])} />
              <br></br>
              <label>PRC ID</label>
              <Form.Control type="text" value={prcId} onChange={(e) => setPrcId(e.target.value)}/>
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
							<div className='col-md-12 m-b-15' style={{position:"center"}}>
						
								<header className="App-header m-t-50" style={{fontSize:"30px", marginBottom:"30px", marginTop:"100px", fontWeight:"bold"}}>
									User Profile
									
								</header>
								{handleShowUploadModal()}
                {handleShowUploadModalPRC()}
                {/* <Row style={{fontWeight:"bold"}}>
                  <Col style={{textAlign:"left"}} md={2}>Signature:</Col>
                  <Col style={{textAlign:"left"}} md={10}>
                    
                    {sigLinkDataError === "No Signature, Upload a signature" ? 
                    <button className='btn btn-primary m-l-10' size="xs" onClick={() =>  setShowUploadModal(true)}> 
										  <i className="fa fa-plus fa-2xl"></i> Upload signature
								  	</button>  
                    : <img className="img-fluid img-thumbnail" src={siglink} 
                    onError={handleImageError}
                     ></img>} 
                  </Col>

                  <Col style={{textAlign:"left"}} md={2}>Name:</Col>
                  <Col style={{textAlign:"left"}} md={10}>{userfullname}</Col>
                </Row> */}
                <Row>
                  <Col md={4}>
                    <div className="card mb-4">
                      <div className="card-body text-center">
                        {<img className="img-fluid img-thumbnail" src={siglink} 
                        onError={handleImageError}
                        ></img>}
                        <h5 className="my-3">{userfullname}</h5>
                        <p className="text-muted mb-1">{usertype}</p>
                        {/* <div className="d-flex justify-content-center mb-2">
                          <button type="button" className="btn btn-primary">Follow</button>
                          <button type="button" className="btn btn-outline-primary ms-1">Message</button>
                        </div> */}
                      </div>
                    </div>
                  </Col>
                  <Col md={8}>
                    <div class="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Full Name</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{userfullname}</p>
                      </div>
                    </div>
                    <hr></hr>
                  </Col>

                  <Col md={4}>
                    <div className="card mb-4">
                      <div className="card-body text-center">
                        {
                        // <img className="img-fluid img-thumbnail" src={siglink} 
                        // onError={handleImageError}
                        // ></img>
                        <button className='btn btn-primary m-l-10' size="xs" onClick={() =>  setShowUploadModalPRC(true)}> 
                          <i className="fa fa-plus fa-2xl"></i> Upload PRC ID
                        </button>
                        }
                        <h5 className="my-3">PRC ID</h5>
                        <p className="text-muted mb-1">{prc}</p>
                        {/* <div className="d-flex justify-content-center mb-2">
                          <button type="button" className="btn btn-primary">Follow</button>
                          <button type="button" className="btn btn-outline-primary ms-1">Message</button>
                        </div> */}
                      </div>
                    </div>
                  </Col>
                  <Col md={8}>
                    <div class="row">
                      <div className="col-sm-3">
                        <p className="mb-0">PRC No.</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{prc}</p>
                      </div>
                    </div>
                    <hr></hr>
                  </Col>

                  <Col md={4}>
                    <div className="card mb-4">
                      <div className="card-body text-center">
                        {sigLinkDataError === "No Signature, Upload a signature" ? 
                        <button className='btn btn-primary m-l-10' size="xs" onClick={() =>  setShowUploadModal(true)}> 
                          <i className="fa fa-plus fa-2xl"></i> Upload signature
                        </button>  
                        : <img className="img-fluid img-thumbnail" src={siglink} 
                        onError={handleImageError}
                        ></img>}
                        <h5 className="my-3">Signature</h5>
                        <p className="text-muted mb-1">{prc}</p>
                        {/* <div className="d-flex justify-content-center mb-2">
                          <button type="button" className="btn btn-primary">Follow</button>
                          <button type="button" className="btn btn-outline-primary ms-1">Message</button>
                        </div> */}
                      </div>
                    </div>
                  </Col>
                  <Col md={8}>
                    {/* <div class="row">
                      <div className="col-sm-3">
                        <p className="mb-0">PRC No.</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{prc}</p>
                      </div>
                    </div>
                    <hr></hr> */}
                  </Col>
                </Row>
                {/* <div>
                  <div className="m-b-10">Signature: {sigLinkDataError === "No Signature, Upload a signature" 
                    ? 
                    <button className='btn btn-primary m-l-10' size="xs" onClick={() =>  setShowUploadModal(true)}> 
										  <i className="fa fa-plus fa-2xl"></i> Upload signature
								  	</button>  
                    : 
                    <img className="img-fluid img-thumbnail" src={siglink} onError={handleImageError}></img>
                    }
                  </div>
                  <br></br>
                  <div className="m-b-10">
                    Name: {userfullname}
                  </div>
                </div> */}
								{/* <table>
									<tr>
										<th>Signature</th>
										<th>Link</th>
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
								</table> */}
							</div>
          </div>
        </div>
      </div>
    </>
  );
}
