import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import DispensersAPI from "../../api/DispensersAPI"
import SweetAlert from "react-bootstrap-sweetalert";
import HeaderMain from "../headers/header";
import "../../../node_modules/font-awesome/css/font-awesome.css"

export default function Dispensers() {
  const [loading, setLoading] = useState(true);
  const [dispenserData, setDispenserData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [resetNotify, setResetNotify] = useState(false);
  const [selectedDispenser, setSelectedDispenser] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    handleGetAllDispensers();
  }, []);   

  const handleGetAllDispensers = async () => {
    setLoading(true);
    const response = await new DispensersAPI().dispensers();
    if (response.ok) {
        setDispenserData(response.data);
    } else {
      toast.error("Something went wrong while fetching user");
    }
    setLoading(false);
  };

  const submitForm = async (data) => {
    setLoading(true);
    if (selectedDispenser != null) {
      const response = await new DispensersAPI().updateDispenser(selectedDispenser.id, data);
      if(response.ok) {
        toast.success("Successfully Updated Animal Data")
        handleGetAllDispensers()
        reset()
        setShowForm(false)
        setSelectedDispenser(null)
      }else{
        toast.error("Something went wrong while updating the term");
      }
    } else {
      const response = await new DispensersAPI().createDispenser(data);
      if (response.ok) {
        toast.success("Successfully Created Term");
        handleGetAllDispensers();
        reset();
        setShowForm(false);
      } else {
        toast.error(response.data.errorMessage);
      }
    }
    setLoading(false);
  };

  const handleDeleteAnimal = async (id) => {
    setLoading(true);
    setResetNotify(false);
    const response = await new DispensersAPI().deleteDispenser(id);
    if (response.ok) {
      toast.success("Successfully Deleted Animal");
      handleGetAllDispensers();
    } else {
      toast.error("Something went wrong while deleting user");
    }
    setSelectedDispenser(null);
    setLoading(false);
  };

  const handleCloseModal = () => {
    setShowForm(false);
    setSelectedDispenser(null);
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
          </span>
        </div>
      <ReactTable
        pageCount={100}
        list={dispenserData}
        filterable
        data={dispenserData}
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
                Header: "Location",
                id: "location",
                accessor: (d) => d.location,
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
                        setValue('location', row.original.location)
                        setSelectedDispenser(row.original);
                        setShowForm(true);
                      }}
                      className='btn btn-info btn-sm m-r-5'
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedDispenser(row.original);
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
        edited={dispenserData}
        defaultPageSize={10}
        className='-highlight'
      />
     
      <SweetAlert
        showCancel
        show={resetNotify}
        onConfirm={() => handleDeleteAnimal(selectedDispenser.id)}
        confirmBtnText='Confirm'
        confirmBtnBsStyle='danger'
        cancelBtnBsStyle='secondary'
        title='Are you sure to delete this animal?'
        onCancel={() => setResetNotify(false)}
      >
      </SweetAlert>
      <Modal show={showForm} onHide={() => handleCloseModal()}>
        <form onSubmit={handleSubmit(submitForm)}>
          <Modal.Header className='font-10' closeButton>
            <span className='font-20'>
              {selectedDispenser != null
                ? `Update ${selectedDispenser.name}`
                : "Create Animal"}
            </span>
          </Modal.Header>
          <Modal.Body>
            <div className='col-md-12 m-b-15'>
              <label className='control-label mb-2'>Name</label>
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

              <label className='control-label mb-2'>location</label>
                <input
                {...register("location", {
                  required: "location is required",
                })}
                type='text'
                size='30'
                className='form-control'
                placeholder='Enter text here'
              />
              <p className='text-danger'>{errors.location?.message}</p>

              
            </div>
          </Modal.Body>
          <Modal.Footer>
            {selectedDispenser != null ? 
                <button type='submit' className='btn btn-primary'>
                Update Save
              </button>  
              :
              <button type='submit' className='btn btn-primary'>
              Save Animal
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
