import '../../assets/index.css';
import HeaderMain from '../headers/header';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import MedicinesAPI from "../../api/MedicinesAPI"
import {Doughnut, Bar, Line} from 'react-chartjs-2';
import DispensersAPI from "../../api/DispensersAPI"
import UsersAPI from "../../api/UsersAPI"
import Alert from 'react-bootstrap/Alert';
import ReactTable from "react-table-v6";

function Home() {

  const [loading, setLoading] = useState(true);
  const [medicineData, setMedicineData] = useState([]);
  const [dispensersData, setDispenserData] = useState([]);
  const [dateFrom, setDateFrom] = useState([])
  const [dateTo, setDateTo] = useState([])
  const [medLabel, setMedLabel] = useState([])
  const [disLabel, setDisLabel] = useState([])
  const [disData, setDisData] = useState([])
  const userfullname = localStorage.getItem("name")
  const prc = localStorage.getItem("prc")
  const lto = localStorage.getItem("lto")
  const usertype = localStorage.getItem("userType")
  const storeid = localStorage.getItem("storeID")
  // const storeId = localStorage.getItem("userID")
  const [drugDispensed, setdrugDispensed] = useState([])
 

  const handleAddrTypeChange = (e) => { 
    // console.clear(); 
    console.log((dispensersData[e.target.value])); 
    // setDispenserData(dispensersData[e.target.value]) 
      }

  const getStoreID = (e) => {
    localStorage.setItem('storeID', e.target.value)
  }

  const productsSet = () => {
    const p =
    dispensersData.map((item, index)=>(
      item.productName
    ))

    return(
      p
    )
  }

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    handleGetAllMedicines();
    handleGetDispensers();
    getLabelMedicine();
    getLabelDispensed();
    getDataDispensed();
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

  const getLabelMedicine = () => {
    let tempData = []
    medicineData.map((ta, index) =>{
      let temp = '';
      let name = `${ta?.name}`
      temp  = name;
      tempData.push(temp)
    })
    setMedLabel(tempData)
  }

  const getLabelDispensed = () => {
    let tempData = []
    drugDispensed.map((ta, index) =>{
      let temp = '';
      let name = `${ta?.productName}`
      temp  = name;
      tempData.push(temp)
    })
    setDisLabel(tempData)
  }
  const getDataDispensed = () => {
    let tempData = []
    drugDispensed.map((ta, index) =>{
      let temp = '';
      let name = `${ta?.totalDispersed}`
      temp  = name;
      tempData.push(temp)
    })
    setDisData(tempData)
  }


  const handleGetDispensers = async () => {
    setLoading(true);
    const response = await new UsersAPI().users();
    if (response.ok) {
        setDispenserData(response.data);
    } else {
      toast.error("Something went wrong while fetching user");
    }
    setLoading(false);
  };

  const submitForm = async (data) => {
    setLoading(true);
    
    const response = await new DispensersAPI().rangeReport(storeid, data);
      if (response.ok) {
        setdrugDispensed(response.data);
				console.log(response.data)
        getDataDispensed();
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
      {prc === "" && usertype === "Veterenarian" && <Alert variant="warning">
          You need to Fill up your PRC license no. <a href="/profile">Click Here</a>
      </Alert>}
      {lto === "" && usertype === "Dispenser" && <Alert variant="warning">
          You need to Fill up your LTO license no. <a href="/profile">Click Here</a>
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
        {/* {disData} */}
        {/* <Row>
          <Col md={6}>
          <div>{disData}</div>
            <Card className="dash-card">
              <Card.Body>
              <Doughnut 
                // data={{labels: [
                //   'Red',
                //   'Blue',
                //   'Yellow'
                // ],
                data={{labels:disLabel,
                datasets: [{
                  label: 'My Dataset',
                  data: disData,
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
                    // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    labels: [dispensersData.map((item, index)=>(
                      item.productName
                    ))],
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
        </Row> */}
        
        {usertype === "Admin" &&
        <>
        <form onSubmit={handleSubmit(submitForm)}>
          <label className='control-label mb-2'>Type</label>
            <Form.Select onChange={getStoreID}>
              <option value="">Select Dispensing</option>
              {
                dispensersData.map((item, index) => (
                    <option key={index} value={item.storeId}>
                        {item.userTypeId === 3 && item.fullname}
                    </option>
                ))}
            </Form.Select>
          
          <p className='text-danger'>{errors.name?.message}</p>
          <label className='control-label mb-2'>Date From</label>
          <input
            {...register("dateFrom", {
              required: "Date From is required",
            })}
            type='date'
            size='30'
            className='form-control'
            placeholder='Enter text here'
          />

          <label className='control-label mb-2'>Date To</label>
            <input
            {...register("dateTo", {
              required: "Date To is required",
            })}
            type='date'
            size='30'
            className='form-control'
            placeholder='Enter text here'
          />
          <p className='text-danger'>{errors.name?.message}</p>
            <button type='submit' className='btn btn-primary'>
              Search
            </button> 
        </form>
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
                  Header: "Drug Name",
                  id: "productName",
                  accessor: (d) => d.productName,
                },
                {
                  Header: "Total Dispense",
                  id: "totalDispersed",
                  accessor: (d) => d.totalDispersed,
                },
              ],
            },
          ]}
          csv
          edited={drugDispensed}
          defaultPageSize={10}
          className='-highlight'
        />
        </>
      }
      </div>
    </div>
  );
}

export default Home;