import { useState } from "react";
import Auth from "../../api/Auth";
import { Form, Button, InputGroup } from 'react-bootstrap'
import { Link, redirect, BrowserRouter, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import bg from '../../assets/images/56693.jpg'

function Login() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const notifySuccess= () => 
  toast("Success");

  const login = async(e) => {
    e.preventDefault();
    let response = await new Auth().login({username, password})
    console.log({response})
    if(response.ok){
      console.log(response.data)
      await window.localStorage.setItem('token', response.data.token)
      await window.localStorage.setItem('user', response.data.username)
      await window.localStorage.setItem('userID', response.data.id)
      await window.localStorage.setItem('userType', response.data.userTypeName)
      await window.localStorage.setItem('name', response.data.fullname)
      await window.localStorage.setItem('prc', response.data.prcNo)
      await window.localStorage.setItem('prcimage', response.data.prcImage)
      await window.localStorage.setItem('ptr', response.data.ptrNo)
      await window.localStorage.setItem('lto', response.data.ltoNo)
      navigate('/home')
    }else{
      toast.error(response.data.errorMessage)
    }
  }

  return (
    // <Container fluid style={{height:'100vh'}}>
    // <Row style={{height:'100vh'}}>
    //   <Col md={8} classNameName='login-screen-left'>
    //     <Image fluid style={{height:'100vh'}} src={bg}></Image>
    //   </Col>
    //   <Col md={4} classNameName='login-screen-right'>
    //     <Row>
    //       <Col md={3}></Col>
    //       <Col md={6}>
    //       <div>
    //       <h1 classNameName="title"><span classNameName="orange">Haru</span>Gabriel</h1>
    //       {/* <p classNameName="subtitle">Welcome back to TekTeach! Making learning, a great experience!</p> */}
    //         <Form onSubmit={login}>
    //           <Form.Group controlId="exampleForm.ControlInput1">
    //             <Form.Label classNameName="custom-label">E-mail / Username</Form.Label>
    //             <Form.Control 
    //               classNameName="custom-input" 
    //               size="md" 
    //               type="text" 
    //               placeholder="Enter e-mail or username here"
    //               onChange={(e) => setUsername(e.target.value)}
    //             />
    //           </Form.Group>
    //           <Form.Group controlId="exampleForm.ControlInput1">
    //             <Form.Label classNameName="custom-label">Password</Form.Label>
    //             <InputGroup>
    //               <Form.Control 
    //                 classNameName="custom-input" 
    //                 size="md" 
    //                 type={showPassword ? 'text' : "password"} 
    //                 placeholder="Enter password here"
    //                 onChange={(e) => setPassword(e.target.value)}
    //               />
    //               <InputGroup.Text classNameName='custom-input border-0'><i classNameName={showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'} onClick={()=> setShowPassword(!showPassword)}/></InputGroup.Text>
    //             </InputGroup>
    //           </Form.Group>
    //           <Link classNameName="link-orange font-24 d-none" to="/forgot_password" >Forgot Password</Link>
    //           <Button classNameName="btn btn-md btn-primary btn-auth w-100 d-block mt-4 mb-4" size="md" variant="primary" type="submit">Log In</Button>
    //         </Form>
    //       </div>
    //       </Col>
    //     </Row>
    //   </Col>
    // </Row>
    // </Container>
/* <>
  <div classNameName="auth-container">
    <Row>
      <Col md={8}>
        <div classNameName="login-container login-bg-image"></div>
      </Col>
      <Col md={4}>
      <h1 classNameName="title">VETDRUMS</h1>
        <p classNameName="subtitle" style={{fontWeight:"bold", color:"#0981D1"}}>Welcome! Veterrinary Drug Monitoring System</p>
          <Form onSubmit={login}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label classNameName="custom-label">Username</Form.Label>
              <Form.Control 
              classNameName="custom-input" 
              size="md" 
              type="text" 
              placeholder="Enter e-mail or username here"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label classNameName="custom-label">Password</Form.Label>
            <InputGroup>
              <Form.Control 
                classNameName="custom-input" 
                size="md" 
                type={showPassword ? 'text' : "password"} 
                placeholder="Enter password here"
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputGroup.Text classNameName='custom-input border-0'><i classNameName={showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'} onClick={()=> setShowPassword(!showPassword)}/></InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Link classNameName="link-orange font-24 d-none" to="/forgot_password" >Forgot Password</Link>
          <Button classNameName="btn btn-md btn-primary btn-auth w-100 d-block mt-4 mb-4" size="md" variant="primary" type="submit">Log In</Button>
          <div>Don't have an account yet? <span style={{fontWeight:"bold"}}><a href="/register">Sign up here</a></span></div>
        </Form>
      </Col> 
    </Row>
  </div>
  <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
  />
</> */
   <div className="container-fluid">
     <div className="row" style={{display:"flex", minHeight:"100vh"}}>
       <div className="col-lg-5 col-xl-4 d-none d-lg-flex justify-content-center align-items-center min-vh-lg-100 position-relative bg-light">
         a
       </div>
       <div className="col-lg-7 col-xl-8 d-flex justify-content-center align-items-center min-vh-lg-100">
          <div className="flex-grow-1 mx-auto" style={{maxWidth: '28rem'}}>
            <div className="text-center mb-5 mb-md-7">
              <h1 classNameName="title">VETDRUMS</h1>
              <p classNameName="subtitle" style={{fontWeight:"bold", color:"#0981D1"}}>Welcome! Veterrinary Drug Monitoring System</p>
            </div>
                  <Form onSubmit={login}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Label classNameName="custom-label">Username</Form.Label>
                      <Form.Control 
                      classNameName="custom-input" 
                      size="md" 
                      type="text" 
                      placeholder="Enter e-mail or username here"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label classNameName="custom-label">Password</Form.Label>
                    <InputGroup>
                      <Form.Control 
                        classNameName="custom-input" 
                        size="md" 
                        type={showPassword ? 'text' : "password"} 
                        placeholder="Enter password here"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <InputGroup.Text classNameName='custom-input border-0'><i classNameName={showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'} onClick={()=> setShowPassword(!showPassword)}/></InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                  <Link classNameName="link-orange font-24 d-none" to="/forgot_password" >Forgot Password</Link>
                  <Button classNameName="btn btn-md btn-primary btn-auth w-100 d-block mt-4 mb-4" size="md" variant="primary" type="submit">Log In</Button>
                  <div>Don't have an account yet? <span style={{fontWeight:"bold"}}><a href="/register">Sign up here</a></span></div>
                </Form>
            </div>
          </div>
       
     </div>
   </div>
  );
}

export default Login;
