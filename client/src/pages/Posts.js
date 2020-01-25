import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getPosts } from "../redux/actions/@posts";
import PostItem from "../components/posts/PostItem";
import "../styles/posts/postComponent.scss";

const Posts = ({
  getPosts,
  posts: { posts, isLoading },
  auth: { isAuthenticated, user }
}) => {
  useEffect(() => {
    getPosts();
  }, []);

  const postsList = isLoading ? (
    <div>posts are loading</div>
  ) : (
    posts.map(post => {
      return (
        <div className='post' key={post._id}>
          <PostItem
            key={post._id}
            auth={isAuthenticated}
            user={user}
            post={post}
          />
        </div>
      );
    })
  );
  return (
    <Fragment>
      <Link to='/add-post'>add Post</Link>
      <div>{postsList}</div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  toggleComState: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    posts: state.posts,
    auth: state.auth
  };
};
export default connect(mapStateToProps, { getPosts })(Posts);
