import React, { useEffect, useState } from "react";
import { Modal, Form, Button, Select, Row, Col } from "react-bootstrap";
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
import sig from "../../assets/images/signature.png"

export default function PrescriptionCerttificate() {
  const [loading, setLoading] = useState(true);
  const [prescriptionData, setPrescriptionData] = useState([]);
  const [prescriptionDrug, setPrescriptionDrug] = useState([]);
	const presId = sessionStorage.getItem("pId")
  const fullname = sessionStorage.getItem("name")
  const prc = sessionStorage.getItem("prc")
  const ptr = sessionStorage.getItem("ptr")
  const userid = sessionStorage.getItem("userID")
  const siglink = `https://cdn.vetdrums.org/user/${userid}/Signature/Signature.png`

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    handleGetPrescription();
  }, []);   

  const handleGetPrescription = async () => {
    setLoading(true);
    const response = await new PrescriptionAPI().getPrescription(presId);
    if (response.ok) {
        setPrescriptionData(response.data);
        setPrescriptionDrug(response.data.prescriptionProduct);
    } else {
      toast.error("Something went wrong while fetching user");
    }
    setLoading(false);
  };

  return (
    <>
      {/* {loading && <FullScreenLoader />} */}
      <div className="App">
        <div className="container m-t-10">
					<div className="header-presciption">
          VETERINARY DRUG ORDER	
        	</div>
          <div className="">
						<Row>
              <Col md={4} className="header-title">VDO No.</Col><Col md={8}>{prescriptionData.trackingNo}</Col>
							<Col md={4} className="header-title">Date</Col><Col md={8}>{prescriptionData.datePrescribed}</Col>
							<Col md={4} className="header-title">Name of Client / Farm</Col><Col md={8}>{prescriptionData.patientName}</Col>
							<Col md={4} className="header-title">Address</Col><Col md={8}>{prescriptionData.address}</Col>
							<Col md={4} className="header-title">Species</Col><Col md={8}>{prescriptionData.petTypeName}</Col>
							<Col md={4} className="header-title">No. of Animals</Col><Col md={8}>{prescriptionData.noOfPets}</Col>
              <p></p>
							<Col md={4} className="header-title">Veterinary Drug Product</Col><Col md={8}>{
                prescriptionDrug.map((pp,index)=>(
                  <div>
                  <div>Drug: {pp.productName}</div>
                  <div>Unit Size: {pp.unitSize + " " + pp.amountMeasurement}</div>
                  <div>Amount: {pp.amount + " " + pp.measurement}</div>
                  <div>Strength: {pp.strength}</div>
                  <hr></hr>
                  </div>
                ))
              }</Col>
              <p></p>
              <Col md={4} className="header-title">Veterinarian</Col><Col md={8}>{fullname}</Col>
							<Col md={4} className="header-title">Profession</Col><Col md={8}>Veterinarian</Col>
							<Col md={4} className="header-title">PRC No.</Col><Col md={8}>{prc}</Col>
							<Col md={4} className="header-title">PTR No.</Col><Col md={8}>{ptr}</Col>
						</Row>
            <br></br>
            <Row>
              <Col md={12} className="header-title t-a-c border-1px m-b-10">VETERINARY-CLIENT-PATIENT-RELATIONSHIP</Col>
              <Col md={6} className="border-1px">
                <span>
                  I have contracted the services of Dr. {fullname} to diagnose and treat disease problems of the animals
                  in my farm. I agree to follow the veterinarian's instructions and directions including the 
                  widthrawal period.
                </span>
                <br></br>
                <br></br>
                <div className="" style={{position:"center"}}>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox" >
                    <Form.Check type="checkbox" label="Agree" />
                  </Form.Group>
                </div>
                <div className="t-a-c">
                  {prescriptionData.patientName}
                </div>
              </Col>
              <Col md={6} className="border-1px">
                <span>
                  I have agreeed to assume the responsibility for making clinical judgements regarding the health of the animals
                  described above and their need for medical treatment. I further agree to be readily available to follow-up
                  and evaluation in the event of adverse reaction or failure of the treatment regiment
                </span>
                <br></br>
                <br></br>
                <div className="t-a-c">
                  <img src={siglink} width="150" height="100" alt=""/>
                </div>
                <div className="t-a-c">
                  {fullname}
                </div>
                <div className="t-a-c">
                  Veterinarian, {prescriptionData.address} 
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}
