import React from 'react';
import { connect } from 'react-redux';
const Landing = props => {
  return <div>landig</div>;
};

const mapStateToProps = state => {
  console.log('i am from landing page', state);
  return state;
};
export default connect(mapStateToProps)(Landing);
