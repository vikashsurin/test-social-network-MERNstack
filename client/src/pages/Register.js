import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { register } from '../redux/actions/@auth';
import PropTypes from 'prop-types';

const Register = ({ isAuthenticated, register }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const { name, email, password, password2 } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = e => {
    e.preventDefault();
    register(formData);
    console.log('registered');
  };

  //redirect is already logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <Fragment>
      <form onSubmit={e => onSubmit(e)}>
        <fieldset>
          <legend>Enter Credentials </legend>
          <input
            name='name'
            type='text'
            value={name}
            onChange={e => onChange(e)}
            placeholder='Enter Name'
          />
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
          <input
            name='password2'
            type='password'
            value={password2}
            onChange={e => onChange(e)}
            placeholder='******'
          />
          <input type='submit' value='Register' />
        </fieldset>
      </form>
    </Fragment>
  );
};

Register.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return { isAuthenticated: state.auth.isAuthenticated };
};
export default connect(mapStateToProps, { register })(Register);
