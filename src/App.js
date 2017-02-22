import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Nav, Navbar, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#">Everwriter</a>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav pullRight="true">
                <NavItem eventKey={1} href="#">Sync</NavItem>
                <NavDropdown eventKey={3} title="Profile" id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1}>Settings</MenuItem>
                    <MenuItem eventKey={3.2}>Exports as...</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey={3.3}>Sign out</MenuItem>
                </NavDropdown>
            </Nav>
        </Navbar>
    );
  }
}

export default App;
