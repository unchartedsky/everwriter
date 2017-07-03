/**
 * Created by tywin on 22/02/2017.
 */
/* eslint jsx-a11y/href-no-hash: 0 */
import React, { Component } from 'react';
import './App.css';
import { MenuItem, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { saving } from './actions';

class TopNav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSelect = this.handleSelect.bind(this);
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Everwriter</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <NavItem eventKey={1} href="#" onSelect={this.handleSelect}>
            Sync
          </NavItem>
          <NavDropdown eventKey={3} title="Profile" id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>
              <FontAwesome name="cog" /> Settings
            </MenuItem>
            <MenuItem eventKey={3.2}>
              <FontAwesome name="files-o" /> Exports as...
            </MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.3}>
              <FontAwesome name="sign-out" /> Sign out
            </MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }

  handleSelect(selectedKey) {
    this.props.onSave('Default text');

    return true;
  }
}

let mapDispatchToProps = dispatch => {
  return {
    onSave: value => dispatch(saving(value))
  };
};

TopNav = connect(undefined, mapDispatchToProps)(TopNav);

export default TopNav;
