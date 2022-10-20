import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function HeaderMain() {
  const usertype = localStorage.getItem("userType")
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container   style={{color:"white !important"}}>
        <Navbar.Brand href="/home">VETDRUMS</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link href="/prescriptions">VDO</Nav.Link>
            
            {usertype === "Veterenarian" && <Nav.Link href="/users">Users</Nav.Link>}
            <Nav.Link href="/animals">Animals</Nav.Link>
            <NavDropdown title="Others" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/medicines">Medicines</NavDropdown.Item>
              <NavDropdown.Item href="/dispensers">
                Dispenser
              </NavDropdown.Item>
              <NavDropdown.Item href="/patients">
                Patients
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets"></Nav.Link>
            <Nav.Link eventKey={3} href="/profile">
              Profile
            </Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderMain;