import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addPost } from '../../redux/actions/@posts';

const AddPost = ({ addPost, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    text: ''
  });

  const { title, text } = formData;
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = e => {
    e.preventDefault();
    addPost(formData, history);
  };
  return (
    <Fragment>
      <form onSubmit={e => onSubmit(e)}>
        <input
          type='text'
          name='title'
          placeholder='enter a topic'
          value={title}
          onChange={e => onChange(e)}
        />
        <br />
        <textarea
          type='text'
          name='text'
          placeholder='about topic in detail'
          value={text}
          onChange={e => onChange(e)}
        />
        <button type='submit'>create post</button>
      </form>
    </Fragment>
  );
};

AddPost.propTypes = {
  addPost: PropTypes.func.isRequired
};
export default connect(null, { addPost })(withRouter(AddPost));
