import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

import { DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap';

import "../App.css";
import { Outlet, useNavigate } from "react-router-dom";


function Header() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user-info'));

  function logout() {
    localStorage.clear();
    navigate('/Register');
  }

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary custom_navbar sticky-top">
        <Container fluid>
          <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="AddProduct">Link</Nav.Link>
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/Pages">SearchBar</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#" disabled>
                Link
              </Nav.Link>
              <NavDropdown title="DashBoard" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/AddProduct">Add Product</NavDropdown.Item>
                <NavDropdown.Item href="/ProductList">
                  Update Product
                </NavDropdown.Item>
                
              </NavDropdown>


            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
            <nav className='myDropdown'>
              <DropdownButton
              
                as={ButtonGroup}
                id="navbarScrollingDropdown"
                drop="start"
                direction="start"
                variant="secondary"
                title={user ? user.name || 'User Info' : 'User Info'}
              >
                {localStorage.getItem('user-info') ? (
                  <>
                    <Dropdown.Item className='link' onClick={logout}>Log out</Dropdown.Item>
                    <Dropdown.Item className='link' href="/Profile">Profile</Dropdown.Item>
                  </>
                ) : (
                  <>
                    <Dropdown.Item href="/Login">Login</Dropdown.Item>
                    <Dropdown.Item href="/Register">Register</Dropdown.Item>
                  </>
                )}
              </DropdownButton>
            </nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default Header;