import React, { Component } from "react";
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { Link } from "react-router-dom";

class AppNavbar extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
  }

  toggler = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-4">
          <Container>
            <NavbarBrand tag={Link} to="/">
              Dev Connector
            </NavbarBrand>
            <NavbarToggler onClick={this.toggler} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav navbar className="mr-auto">
                <NavItem>
                  <NavLink tag={Link} to="#">
                    Developers
                  </NavLink>
                </NavItem>
              </Nav>

              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink tag={Link} to="/register">
                    Sign Up
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/login">
                    Login
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default AppNavbar;
