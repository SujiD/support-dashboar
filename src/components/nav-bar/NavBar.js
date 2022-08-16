import { Navbar, Form, Button, Nav, Container } from 'react-bootstrap'
import { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SideBarData } from './SideBarData';
import './Navbar.css';
import { IconContext } from 'react-icons';

export const NavBar = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
     <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars' onClick={showSidebar}>
            {sidebar ?  <AiIcons.AiOutlineClose /> : <FaIcons.FaBars /> }
          </Link>
          <span className='logo'>Mark<span className='text-danger logo'>Logic</span></span>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            {SideBarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
      </>
    // <Navbar bg="dark" expand="lg" variant='dark' className='nav'>
    //   <Container fluid>
    //     <Navbar.Brand href="#" style={{fontFamily: "Times New Roman", fontSize: "40px"}}>Mark<span className='text-danger' style={{fontFamily: "Times New Roman"}}>Logic</span></Navbar.Brand>
    //     <Navbar.Toggle aria-controls="navbarScroll" />
    //     <Navbar.Collapse id="navbarScroll">
    //       <Nav
    //         className="me-auto my-2 my-lg-0 text"
    //         style={{ maxHeight: '100px' }}
    //       >
    //         <Nav.Link as={Link} to="/home">Home</Nav.Link>
    //         <Nav.Link as={Link} to="/" >About</Nav.Link>
    //         <Nav.Link as={Link} to="/">Contact</Nav.Link>
    //     </Nav>
    //       <div className='d-flex search'>
    //         <input
    //             type="search"
    //             placeholder="Search"
    //             className="me-2"
    //             aria-label="Search"
    //             />
    //             <Button variant="outline-success">Search</Button>
    //       </div>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
  )
}
