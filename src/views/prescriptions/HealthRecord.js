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

export default function HealthRecord() {
  const [loading, setLoading] = useState(true);
  const [healthRecord, setHealthRecord] = useState([]);
  const [prescriptionData, setPrescriptionData] = useState([]);
  const presId = sessionStorage.getItem("pId")

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    handleGetRecord();
    handleGetPrescription();
  }, []);   

  const handleGetRecord = async () => {
    setLoading(true);
    const response = await new PrescriptionAPI().getHealthRecord(presId);
    if (response.ok) {
        setHealthRecord(response.data);
    } else {
      toast.error("Something went wrong while fetching user");
    }
    setLoading(false);
  };

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
            <div className="header-presciption">
              Health Record
            <div>{prescriptionData.title}</div>
            </div>
          </header>
          <div className="cert-border">
            {healthRecord.map((hr,index)=>(
              <div>
                  {hr.filename}
                  <p><a href={hr.path}>D</a></p>
              </div>  
            ))}		
          </div>
        </div>
      </div>
    </>
  );
}
