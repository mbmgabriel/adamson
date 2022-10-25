import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function HeaderMain() {
  const usertype = localStorage.getItem("userType")
  return (
    <Navbar style={{color:"white !important", backgroundColor:"#60BBD0"}} collapseOnSelect expand="lg">
      <Container   style={{color:"white !important", backgroundColor:"#60BBD0"}}>
        <Navbar.Brand href="/home">VETDRUMS</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          {usertype === "Veterenarian" && <Nav.Link href="/prescriptions">VDO</Nav.Link>}
          {usertype === "Dispenser" && <Nav.Link href="/dispensingdrugs">Dispensing</Nav.Link>}
            
            {usertype === "admin" && <Nav.Link href="/users">Users</Nav.Link>}
            {usertype === "admin" && <Nav.Link href="/animals">Animals</Nav.Link>}
            {usertype === "admin" && <NavDropdown title="Others" id="collasible-nav-dropdown">
            {usertype === "admin" && <NavDropdown.Item href="/medicines">Medicines</NavDropdown.Item>}
            {usertype === "admin" && <NavDropdown.Item href="/dispensers">
                Dispenser
              </NavDropdown.Item>}
              {usertype === "admin" && <NavDropdown.Item href="/patients">
                Patients
              </NavDropdown.Item>}
            </NavDropdown>}
          </Nav>
          <Nav>
            <Nav.Link href="#deets"></Nav.Link>
            <Nav.Link eventKey={3} href="/profile">
              Profile
            </Nav.Link>
            <Nav.Link eventKey={2} href="/" onClick={() => {
                        localStorage.removeItem("name");
                        localStorage.removeItem("token");
                        localStorage.removeItem("userType");
                        localStorage.removeItem("trackingNo");
                        localStorage.removeItem("pId");
                        localStorage.removeItem("userID");
                        localStorage.removeItem("user");
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