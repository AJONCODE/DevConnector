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
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

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

  handleLogoutClick = event => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink tag={Link} to="/feed">
            Post Feed
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/dashboard">
            Dashboard
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/" onClick={this.handleLogoutClick}>
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              title="You must have a gravatar connected to your email to display an image"
              style={{ width: "25px", marginRight: "5px" }}
            />
            Logout
          </NavLink>
        </NavItem>
      </Nav>
    );

    const guestLinks = (
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
    );

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
                  <NavLink tag={Link} to="/profiles">
                    Developers
                  </NavLink>
                </NavItem>
              </Nav>
              {isAuthenticated ? authLinks : guestLinks}
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

AppNavbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(AppNavbar);
