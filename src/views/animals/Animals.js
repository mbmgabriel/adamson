import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import AnimalsAPI from "../../api/AnimalsAPI"
import SweetAlert from "react-bootstrap-sweetalert";
import HeaderMain from "../headers/header";
import "../../../node_modules/font-awesome/css/font-awesome.css"

export default function Animals() {
  const [loading, setLoading] = useState(true);
  const [animalData, setAnimalData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [resetNotify, setResetNotify] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    handleGetAllAnimals();
  }, []);   

  const handleGetAllAnimals = async () => {
    setLoading(true);
    const response = await new AnimalsAPI().animals();
    if (response.ok) {
        setAnimalData(response.data);
    } else {
      toast.error("Something went wrong while fetching user");
    }
    setLoading(false);
  };

  const submitForm = async (data) => {
    setLoading(true);
    if (selectedAnimal != null) {
      const response = await new AnimalsAPI().updateAnimal(selectedAnimal.id, data);
      if(response.ok) {
        toast.success("Successfully Updated Animal Data")
        handleGetAllAnimals()
        reset()
        setShowForm(false)
        setSelectedAnimal(null)
      }else{
        toast.error("Something went wrong while updating the term");
      }
    } else {
      const response = await new AnimalsAPI().createUser(data);
      if (response.ok) {
        toast.success("Successfully Created Term");
        handleGetAllAnimals();
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
    const response = await new AnimalsAPI().deleteAnimal(id);
    if (response.ok) {
      toast.success("Successfully Deleted Animal");
      handleGetAllAnimals();
    } else {
      toast.error("Something went wrong while deleting user");
    }
    setSelectedAnimal(null);
    setLoading(false);
  };

  const handleCloseModal = () => {
    setShowForm(false);
    setSelectedAnimal(null);
  };

  return (
    <>
      {/* {loading && <FullScreenLoader />} */}
      <div className="App">
        <header className="App-header">
          <HeaderMain/>
        </header>
      <div className="container m-t-10">
        <div className="main-title-pages m-b-10"> Animals 
          <span className="m-l-10"> 
            <button className='btn btn-primary' size="sm" onClick={() => setShowForm(true)}>
              <i className="fa fa-plus fa-2xl"></i>
            </button> 
          </span>
        </div>
      <ReactTable
        pageCount={100}
        list={animalData}
        filterable
        data={animalData}
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
                        
                        setSelectedAnimal(row.original);
                        setShowForm(true);
                      }}
                      className='btn btn-info btn-sm m-r-5'
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedAnimal(row.original);
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
        edited={animalData}
        defaultPageSize={10}
        className='-highlight'
      />
     
      <SweetAlert
        showCancel
        show={resetNotify}
        onConfirm={() => handleDeleteAnimal(selectedAnimal.id)}
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
              {selectedAnimal != null
                ? `Update ${selectedAnimal.name}`
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

              
            </div>
          </Modal.Body>
          <Modal.Footer>
            {selectedAnimal != null ? 
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
