import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

const Navigation = () => {
	return (
		<Navbar bg="dark" expand="lg" variant="dark">
			<Navbar.Brand>Conservation Planning Inventory Tool</Navbar.Brand>
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="me-auto">
					<Nav.Link><Link to="/" style={{ color: 'white', textDecoration: 'None' }}>Map</Link></Nav.Link>
					<Nav.Link><Link to="/table" style={{ color: 'white', textDecoration: 'None' }}>Table</Link></Nav.Link>
					<NavDropdown title="Other Tools" id="basic-nav-dropdown">
						<NavDropdown.Item
							onClick={(evt) => {
								window.open('https://www.google.com', '_blank');
							}}
						>
							Prioritization Tool
						</NavDropdown.Item>
						<NavDropdown.Item
							onClick={(evt) => {
								window.open('https://www.google.com', '_blank');
							}}
						>
							Visualization Tool
						</NavDropdown.Item>
					</NavDropdown>
					<Nav.Link><Link to="/about" style={{ color: 'white', textDecoration: 'None' }}>Contact Us</Link></Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default Navigation;
