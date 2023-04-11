import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import MedicinesAPI from "../../api/MedicinesAPI"
import SweetAlert from "react-bootstrap-sweetalert";
import HeaderMain from "../headers/header";
import "../../../node_modules/font-awesome/css/font-awesome.css"

export default function ProductFormat() {
  const [loading, setLoading] = useState(true);
  const [productFormat, setProductFormat] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [resetNotify, setResetNotify] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    handleGetAllProductFormat();
  }, []);

  const handleGetAllProductFormat = async () => {
    setLoading(true);
    const response = await new MedicinesAPI().types();
    if (response.ok) {
      setProductFormat(response.data);
    } else {
      toast.error("Something went wrong while fetching productFormat");
    }
    setLoading(false);
  };

  const submitForm = async (data) => {
    setLoading(true);
    if (selectedFormat != null) {
      const response = await new MedicinesAPI().updateFormat(selectedFormat.id, data);
      if(response.ok) {
        toast.success("Successfully Updated Format")
        handleGetAllProductFormat()
        reset()
        setShowForm(false)
        setSelectedFormat(null)
      }else{
        toast.error("Something went wrong while updating the Format");
      }
    } else {
      const response = await new MedicinesAPI().createFormat(data);
      if (response.ok) {
        toast.success("Successfully Created Format");
        handleGetAllProductFormat();
        reset();
        setShowForm(false);
      } else {
        toast.error(response.data.errorMessage);
      }
    }
    setLoading(false);
  };

  const handleDeleteProductFormat = async (id) => {
    setLoading(true);
    setResetNotify(false);
    const response = await new MedicinesAPI().deleteFormat(id);
    if (response.ok) {
      toast.success("Successfully Deleted Format");
      handleGetAllProductFormat();
    } else {
      toast.error("Something went wrong while deleting productFormat");
    }
    setSelectedFormat(null);
    setLoading(false);
  };

  const handleCloseModal = () => {
    setShowForm(false);
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
        <div className="main-title-pages m-b-10"> Product Format 
          <span className="m-l-10"> 
            <button className='btn btn-primary' size="sm" onClick={() => setShowForm(true)}>
              <i className="fa fa-plus fa-2xl"></i>
            </button> 
          </span>
        </div>
      <ReactTable
        pageCount={100}
        list={productFormat}
        filterable
        data={productFormat}
        columns={[
          {
            Header: "",
            columns: [
              {
                Header: "id",
                id: "ID",
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
                        setShowForm(true);
                      }}
                      className='btn btn-info btn-sm m-r-5'
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedFormat(row.original);
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
        edited={productFormat}
        defaultPageSize={10}
        className='-highlight'
      />
     
      <SweetAlert
        showCancel
        show={resetNotify}
        onConfirm={() => handleDeleteProductFormat(selectedFormat.id)}
        confirmBtnText='Confirm'
        confirmBtnBsStyle='danger'
        cancelBtnBsStyle='secondary'
        title='Are you sure to delete this Format?'
        onCancel={() => setResetNotify(false)}
      >
      </SweetAlert>
      <Modal show={showForm} onHide={() => handleCloseModal()}>
        <form onSubmit={handleSubmit(submitForm)}>
          <Modal.Header className='font-10' closeButton>
            <span className='font-20'>
              {selectedFormat != null
                ? `Update ${selectedFormat.name}`
                : "Create productFormat"}
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
              Save Product Format
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
