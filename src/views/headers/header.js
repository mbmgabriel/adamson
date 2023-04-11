import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React, { useEffect, useState } from "react";
import logo from "../../assets/images/image001.jpg"

function HeaderMain() {
  const usertype = sessionStorage.getItem("userType")
  const prcno = sessionStorage.getItem("prc")
  const [headerColor, setHeaderColor] = ('')

  // const getColor = () => {
  //   if(usertype === "Veterenarian"){
  //     setHeaderColor('#60BBD0')
  //   }else if(usertype === "dispenser"){
  //     setHeaderColor("#EDBB99")
  //   }else{
  //     setHeaderColor("#F9E79F")
  //   }
  // }
  useEffect(() => {
  }, []);  

  return (
    // <Navbar style={{color:"white !important", backgroundColor:"#60BBD0"}} collapseOnSelect expand="lg">
      <Navbar style={{color:"white !important"}} collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand href="/home" className="main-title-pages">
        <img src={logo} width="50" height="50" alt=""/>
          VETDRUMS
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          {/* {usertype === "Veterenarian" && prcno !== "" && <Nav.Link href="/prescriptions">VDO</Nav.Link>} */}
          {usertype === "Veterenarian" && <Nav.Link href="/prescriptions">VDO</Nav.Link>}
          {usertype === "Dispenser" && <Nav.Link href="/dispensingdrugs">Dispensing</Nav.Link>}
            
            {usertype === "Admin" && <Nav.Link href="/users">Users</Nav.Link>}
            {usertype === "Admin" && <Nav.Link href="/animals">Animals</Nav.Link>}
            {usertype === "Admin" && <Nav.Link href="/medicines">Medicines</Nav.Link>}
            {usertype === "Admin" && <Nav.Link href="/format">Product Format</Nav.Link>}
            {/* {usertype === "Admin" && <NavDropdown.Item href="/dispensers">
                Dispenser
              </NavDropdown.Item>} */}
              {/* {usertype === "Admin" && <NavDropdown.Item href="/patients">
                Patients
              </NavDropdown.Item>} */}
            {/* </NavDropdown>} */}
          </Nav>
          <Nav>
            <Nav.Link eventKey={3} href="/profile">
            {usertype === "Veterenarian" && 'Veterinarian Account Profile'} 
            {usertype === "Dispenser" && 'Dispensing Account Profile'} 
            {usertype === "Client" && 'Client Account Profile'} 
            </Nav.Link>
            <Nav.Link eventKey={2} href="/" onClick={() => {
                        sessionStorage.removeItem("name");
                        sessionStorage.removeItem("token");
                        sessionStorage.removeItem("userType");
                        sessionStorage.removeItem("trackingNo");
                        sessionStorage.removeItem("pId");
                        sessionStorage.removeItem("userID");
                        sessionStorage.removeItem("user");
                        sessionStorage.removeItem("lto");
                        sessionStorage.removeItem("prc");
                      }}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderMain;