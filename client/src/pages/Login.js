import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../redux/actions/@auth';

const Login = ({ isAuthenticated, login }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = e => {
    e.preventDefault();
    login(formData);
  };
  //redirect is already logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <Fragment>
      <form onSubmit={e => onSubmit(e)}>
        <fieldset>
          <legend>Enter Login Details</legend>
          <input
            name='email'
            type='text'
            value={email}
            onChange={e => onChange(e)}
            placeholder='Enter Email'
          />
          <input
            name='password'
            type='password'
            value={password}
            onChange={e => onChange(e)}
            placeholder='******'
          />
          <input type='submit' value='Login' />
        </fieldset>
      </form>
    </Fragment>
  );
};

Login.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return { isAuthenticated: state.auth.isAuthenticated };
};
export default connect(mapStateToProps, { login })(Login);
