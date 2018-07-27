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
            <NavbarBrand href="landing.html">Dev Connector</NavbarBrand>
            <NavbarToggler onClick={this.toggler} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav navbar className="mr-auto">
                <NavItem>
                  <NavLink>Developers</NavLink>
                </NavItem>
              </Nav>

              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink>Sign Up</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink>Login</NavLink>
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
