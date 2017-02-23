/**
 * Created by tywin on 22/02/2017.
 */
import React, { Component } from 'react';
import './App.css';
import { Nav, Navbar, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

class TopNav extends Component {
    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Everwriter</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav pullRight>
                    <NavItem eventKey={1} href="#">Sync</NavItem>
                    <NavDropdown eventKey={3} title="Profile" id="basic-nav-dropdown">
                        <MenuItem eventKey={3.1}><FontAwesome name="cog"/> Settings</MenuItem>
                        <MenuItem eventKey={3.2}><FontAwesome name="files-o"/> Exports as...</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={3.3}><FontAwesome name="sign-out"/> Sign out</MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar>
        );
    }
}

export default TopNav;