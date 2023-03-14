import React, { useEffect, useState } from "react";
import { Modal, Form } from "react-bootstrap";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import MedicinesAPI from "../../api/MedicinesAPI"
import SweetAlert from "react-bootstrap-sweetalert";
import HeaderMain from "../headers/header";
import "../../../node_modules/font-awesome/css/font-awesome.css"

export default function Medicines() {
  const [loading, setLoading] = useState(true);
  const [medicineData, setMedicineData] = useState([]);
  const [productFormat, setProductFormat] = useState([])
  const [typeData, setTypeData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showForm1, setShowForm1] = useState(false);
  const [resetNotify, setResetNotify] = useState(false);
  const [resetNotify1, setResetNotify1] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    handleGetAllMedicines();
    handleGetAllTypes();
  }, []);   

  const handleGetAllMedicines = async () => {
    setLoading(true);
    const response = await new MedicinesAPI().medicines();
    if (response.ok) {
        setMedicineData(response.data);
        alert("Success Load")
    } else {
      toast.error("Something went wrong while fetching user");
    }
    setLoading(false);
  };

  const handleGetAllTypes = async () => {
    setLoading(true);
    const response = await new MedicinesAPI().types();
    if (response.ok) {
        setTypeData(response.data);
    } else {
      // toast.error("Something went wrong while fetching user");
    }
    setLoading(false);
  };

  const submitForm = async (data) => {
    setLoading(true);
    if (selectedMedicine != null) {
      const response = await new MedicinesAPI().updateMedicine(selectedMedicine.id, data);
      if(response.ok) {
        toast.success("Successfully Updated Animal Data")
        handleGetAllMedicines()
        reset()
        setShowForm(false)
        setSelectedMedicine(null)
      }else{
        toast.error("Something went wrong while updating the term");
      }
    } else {
      const response = await new MedicinesAPI().createMedicine(data);
      if (response.ok) {
        toast.success("Successfully Created Drug");
        handleGetAllMedicines()
        reset();
        setShowForm(false);
      } else {
        toast.error(response.data.errorMessage);
      }
    }
    setLoading(false);
  };

  const submitFormPF = async (data) => {
    setLoading(true);
    alert('1')
    if (selectedFormat != null) {
      const response = await new MedicinesAPI().updateFormat(selectedFormat.id, data);
      if(response.ok) {
        toast.success("Successfully Updated Format Data")
        handleGetAllTypes();
        reset()
        setShowForm1(false)
        setSelectedFormat(null)
      }else{
        toast.error("Something went wrong while updating the term");
      }
    } else {
      const response = await new MedicinesAPI().createFormat(data);
      if (response.ok) {
        toast.success("Successfully Created Format");
        handleGetAllTypes();
        reset();
        setShowForm1(false);
      } else {
        toast.error(response.data.errorMessage);
      }
    }
    setLoading(false);
  };

  const handleDeleteMedicine = async (id) => {
    setLoading(true);
    setResetNotify(false);
    const response = await new MedicinesAPI().deleteMedicine(id);
    if (response.ok) {
      toast.success("Successfully Deleted Medicine");
      alert('deleted')
      handleGetAllMedicines();
    } else {
      toast.error("Something went wrong while deleting user");
    }
    setSelectedMedicine(null);
    setLoading(false);
  };

  const handleDeleteFormat = async (id) => {
    setLoading(true);
    setResetNotify1(false);
    const response = await new MedicinesAPI().deleteFormat(id);
    if (response.ok) {
      toast.success("Successfully Deleted Format");
      alert('deleted')
      handleGetAllTypes();
    } else {
      toast.error("Something went wrong while deleting format");
    }
    setSelectedMedicine(null);
    setLoading(false);
  };

  const handleCloseModal = () => {
    setShowForm(false);
    setSelectedMedicine(null);
  };

  const handleCloseModal1 = () => {
    setShowForm1(false);
    setSelectedFormat(null);
  };

  return (
    <>
      {/* {loading && <FullScreenLoader />} */}
      <div className="App">
        <header className="App-header">
          <HeaderMain/>
        </header>
      <div className="container m-t-10">
        <div className="main-title-pages m-b-10"> Medicines 
          <span className="m-l-10"> 
            <button className='btn btn-primary' size="sm" onClick={() => setShowForm(true)}>
              <i className="fa fa-plus fa-2xl"></i>
            </button> 
            {/* <button className='btn btn-primary' size="sm" onClick={() => setShowForm1(true)}>
              Add Type<i className="fa fa-plus fa-2xl"></i>
            </button>  */}
          </span>
        </div>
      <ReactTable
        pageCount={100}
        list={medicineData}
        filterable
        data={medicineData}
        columns={[
          {
            Header: "",
            columns: [
              {
                Header: "Name",
                id: "name",
                accessor: (d) => d.name,
              },
              {
                Header: "Description",
                id: "description",
                accessor: (d) => d.description,
              },
              {
                Header: "Type",
                id: "formatType",
                accessor: (d) => d.formatType,
              },
              {
                Header: "Actions",
                id: "edit",
                accessor: (d) => d.id,
                Cell: (row) => (
                  <div style={{textAlign:'center'}} className=''>
                    <button
                      onClick={() => {
                        setValue('name', row.original.name)
                        setValue('description', row.original.description)
                        setValue('formatType', (row.original.formatType))
                        setSelectedMedicine(row.original);
                        setShowForm(true);
                      }}
                      className='btn btn-info btn-sm m-r-5'
                    >
                      Edit 
                    </button>
                    <button
                      onClick={() => {
                        setSelectedMedicine(row.original);
                        setResetNotify(true);
                      }}
                      className='btn btn-danger btn-sm m-r-5'
                    >
                      Delete
                    </button>
                  </div>
                ),
              },
            ],
          },
        ]}
        csv
        edited={medicineData}
        defaultPageSize={10}
        className='-highlight'
      />

      {/* <ReactTable
        pageCount={100}
        list={typeData}
        filterable
        data={typeData}
        columns={[
          {
            Header: "",
            columns: [
              {
                Header: "ID",
                id: "id",
                accessor: (d) => d.id,
              },
              {
                Header: "Name",
                id: "name",
                accessor: (d) => d.name,
              },

              {
                Header: "Actions",
                id: "edit",
                accessor: (d) => d.id,
                Cell: (row) => (
                  <div style={{textAlign:'center'}} className=''>
                    <button
                      onClick={() => {
                        setValue('name', row.original.name)
                        setSelectedFormat(row.original);
                        setShowForm1(true);
                      }}
                      className='btn btn-info btn-sm m-r-5'
                    >
                      Edit 
                    </button>
                    <button
                      onClick={() => {
                        setSelectedFormat(row.original);
                        setResetNotify1(true);
                      }}
                      className='btn btn-danger btn-sm m-r-5'
                    >
                      Delete
                    </button>
                  </div>
                ),
              },
            ],
          },
        ]}
        csv
        edited={typeData}
        defaultPageSize={10}
        className='-highlight'
      /> */}
     
      <SweetAlert
        showCancel
        show={resetNotify}
        onConfirm={() => handleDeleteMedicine(selectedMedicine.id)}
        confirmBtnText='Confirm' 
        confirmBtnBsStyle='danger'
        cancelBtnBsStyle='secondary'
        title='Are you sure to delete this medicine?' 
        onCancel={() => setResetNotify(false)}
      >
      </SweetAlert>
      {/* <SweetAlert
        showCancel
        show={resetNotify1}
        onConfirm={() => handleDeleteFormat(selectedFormat.id)}
        confirmBtnText='Confirm' 
        confirmBtnBsStyle='danger'
        cancelBtnBsStyle='secondary'
        title='Are you sure to delete this format?' 
        onCancel={() => setResetNotify1(false)}
      >
      </SweetAlert> */}
      
      <Modal show={showForm} onHide={() => handleCloseModal()}>
        <form onSubmit={handleSubmit(submitForm)}>
          
          <Modal.Header className='font-10' closeButton>
            <span className='font-20'>
              {selectedMedicine != null
                ? `Update ${selectedMedicine.name}`
                : "Create Drug"}
            </span>
          </Modal.Header>
          <Modal.Body>
            <div className='col-md-12 m-b-15'>
              <label className='control-label mb-2'>Antibiotic Class</label>
                <input
                {...register("name", {
                  required: "Name is required",
                })}
                type='text'
                size='30'
                className='form-control'
                placeholder='Enter text here'
              />
              <p className='text-danger'>{errors.name?.message}</p>

              <label className='control-label mb-2'>Molecule</label>
                <input
                {...register("description", {
                  required: "Description is required",
                })}
                type='text'
                size='30'
                className='form-control'
                placeholder='Enter text here'
              />
              <p className='text-danger'>{errors.description?.message}</p>

              <label className='control-label mb-2'>Product Format</label>
              <Form.Select {...register("formatType", { required: true })}>
                  <option value="">Select Type</option>
                  {
                    typeData.map((item) => (
                        <option value={item.name}>
                            {item.name}
                        </option>
                    ))}
              </Form.Select>
            </div>
          </Modal.Body>
          <Modal.Footer>
            {selectedMedicine != null ? 
                <button type='submit' className='btn btn-primary'>
                Update Save
              </button>  
              :
              <button type='submit' className='btn btn-primary'>
              Save Drug
            </button>
            }
          </Modal.Footer>
        </form>
      </Modal>

      {/* <Modal show={showForm1} onHide={() => handleCloseModal1()}>
        <form onSubmit={handleSubmit(submitFormPF)}>
          
          <Modal.Header className='font-10' closeButton>
            <span className='font-20'>
              {selectedFormat != null
                ? `Update ${selectedFormat.name}`
                : "Create Format"}
            </span>
          </Modal.Header>
          <Modal.Body>
            <div className='col-md-12 m-b-15'>
              <label className='control-label mb-2'>Product Format Name</label>
                <input
                {...register("name", {
                  required: "Name is required",
                })}
                type='text'
                size='30'
                className='form-control'
                placeholder='Enter text here'
              />
              <p className='text-danger'>{errors.name?.message}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            {selectedFormat != null ? 
                <button type='submit' className='btn btn-primary'>
                Update Save
              </button>  
              :
              <button type='submit' className='btn btn-primary'>
              Save Format
            </button>
            }
          </Modal.Footer>
        </form>
      </Modal> */}



      </div>
      </div>
    </>
  );
}
