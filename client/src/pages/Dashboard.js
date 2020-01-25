import React, { Fragment, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/@posts';
import PropTypes from 'prop-types';
import { getCurrentProfile, deleteAccount } from '../redux/actions/@profile';
import { removePost } from '../redux/actions/@posts';
import { loadUser } from '../redux/actions/@auth';

const Dashboard = ({
  getPosts,
  loadUser,
  deleteAccount,
  auth: { isAutheticated },
  profile: { profile, isLoading },
  getCurrentProfile,
  removePost,
  user,
  posts: { posts }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [isAutheticated]);

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    loadUser();
  }, []);


  const userPostList = user ? posts.filter(post => post.user === user._id) : '';
  const renderPostsList = user ? (
    userPostList.map(post => (
      <div key={post._id}>
        {post.title}
        <button onClick={e => removePost(post._id)}>delete</button>
      </div>
    ))
  ) : (
    <div>loading</div>
  );
  if (!profile) {
    return (
      <Fragment>
        <div>
          <p>You have not created a profile yet , go ahead and create one</p>
        </div>
        <Fragment>
          <NavLink to='/create-profile'>create Profile</NavLink>
        </Fragment>
      </Fragment>
    );
  }
  return isLoading && profile === null ? (
    <div>loading</div>
  ) : (
    <Fragment>
      <h1>Welcome , {profile.universityName}</h1>
      <p>
        <b>Name :</b> <span>{profile.universityName}</span>
      </p>
      <p>
        <b>Role :</b> <span>{profile.role}</span>
      </p>
      <p>
        <b>Course :</b> <span>{profile.course}</span>
      </p>
      <p>
        <b>UniversityName :</b> <span>{profile.universityName}</span>
      </p>
      <p>
        <b>Hobbies :</b> <span>{profile.hobbies.toString()}</span>
      </p>
      <p>
        <b>Social :</b>{' '}
        <a href={!profile.social ? '' : profile.social.facebook}>
          {!profile.social ? '' : profile.social.facebook}
        </a>
      </p>
      <NavLink to='/edit-profile'>Edit profile</NavLink>

      <button onClick={() => deleteAccount()}>Delete Profile</button>
      {renderPostsList}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  removePost: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  // console.log(state);
  // console.log(state.auth.user._id);
  // console.log(state.posts.posts.map(post => post.user));
  return {
    auth: state.auth,
    profile: state.profile,
    user: state.auth.user,
    posts: state.posts
  };
};
export default connect(mapStateToProps, {
  loadUser,
  getCurrentProfile,
  getPosts,
  removePost,
  deleteAccount
})(Dashboard);
