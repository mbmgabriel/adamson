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

export default function PrescriptionCerttificate() {
  const [loading, setLoading] = useState(true);
  const [prescriptionData, setPrescriptionData] = useState([]);
	const presId = localStorage.getItem("pId")

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
							<Col md={4} className="header-title">Date</Col><Col md={8}>1</Col>
							<Col md={4} className="header-title">Name of Client / Farm</Col><Col md={8}>{prescriptionData.patientName}</Col>
							<Col md={4} className="header-title">Address</Col><Col md={8}>1</Col>
							<Col md={4} className="header-title">Species</Col><Col md={8}>1</Col>
							<Col md={4} className="header-title">No. of Animals</Col><Col md={8}>1</Col>
              <p></p>
              <Col md={4} className="header-title">Strength</Col><Col md={8}>1</Col>
							<Col md={4} className="header-title">Unit Size</Col><Col md={8}>1</Col>
							<Col md={4} className="header-title">Veterinary Drug Product</Col><Col md={8}>1</Col>
							<Col md={4} className="header-title">Species</Col><Col md={8}>1</Col>
							<Col md={4} className="header-title">Quantity</Col><Col md={8}>1</Col>
              <p></p>
              <Col md={4} className="header-title">Veterinarian</Col><Col md={8}>1</Col>
							<Col md={4} className="header-title">Profession</Col><Col md={8}>1</Col>
							<Col md={4} className="header-title">PRC No.</Col><Col md={8}>1</Col>
							<Col md={4} className="header-title">PTR No.</Col><Col md={8}>1</Col>
						</Row>
            <Row>
              <Col md={6} className="header-title"></Col>
              <Col md={6}></Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}
