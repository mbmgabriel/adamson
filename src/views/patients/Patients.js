import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import PatientsAPI from "../../api/PatientsAPI"
import SweetAlert from "react-bootstrap-sweetalert";
import HeaderMain from "../headers/header";
import "../../../node_modules/font-awesome/css/font-awesome.css"

export default function Patients() {
  const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [resetNotify, setResetNotify] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    handleGetAllPatients();
  }, []);

  const handleGetAllPatients = async () => {
    setLoading(true);
    const response = await new PatientsAPI().patients();
    if (response.ok) {
      setPatient(response.data);
    } else {
      toast.error("Something went wrong while fetching user");
    }
    setLoading(false);
  };

  const submitForm = async (data) => {
    setLoading(true);
    if (selectedPatient != null) {
      const response = await new PatientsAPI().createPatient(selectedPatient.id, data);
      if(response.ok) {
        toast.success("Successfully Updated Term")
        handleGetAllPatients()
        reset()
        setShowForm(false)
        setSelectedPatient(null)
      }else{
        toast.error("Something went wrong while updating the term");
      }
    } else {
      const response = await new PatientsAPI().createPatient(data);
      if (response.ok) {
        toast.success("Successfully Created Term");
        handleGetAllPatients();
        reset();
        setShowForm(false);
      } else {
        toast.error(response.data.errorMessage);
      }
    }
    setLoading(false);
  };

  const handleDeleteUser = async (id) => {
    setLoading(true);
    setResetNotify(false);
    const response = await new PatientsAPI().deleteUser(id);
    if (response.ok) {
      toast.success("Successfully Deleted Term");
      handleGetAllPatients();
    } else {
      toast.error("Something went wrong while deleting user");
    }
    setSelectedPatient(null);
    setLoading(false);
  };

  const handleCloseModal = () => {
    setShowForm(false);
    setSelectedPatient(null);
  };

  return (
    <>
      {/* {loading && <FullScreenLoader />} */}
      <div className="App">
        <header className="App-header">
          <HeaderMain/>
        </header>
      <div className="container m-t-10">
        <div className="main-title-pages m-b-10"> Patients 
          <span className="m-l-10"> 
            <button className='btn btn-primary' size="sm" onClick={() => setShowForm(true)}>
              <i className="fa fa-plus fa-2xl"></i>
            </button> 
          </span>
        </div>
      <ReactTable
        pageCount={100}
        list={patient}
        filterable
        data={patient}
        columns={[
          {
            Header: "",
            columns: [
              {
                Header: "Patient Name",
                id: "patientName",
                accessor: (d) => d.patientName,
              },
              {
                Header: "Address",
                id: "address",
                accessor: (d) => d.address,
              },
              {
                Header: "Birth Date",
                id: "birthDate",
                accessor: (d) => d.birthDate,
              },
              {
                Header: "Contact",
                id: "contactNumber",
                accessor: (d) => d.contactNumber,
              },

              {
                Header: "Actions",
                id: "edit",
                accessor: (d) => d.id,
                Cell: (row) => (
                  <div style={{textAlign:'center'}} className=''>
                    <button
                      onClick={() => {
                        setValue('patientName', row.original.patientName)
                        setValue('address', row.original.address)
                        setValue('birthDate', row.original.birthDate)
                        setValue('contactNumber', row.original.contactNumber)
                        setSelectedPatient(row.original);
                        setShowForm(true);
                      }}
                      className='btn btn-info btn-sm m-r-5'
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedPatient(row.original);
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
        edited={patient}
        defaultPageSize={10}
        className='-highlight'
      />
     
      <SweetAlert
        showCancel
        show={resetNotify}
        onConfirm={() => handleDeleteUser(selectedPatient.id)}
        confirmBtnText='Confirm'
        confirmBtnBsStyle='danger'
        cancelBtnBsStyle='secondary'
        title='Are you sure to delete this term?'
        onCancel={() => setResetNotify(false)}
      >
      </SweetAlert>
      <Modal show={showForm} onHide={() => handleCloseModal()}>
        <form onSubmit={handleSubmit(submitForm)}>
          <Modal.Header className='font-10' closeButton>
            <span className='font-20'>
              {selectedPatient != null
                ? `Update ${selectedPatient.patientName}`
                : "Create Patient"}
            </span>
          </Modal.Header>
          <Modal.Body>
            <div className='col-md-12 m-b-15'>
              <label className='control-label mb-2'>Patient Name</label>
                <input
                {...register("patientName", {
                  required: "Username is required",
                })}
                type='text'
                size='30'
                className='form-control'
                placeholder='Enter text here'
              />
              <p className='text-danger'>{errors.patientName?.message}</p>

              <label className='control-label mb-2'>Address</label>
                <input
                {...register("address", {
                  required: "Address is required",
                })}
                type='text'
                size='30'
                className='form-control'
                placeholder='Enter text here'
              />
              <p className='text-danger'>{errors.address?.message}</p>

              <label className='control-label mb-2'>Birthdate</label>
                <input
                {...register("birthDate", {
                  required: "Birthdate is required",
                })}
                type='date'
                size='30'
                className='form-control'
                placeholder='Enter text here'
              />
              <p className='text-danger'>{errors.birthDate?.message}</p>

              <label className='control-label mb-2'>Contact Number</label>
                <input
                {...register("contactNumber", {
                  required: "Contact Number is required",
                })}
                type='text'
                size='30'
                className='form-control'
                placeholder='Enter text here'
              />
              <p className='text-danger'>{errors.contactNumber?.message}</p>

              
            </div>
          </Modal.Body>
          <Modal.Footer>
            {selectedPatient != null ? 
                <button type='submit' className='btn btn-primary'>
                Update Save
              </button>  
              :
              <button type='submit' className='btn btn-primary'>
              Save Patient
            </button>
            }
          </Modal.Footer>
        </form>
      </Modal>
      </div>
      </div>
    </>
  );
}
