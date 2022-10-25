import React, { useEffect, useState } from "react";
import { Modal, Form, Button, Select, Row, Col } from "react-bootstrap";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { toast } from "react-toastify";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import PrescriptionAPI from "../../api/PrescriptionAPI"
import MedicinesAPI from "../../api/MedicinesAPI"
import AnimalsAPI from "../../api/AnimalsAPI"
import PatientsAPI from "../../api/PatientsAPI"
import SweetAlert from "react-bootstrap-sweetalert";
import HeaderMain from "../headers/header";
import "../../../node_modules/font-awesome/css/font-awesome.css"
import DispensersAPI from "../../api/DispensersAPI"

export default function Dispensed({setSelectedPrescription, selectedPrescription}) {
  const [loading, setLoading] = useState(true);
  const [prescriptionData, setPrescriptionData] = useState([]);
  const [prescriptionDrug, setPrescriptionDrug] = useState([]);
	const [medicineData, setMedicineData] = useState([]);
  const [animalData, setAnimalData] = useState([]);
  const [patientData, setPatientData] = useState([]);
	const presId = localStorage.getItem("pId")

	const [presDrugs, setPresDrugs] = useState([]);
	const [trackingNo, setTrackingNo] = useState('');
	const [dispenseData, setDispenseData] = useState([]);



	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [patientId, setPatientId] = useState('');
	const [petTypeId, setPetTypeId] = useState('');
	const [noOfPets, setNoOfPets] = useState('');
	const [signatureLink, setSignatureLink] = useState('');
	const [productId, setProductId] = useState('');
	const [amount, setAmount] = useState('');
	const [unitSize, setUnitSize] = useState('');
	const [strength, setStrength] = useState('');
	// const [dispenseProduct, setdispenseProduct] = useState([]);

	const { control } = useForm();
	const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "test", // unique name for your Field Array
  });

	const trackId = localStorage.getItem("trackingNo")
	const storeId = localStorage.getItem("userID")


  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    handleGetDispense()
		handleGetAllMedicines()
  }, []);   

	const handleGetDispense = async (e) => {
    setLoading(true);
    const response = await new DispensersAPI().getDispense(trackId);
    if (response.ok) {
        setDispenseData(response.data);
				setPresDrugs(response.data.dispenseProduct)
				console.log(response.data)
    } else {
      // toast.error("Something went wrong while fetching user");
    }
    setLoading(false);
  };

	const handleGetAllMedicines = async () => {
    setLoading(true);
    const response = await new MedicinesAPI().medicines();
    if (response.ok) {
        setMedicineData(response.data);
    } else {
      // toast.error("Something went wrong while fetching user");
    }
    setLoading(false);
  };

	const submitForm = async (data) => {
    setLoading(true);
    alert('test')
			console.log({data})
			let formattedData = {}
			let dispenseProduct = []
			Object.keys(data).forEach(item => {
				console.log({item})
				if(item.includes('dispenseProduct')){
					dispenseProduct.push(data[item])
				}else{
					formattedData[item] = data[item]
				}
			})
			console.log({dispenseData})
			formattedData.dispenseProduct = dispenseProduct
			console.log({formattedData})



      const response = await new DispensersAPI().createDispense(formattedData);
      if (response.ok) {
        toast.success("Successfully Created Term");
        handleGetDispense();
        reset();
        // setShowForm(false);
      } else {
        toast.error(response.data.errorMessage);
      }
    setLoading(false);
  };

  return (
    <>
      {/* {loading && <FullScreenLoader />} */}
      <div className="App">
			<header className="App-header">
          <HeaderMain/>
        </header>
        <div className="container m-t-10">
					<div className="header-presciption">
          Dispense Product	
        	</div>
          <div className="">
					<form onSubmit={handleSubmit(submitForm)}>
          <div className='col-md-12 m-b-15'>
              <label className='control-label mb-2'>Tracking No.</label>
                <input
                {...register("trackingNo", {
                  required: "Tracking is required",
                })}
								value={trackId}
                type='text'
                size='30'
								// disabled
                className='form-control'
                placeholder='Enter text here'
              />

							<label className='control-label mb-2'>Dispense ID.</label>
                <input
                {...register("storeId", {
                  required: "Dispense Id is required",
                })}
								value={storeId}
                type='text'
                size='30'
								// disabled
                className='form-control'
                placeholder='Enter text here'
              />

              <label className='control-label mb-2 m-r-5'>Drug</label>
							{fields.map((item, index) => (
								<div key={item.id}> <span style={{fontWeight:"bold"}}>{index + 1}.</span>
									<Form.Select {...register(`${index}_dispenseProduct.productId`)} >
										<option value="">Select Drug</option>
										{
											medicineData.map((item, index) => (
													<option key={index} value={item.id}>
															{item.name}
													</option>
											))}
									</Form.Select>
									<label className='control-label mb-2'>Amount</label>
										<input
										{...register(`${index}_dispenseProduct.amount`, {
											required: "Amount is required",
										})}
										type='text'
										size='30'
										className='form-control m-b-10'
										placeholder='Enter text here'
									/>
									
									<button type="button" onClick={() => remove(index)} className='btn btn-danger'><i className="fa fa-trash"></i></button>
									<hr></hr>
								</div>
							))}
								<button
									type="button"
									className='btn btn-primary'
									onClick={() => append({ firstName: "bill", lastName: "luo" })}
									>
									<i className="fa fa-plus"></i>
								</button>
								{/* end field array */}

								<br></br>
								<br></br>
								<button type='submit' className='btn btn-primary'>
								Dispense
							</button>
            </div>	
						</form>
          </div>
        </div>
      </div>
    </>
  );
}
