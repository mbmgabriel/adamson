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
					<header className="App-header">
          Prescription
					{localStorage.getItem("pId")}
					{prescriptionData.title}
        	</header>
          <div className="cert-border">
						<p>Date: October 22, 2022</p>
						<div>Name of Farm / Name of Customer / Address:
							Batangas Farm , Juan Dela Cruz , Batangas PH
						</div>
						<div>Species: Swine</div>
						<div>Number of. Animals: 200</div>
						<br></br>
						<div>Strength: 10%</div>
						<div>Unit Size: 10kg per bag </div>
						<div>Veterinary Drug Product: Amlodipine</div>
						<div>Quantity: 200</div>

						<br></br>

						<div>Dr. Betty Rinaryo</div>
						<div>Veterinarian, XYZ Feedmill, Batangas</div>
						<div>PRC No. 24-9999</div>
						<div>PTR No. 567-234</div>
          </div>
        </div>
      </div>
    </>
  );
}
