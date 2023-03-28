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
import bg from '../../assets/images/bgve1.jpeg'
import bg1 from '../../assets/images/pattern.jpg'
import adu from "../../assets/images/adu.jpeg"
import pcpp from "../../assets/images/pcpp.jpeg"
import fava from "../../assets/images/favalogo.png"
import fao from "../../assets/images/faologo.png"
import bai from "../../assets/images/bailogo.png"
import pvda from "../../assets/images/pvdalogo.png"
import pspp from "../../assets/images/image001.jpg"

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
      await window.sessionStorage.setItem('token', response.data.token)
      await window.sessionStorage.setItem('user', response.data.username)
      await window.sessionStorage.setItem('userID', response.data.id)
      await window.sessionStorage.setItem('userType', response.data.userTypeName)
      await window.sessionStorage.setItem('name', response.data.fullname)
      await window.sessionStorage.setItem('prc', response.data.prcNo)
      await window.sessionStorage.setItem('prcimage', response.data.prcImage)
      await window.sessionStorage.setItem('ptr', response.data.ptrNo)
      await window.sessionStorage.setItem('lto', response.data.ltoNo)
      await window.sessionStorage.setItem('pId', response.data.patientId)
      window.location.href = "/home"
    }else{
      toast.error(response.data.errorMessage)
    }
  }

  return (
    // <div className="container-fluid">
    //   <div className="row" style={{display:"flex", minHeight:"100vh"}}>
    //     <div className="flex-grow-1 mx-auto" style={{maxWidth: '30rem'}}>
    //       <h1 className="title" style={{textAlign:"center"}}>VETDRUMS</h1>
    //       <h3 className="title">Veterinary Drug Monitoring System</h3>
    //       <Image fluid style={{minHeight:"10vh", display:"flex", marginBottom:10 }} src={bg}></Image>
    //       <Form onSubmit={login}>
    //         <Form.Group controlId="exampleForm.ControlInput1" className="m-b-20">
    //           <Form.Label classNameName="custom-label">Username</Form.Label>
    //           <Form.Control 
    //           className="custom-input" 
    //           size="md" 
    //           type="text" 
    //           placeholder="Enter e-mail or username here"
    //           onChange={(e) => setUsername(e.target.value)}
    //         />
    //         </Form.Group>
    //         <Form.Group controlId="exampleForm.ControlInput1">
    //           <Form.Label className="custom-label">Password</Form.Label>
    //           <InputGroup>
    //             <Form.Control 
    //               className="custom-input" 
    //               size="md" 
    //               type={showPassword ? 'text' : "password"} 
    //               placeholder="Enter password here"
    //               onChange={(e) => setPassword(e.target.value)}
    //             />
    //             <InputGroup.Text className='custom-input border-0'><i className={showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'} onClick={()=> setShowPassword(!showPassword)}/></InputGroup.Text>
    //           </InputGroup>
    //         </Form.Group>
    //         <Link className="link-orange font-24 d-none" to="/forgot_password" >Forgot Password</Link>
    //         <Button className="btn btn-md btn-primary btn-auth w-100 d-block mt-4 mb-4" size="md" variant="primary" type="submit">Log In</Button>
    //         <div>Don't have an account yet? <span style={{fontWeight:"bold"}}><a href="/register">Sign up here</a></span></div>
    //       </Form>
    //     </div>
    //   </div>
      <div>
        <main class="form-signin w-100 m-auto" style={{maxWidth:"550px"}}>
        <Image fluid style={{minHeight:"10vh", display:"flex", marginBottom:10 }} src={bg}></Image>
          <Form onSubmit={login}>
            {/* <h1 class="h3 mb-3 fw-normal">Please sign in</h1> */}

            <div class="form-floating" style={{marginBottom:10}}>
              <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e) => setUsername(e.target.value)}/>
              <label for="floatingInput">Username</label>
            </div>
            <div class="form-floating" style={{marginBottom:10}}>
              <input style={{marginBottom:10}} type={showPassword ? 'text' : "password"}  class="form-control" id="floatingPassword" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
              <div className=''><i className={showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'} onClick={()=> setShowPassword(!showPassword)} style={{marginRight:120}}>  Show Password </i>
              Don't have an account yet? <span style={{fontWeight:"bold"}}><a href="/register">Sign up here</a></span>
              </div>
              
              <label for="floatingPassword">Password</label>
            </div>
            <button class="w-100 btn btn-lg btn-primary" type="submit" style={{marginBottom:10}}>Sign in</button>
            {/* <div>Don't have an account yet? <span style={{fontWeight:"bold"}}><a href="/register">Sign up here</a></span></div> */}
            {/* <p class="mt-5 mb-3 text-muted">&copy; 2017–2022</p> */}
          </Form>
          
        </main>
        <div style={{textAlign:"center"}}>
          <img className="img-fluid img-thumbnail" src={adu} style={{width:"200px", height:"200px"}}></img>
          <img className="img-fluid img-thumbnail" src={pspp} style={{width:"200px", height:"200px"}}></img>
          <img className="img-fluid img-thumbnail" src={pcpp} style={{width:"200px", height:"200px"}}></img>
          <img className="img-fluid img-thumbnail" src={pvda} style={{width:"200px", height:"200px"}}></img>
          <img className="img-fluid img-thumbnail" src={fava} style={{width:"200px", height:"200px"}}></img>
          <img className="img-fluid img-thumbnail" src={fao} style={{width:"200px", height:"200px"}}></img>
          <img className="img-fluid img-thumbnail" src={bai} style={{width:"200px", height:"200px"}}></img>
        </div>
      </div>
    
  //  <div className="container-fluid">
  //    <div className="row" style={{display:"flex", minHeight:"100vh"}}>
  //      <div className="col-lg-5 col-xl-4 d-none d-lg-flex justify-content-center align-items-center min-vh-lg-100 
  //      position-relative bg-light login-bg-image"
  //      >
  //     {/* <Image fluid style={{minHeight:"100vh", display:"flex  !important", backgroundRepeat:"repeat !important"}} src={bg1}></Image> */}
  //       <div className="flex-grow-1 mx-auto" style={{maxWidth: '28rem'}}>
  //           <div className="text-center mb-5 mb-md-7">
  //             <h1 className="title"></h1>
  //             <img className="img-fluid img-thumbnail" src={adu} style={{width:"200px", height:"200px"}}></img>
  //             <img className="img-fluid img-thumbnail" src={pspp} style={{width:"200px", height:"200px"}}></img>
  //             <img className="img-fluid img-thumbnail" src={pcpp} style={{width:"200px", height:"200px"}}></img>
  //             <img className="img-fluid img-thumbnail" src={pvda} style={{width:"200px", height:"200px"}}></img>
  //             <img className="img-fluid img-thumbnail" src={fava} style={{width:"200px", height:"200px"}}></img>
  //             <img className="img-fluid img-thumbnail" src={fao} style={{width:"200px", height:"200px"}}></img>
  //             <img className="img-fluid img-thumbnail" src={bai} style={{width:"200px", height:"200px"}}></img>
  //           </div>
  //       </div>
  //      </div>
  //      <div className="col-lg-7 col-xl-8 d-flex justify-content-center align-items-center min-vh-lg-100">
         
  //         <div className="flex-grow-1 mx-auto" style={{maxWidth: '28rem'}}>
  //         <h1 className="title" style={{textAlign:"center"}}>Vet-DRUMS</h1>
  //         <h3 className="title">Veterinary Drug Monitoring System</h3>
  //         <Image fluid style={{minHeight:"20vh", display:"flex"}} src={bg}></Image>
  //           <div className="text-center mb-5 mb-md-7">
  //             {/* <h1 className="title">Welcome Back</h1> */}
  //             {/* <p className="subtitle" style={{fontWeight:"bold", color:"#7daafb"}}>Login to your account </p> */}
  //           </div>
  //                 <Form onSubmit={login}>
  //                   <Form.Group controlId="exampleForm.ControlInput1" className="m-b-20">
  //                     <Form.Label classNameName="custom-label">Username</Form.Label>
  //                     <Form.Control 
  //                     className="custom-input" 
  //                     size="md" 
  //                     type="text" 
  //                     placeholder="Enter e-mail or username here"
  //                     onChange={(e) => setUsername(e.target.value)}
  //                   />
  //                 </Form.Group>
  //                 <Form.Group controlId="exampleForm.ControlInput1">
  //                   <Form.Label className="custom-label">Password</Form.Label>
  //                   <InputGroup>
  //                     <Form.Control 
  //                       className="custom-input" 
  //                       size="md" 
  //                       type={showPassword ? 'text' : "password"} 
  //                       placeholder="Enter password here"
  //                       onChange={(e) => setPassword(e.target.value)}
  //                     />
  //                     <InputGroup.Text className='custom-input border-0'><i className={showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'} onClick={()=> setShowPassword(!showPassword)}/></InputGroup.Text>
  //                   </InputGroup>
  //                 </Form.Group>
  //                 <Link className="link-orange font-24 d-none" to="/forgot_password" >Forgot Password</Link>
  //                 <Button className="btn btn-md btn-primary btn-auth w-100 d-block mt-4 mb-4" size="md" variant="primary" type="submit">Log In</Button>
  //                 <div>Don't have an account yet? <span style={{fontWeight:"bold"}}><a href="/register">Sign up here</a></span></div>
  //               </Form>
  //           </div>
  //         </div>
       
  //    </div>
  //  </div>
  );
}

export default Login;
