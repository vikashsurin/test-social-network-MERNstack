import React, { Fragment } from "react";
import { NavLink, withRouter, Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/actions/@auth";
import PropTypes from "prop-types";

const Navbar = ({ auth: { isAuthenticated, isLoading }, logout, history }) => {
  const logOut = () => {
    logout(history);
    // useHistory.push("/posts");
  };
  const authLinks = (
    <div>
      <NavLink to='/posts'>posts</NavLink>{" "}
      <NavLink to='/dashboard'>dashboard</NavLink>{" "}
      <NavLink to='/logout' onClick={() => logOut()}>
        logOut
      </NavLink>
    </div>
  );
  const publicLinks = (
    <div>
      <NavLink to='/posts'>posts </NavLink>
      <NavLink to='/login'>Login</NavLink>{" "}
      <NavLink to='/register'>Register</NavLink>
    </div>
  );
  return (
    <Fragment>
      {!isLoading && isAuthenticated ? authLinks : publicLinks}
    </Fragment>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};
const mapStateToProps = state => {
  return { auth: state.auth };
};
export default connect(mapStateToProps, { logout })(withRouter(Navbar));
