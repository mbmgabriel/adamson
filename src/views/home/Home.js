import '../../assets/index.css';
import HeaderMain from '../headers/header';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import MedicinesAPI from "../../api/MedicinesAPI"
import {Doughnut, Bar, Line} from 'react-chartjs-2';
import DispensersAPI from "../../api/DispensersAPI"
import Alert from 'react-bootstrap/Alert';

function Home() {

  const [loading, setLoading] = useState(true);
  const [medicineData, setMedicineData] = useState([]);
  const [dateFrom, setDateFrom] = useState([])
  const [dateTo, setDateTo] = useState([])
  const userfullname = localStorage.getItem("name")
  const prc = localStorage.getItem("prc")
  const storeId = localStorage.getItem("userID")
  const [drugDispensed, setDrugDispensed] = useState([])
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    handleGetAllMedicines();
  }, []);   

  const handleGetAllMedicines = async () => {
    setLoading(true);
    const response = await new MedicinesAPI().medicines();
    if (response.ok) {
        setMedicineData(response.data);
    } else {
      toast.error("Something went wrong while fetching user");
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

  const submitForm = async (data) => {
    setLoading(true);
      const response = await new DispensersAPI().getDispensedReport(data);
      if (response.ok) {
        reset();
        // setShowForm(false);
      } else {
        toast.error(response.data.errorMessage);
      }
    setLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <HeaderMain/>
      </header>
      {prc === "" && <Alert variant="warning">
          You need to Fill up your PRC license no. <a href="/profile">Click Here</a>
      </Alert>}
      <div className="container">
        <div className="main-title-pages m-t-10 m-b-10">
          Dashboard
        </div>
        <Row>
          <Col md={4}>
            <Card className="dash-card">
              <Card.Body>
                <Row>
                  <Col md={6}>
                    Welcome Back! <span>{userfullname}</span>
                  </Col>
                  <Col md={6}>
                    
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="dash-card">
              <Card.Body>
                <Row>
                  <Col md={6}>
                    Medicines
                    Total No.
                  </Col>
                  <Col md={6}>
                    {medicineData.length}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="dash-card">
              <Card.Body>
                <Row>
                  <Col md={6}>
                    Dispensed
                    Total No.
                  </Col>
                  <Col md={6}>
                    {drugDispensed.length}

                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <Row>
          <Col md={6}>
            <Card className="dash-card">
              <Card.Body>
              <Doughnut 
                data={{labels: [
                  'Red',
                  'Blue',
                  'Yellow'
                ],
                datasets: [{
                  label: 'My First Dataset',
                  data: [300, 50, 100],
                  backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                  ],
                  hoverOffset: 4
                }]}}
              />
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="dash-card">
              <Card.Body>
                <Line
                  data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [{
                      label: 'My First dataset',
                      backgroundColor: 'rgb(255, 99, 132)',
                      borderColor: 'rgb(255, 99, 132)',
                      data: [0, 10, 5, 2, 20, 30, 45],
                    }]
                  }}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <span className="m-l-10"> Date To:
          <input
            type='date'
            size='30'
            className='form-control'
            placeholder='Enter text here'
            onChange={(e) => setDateTo(e.target.value)}
          />
          Date From:
          <input
            type='date'
            size='30'
            className='form-control'
            placeholder='Enter text here'
            onChange={(e) => setDateFrom(e.target.value)}
          />
          <button type='submit' className='btn btn-primary'>
            Search
          </button> 
        </span>
      </div>
    </div>
  );
}

export default Home;