import React, { Component, PropTypes } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router';

const NavBar = () => (
  <Navbar collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">Hamster</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <NavItem> Investor Login</NavItem>
        <NavItem> Homeowner Login</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>

);

NavBar.propTypes = {

};

export default NavBar;
