import { Navbar, Form, Button, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import MarkLogic from '../assests/MarkLogic.jpg'

export const NavBar = () => {
  return (
    <Navbar bg="dark" expand="lg" variant='dark' className='nav'>
      <Container fluid>
        <Navbar.Brand href="#" style={{fontFamily: "Times New Roman", fontSize: "40px"}}>Mark<span className='text-danger' style={{fontFamily: "Times New Roman"}}>Logic</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 text"
            style={{ maxHeight: '100px' }}
          >
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <Nav.Link as={Link} to="/" >About</Nav.Link>
            <Nav.Link as={Link} to="/">Contact</Nav.Link>
        </Nav>
          <div className='d-flex search'>
            <input
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
