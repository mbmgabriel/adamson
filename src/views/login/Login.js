import { useState } from "react";
import Auth from "../../api/Auth";
import { Form, Button, InputGroup } from 'react-bootstrap'
import { Link, useHistory, redirect, BrowserRouter } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import bg from '../../assets/images/56693.jpg'

function Login() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();

  const login = async(e) => {
    e.preventDefault();
    let response = await new Auth().login({username, password})
    console.log({response})
    if(response.ok){
      alert("Success")
      return history.push('/login')
    }else{
      alert(response.data.errorMessage)
    }
  }

  return (
    <Container fluid vh-100>
    <Row>
      <Col md={6} className='login-screen-left'>
        <Image fluid src={bg}></Image>
      </Col>
      <Col md={6} className='login-screen-right'>
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
          <div>
          <h1 className="title"><span className="orange">Haru</span>Gabriel</h1>
          {/* <p className="subtitle">Welcome back to TekTeach! Making learning, a great experience!</p> */}
            <Form onSubmit={login}>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label className="custom-label">E-mail / Username</Form.Label>
                <Form.Control 
                  className="custom-input" 
                  size="md" 
                  type="text" 
                  placeholder="Enter e-mail or username here"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label className="custom-label">Password</Form.Label>
                <InputGroup>
                  <Form.Control 
                    className="custom-input" 
                    size="md" 
                    type={showPassword ? 'text' : "password"} 
                    placeholder="Enter password here"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputGroup.Text className='custom-input border-0'><i className={showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'} onClick={()=> setShowPassword(!showPassword)}/></InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Link className="link-orange font-24 d-none" to="/forgot_password" >Forgot Password</Link>
              <Button className="btn btn-md btn-primary btn-auth w-100 d-block mt-4 mb-4" size="md" variant="primary" type="submit">Log In</Button>
            </Form>
          </div>
          </Col>
        </Row>
      </Col>
    </Row>
    </Container>
  );
}

export default Login;
