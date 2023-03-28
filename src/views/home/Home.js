import '../../assets/index.css';
import HeaderMain from '../headers/header';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import MedicinesAPI from "../../api/MedicinesAPI"
import {Doughnut, Bar, Line} from 'react-chartjs-2';
import DispensersAPI from "../../api/DispensersAPI"
import UsersAPI from "../../api/UsersAPI"
import PrescriptionAPI   from "../../api/PrescriptionAPI"
import Alert from 'react-bootstrap/Alert';
import ReactTable from "react-table-v6";


function Home() {

  const [loading, setLoading] = useState(true);
  const [dData, setDData]=useState([]);
  const [medicineData, setMedicineData] = useState([]);
  const [dispensersData, setDispenserData] = useState([]);
  const [dateFrom, setDateFrom] = useState([])
  const [dateTo, setDateTo] = useState([])
  const [medLabel, setMedLabel] = useState([])
  const [disLabel, setDisLabel] = useState([])
  const [disData, setDisData] = useState([])
  const userfullname = sessionStorage.getItem("name")
  const prc = sessionStorage.getItem("prc")
  const lto = sessionStorage.getItem("lto")
  const usertype = sessionStorage.getItem("userType")
  const userid = sessionStorage.getItem("userID")
  const storeid = sessionStorage.getItem("storeID")
  const pId = sessionStorage.getItem("pId")
  // const storeId = sessionStorage.getItem("userID")
  const [drugDispensed, setdrugDispensed] = useState([])
  const [drugDispensed1, setdrugDispensed1] = useState([])
  const [drugDispensed2, setdrugDispensed2] = useState([])
  const [userPrescription, setUserPrescription] = useState([])
  const [prescriptionProduct, setPrescriptionProduct] = useState([])
  const [prescriptionProduct1, setPrescriptionProduct1] = useState([])

  const handleAddrTypeChange = (e) => { 
    // console.clear(); 
    console.log((dispensersData[e.target.value])); 
    // setDispenserData(dispensersData[e.target.value]) 
      }

  const getStoreID = (e) => {
    sessionStorage.setItem('storeID', e.target.value)
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
    handleGetAllDispensed();
    handleGetUserDispensed();
    handleGetDispensers();
    getLabelMedicine();
    getLabelDispensed();
    getDataDispensed();
    handleGetUserPrescriptions();
    handleGetUserPrescriptionsProduct();
    handleGetUserPrescriptionsProduct1();
    // handleGetDispensers();
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

  const handleGetUserPrescriptions = async () => {
    setLoading(true);
    const response = await new PrescriptionAPI().getUserPrescription(pId);
    if (response.ok) {
        setUserPrescription(response.data);
        console.log(response.data)
    } else {
      toast.error("Something went wrong while fetching user");
    }
    setLoading(false);
  };

  const handleGetUserPrescriptionsProduct1 = async () => {
    setLoading(true);
    const response = await new PrescriptionAPI().getUserPrescription(pId);
    if (response.ok) {
        setPrescriptionProduct1(response?.data);
    } else {
      toast.error("Something went wrong while fetching user");
    }
    setLoading(false);
  };

  const handleGetUserPrescriptionsProduct = async () => {
    setLoading(true);
    const response = await new PrescriptionAPI().getUserPrescription(pId);
    if (response.ok) {
        // setPrescriptionProduct(response?.data?.prescriptionProduct);
        let temp = []
        response.data.map(i => {
          temp.push(i?.prescriptionProduct)
        })
        setPrescriptionProduct(temp);
        console.log("M",temp)
    } else {
      toast.error("Something went wrong while fetching user");
    }
    setLoading(false);
  };

  const handleGetDispensers = async () => {
    setLoading(true);
    const response = await new UsersAPI().usertypedispenser();
    if (response.ok) {
        setDData(response.data);
    } else {
      toast.error("Something went wrong while fetching user");
    }
    setLoading(false);
  };

  const handleGetAllDispensed = async () => {
    setLoading(true);
    const response = await new DispensersAPI().getAllDispensed();
    if (response.ok) {
        setdrugDispensed1(response.data);
        // console.log(response.data.productDispersed)
    } else {
      toast.error("Something went wrong while fetching user");
    }
    setLoading(false);
  };

  const handleGetUserDispensed = async () => {
    setLoading(true);
    const response = await new DispensersAPI().getUserDispensed(userid);
    if (response.ok) {
        setdrugDispensed2(response.data);
        // console.log(response.data.productDispersed)
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

  const getDataDispensed1 = () => {
    let tempData = []
    drugDispensed1.map((item, index) => (
      item.productDispersed.map((item1, index) => {
        let temp = '';
        let name = `${item1?.amount}`
        temp  = name;
        tempData.push(temp)
      })
  ))
    // setDisData(tempData)
    return tempData
  }

  const getDataDispensed2 = () => {
    let tempData = []
    drugDispensed2.map((item, index) => (
      item.productDispersed.map((item1, index) => {
        let temp = '';
        let name = `${item1?.amount}`
        temp  = name;
        tempData.push(temp)
      })
  ))
    // setDisData(tempData)
    return tempData
  }

  const aa = drugDispensed1.map((item, index) => (
    item.productDispersed.map((item1, index) => {
      return `${item1?.amount}`
    })
  ))

  const ac = drugDispensed1.map((item, index) => (
    item.productDispersed.map((item1, index) => {
      let tempData = []
      return `${item1?.amount}`
    })
  ))

  const ab = drugDispensed1.map((item, index) => {
      return `${item.product.name}`
  })

  const ab1 = drugDispensed2.map((item, index) => {
    return `${item.product.name}`
})



const pproduct = userPrescription.map((item, index) => (
  item.prescriptionProduct.map((item1, index) => {
   return `${item1.productName}`
  })
))





  const submitForm = async (data) => {
    setLoading(true);
    
    const response = await new DispensersAPI().rangeReport(storeid, data);
      if (response.ok) {
        setdrugDispensed(response.data);
        getDataDispensed();
        // reset();
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
        {usertype === "Admin" && "Veterenarian" &&
        <Row>
          <Col md={6}>
            <Card className="dash-card">
              {usertype === "Veterenarian" ?
              <Card.Body>
              <Doughnut 
                // data={{labels: [
                //   'Red',
                //   'Blue',
                //   'Yellow'
                // ],
                data={{labels:ab1,
                datasets: [{
                  label: 'My Dataset',
                  data: getDataDispensed2(),
                  backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                  ],
                  hoverOffset: 4
                }]}}
              />
              </Card.Body>
            : 
            <Card.Body>
              <Doughnut 
                // data={{labels: [
                //   'Red',
                //   'Blue',
                //   'Yellow'
                // ],
                data={{labels:ab,
                datasets: [{
                  label: 'My Dataset',
                  data: getDataDispensed1(),
                  backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                  ],
                  hoverOffset: 4
                }]}}
              />
              </Card.Body>
            }
            </Card>
          </Col>
        </Row>
        }
        
        {usertype === "Admin" &&
        <>
        <form onSubmit={handleSubmit(submitForm)}>
          <label className='control-label mb-2'>Type</label>
          <Form.Select onChange={getStoreID}>
              <option value="">Select Dispensing</option>
              {
                dData.map((item, index) => (
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
        {/* {userPrescription} */}
        {/* {prescriptionProduct} */}
      {usertype === "Patient" &&
      <div>
      Prescribed Medicines
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Track No.</th>
            <th>Prescription Name</th>
            <th>Date Prescribed</th>
          </tr>
        </thead>
        <tbody>
          {prescriptionProduct1?.map((item,index)=>(
          <tr>
            <td>{item?.trackingNo}</td>
            <td>{item?.title}</td>
            <td>{item?.datePrescribed}</td>
            {item.prescriptionProduct.map((pp,index)=>(
              <td>{pp?.productName}</td>
            ))}
          </tr>
          ))}
        </tbody>
      </Table>
      </div>
      }
      </div>
    </div>
  );
}

export default Home;