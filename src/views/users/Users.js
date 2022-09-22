import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import UsersAPI from "../../api/UsersAPI"
import SweetAlert from "react-bootstrap-sweetalert";
import HeaderMain from "../headers/header";
import "../../../node_modules/font-awesome/css/font-awesome.css"

export default function Users() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [resetNotify, setResetNotify] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  const handleGetAllUsers = async () => {
    setLoading(true);
    const response = await new UsersAPI().users();
    if (response.ok) {
      setUser(response.data);
    } else {
      toast.error("Something went wrong while fetching user");
    }
    setLoading(false);
  };

  const submitForm = async (data) => {
    setLoading(true);
    if (selectedUser != null) {
      const response = await new UsersAPI().updateUser(selectedUser.id, data);
      if(response.ok) {
        toast.success("Successfully Updated Term")
        handleGetAllUsers()
        reset()
        setShowForm(false)
        setSelectedUser(null)
      }else{
        toast.error("Something went wrong while updating the term");
      }
    } else {
      const response = await new UsersAPI().createUser(data);
      if (response.ok) {
        toast.success("Successfully Created Term");
        handleGetAllUsers();
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
    const response = await new UsersAPI().deleteUser(id);
    if (response.ok) {
      toast.success("Successfully Deleted Term");
      handleGetAllUsers();
    } else {
      toast.error("Something went wrong while deleting user");
    }
    setSelectedUser(null);
    setLoading(false);
  };

  const handleCloseModal = () => {
    setShowForm(false);
    setSelectedUser(null);
  };

  return (
    <>
      {/* {loading && <FullScreenLoader />} */}
      <div className="App">
        <header className="App-header">
          <HeaderMain/>
        </header>
      <div className="container m-t-10">
        <div className="main-title-pages m-b-10"> Users 
          <span className="m-l-10"> 
            <button className='btn btn-primary' size="sm" onClick={() => setShowForm(true)}>
              <i className="fa fa-plus fa-2xl"></i>
            </button> 
          </span>
        </div>
      <ReactTable
        pageCount={100}
        list={user}
        filterable
        data={user}
        columns={[
          {
            Header: "",
            columns: [
              {
                Header: "Username",
                id: "username",
                accessor: (d) => d.username,
              },
              {
                Header: "Full Name",
                id: "fullname",
                accessor: (d) => d.fullname,
              },

              {
                Header: "Actions",
                id: "edit",
                accessor: (d) => d.id,
                Cell: (row) => (
                  <div style={{textAlign:'center'}} className=''>
                    <button
                      onClick={() => {
                        setValue('username', row.original.username)
                        setValue('password', row.original.passwordgit )
                        setSelectedUser(row.original);
                        setShowForm(true);
                      }}
                      className='btn btn-info btn-sm m-r-5'
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedUser(row.original);
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
        edited={user}
        defaultPageSize={10}
        className='-highlight'
      />
     
      <SweetAlert
        showCancel
        show={resetNotify}
        onConfirm={() => handleDeleteUser(selectedUser.id)}
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
              {selectedUser != null
                ? `Update ${selectedUser.username}`
                : "Create User"}
            </span>
          </Modal.Header>
          <Modal.Body>
            <div className='col-md-12 m-b-15'>
              <label className='control-label mb-2'>Username</label>
                <input
                {...register("username", {
                  required: "Username is required",
                })}
                type='text'
                size='30'
                className='form-control'
                placeholder='Enter text here'
              />
              <p className='text-danger'>{errors.username?.message}</p>

              <label className='control-label mb-2'>Password</label>
                <input
                {...register("password", {
                  required: "Password is required",
                })}
                type='text'
                size='30'
                className='form-control'
                placeholder='Enter text here'
              />
              <p className='text-danger'>{errors.password?.message}</p>

              <label className='control-label mb-2'>Full Name</label>
                <input
                {...register("fullname", {
                  required: "Full Name is required",
                })}
                type='text'
                size='30'
                className='form-control'
                placeholder='Enter text here'
              />
              <p className='text-danger'>{errors.fullname?.message}</p>

              <label className='control-label mb-2'>Type</label>
              <select {...register("userTypeId", { required: true })}>
                  <option value="">Select User Type</option>
                  <option value='1'>Patient</option>
                  <option value='2'>Veterinarian</option>
                  <option value='3'>Dispenser</option>
              </select>
            </div>
          </Modal.Body>
          <Modal.Footer>
            {selectedUser != null ? 
                <button type='submit' className='btn btn-primary'>
                Update Save
              </button>  
              :
              <button type='submit' className='btn btn-primary'>
              Save Term
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
