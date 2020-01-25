import React, { Fragment, useState, useEffect } from "react";
import "../../styles/posts/postComponent.scss";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { like } from "../../redux/actions/@posts";
import PropTypes from "prop-types";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const PostItem = ({
  auth,
  history,
  user,
  like,
  post: { _id, title, body, name, avatar, date, comments, likes }
}) => {
  const togLike = user ? likes.filter(like => like.user === user._id) : "null";
  
  const likePost = e => {
    auth ? like(_id) : history.push("/login");
  };
  const [commentToggler, setCommentToggler] = useState(false);

  const toggleComments = () => {
    setCommentToggler(!commentToggler);
  };

  return (
    <Fragment>
      <div className='pc-wrapper'>
        <div className='pc-1'>
          <img height={"50px"} src={avatar} alt='pic' />
          <div className='pc-top'>
            <span className='pc-auth-date'>
              <i>author:{name}</i>
            </span>
            <span className='pc-auth-date'>
              {new Date(date).toLocaleString()}
            </span>
            <span className='pc-title'>
              <b>{title}</b>
            </span>
          </div>
        </div>
        <p className='pc-body'>{body}</p>

        <div className='pc-counts'>
          <span className='li'>
            likes:{likes.length > 0 ? likes.length : ""}
          </span>
          <span className='co' onClick={() => toggleComments()}>
            comments:{comments.length > 0 ? comments.length : ""}
          </span>
        </div>

        <div className='pc-buttons'>
          <div className='buttons' onClick={e => likePost(e)}>
            <span>
              {togLike[0] === undefined || togLike.toString() === "null"
                ? "like"
                : auth === true
                ? "liked"
                : "like"}
            </span>
          </div>
          <div className='buttons'>comment</div>
          <div className='buttons'>share</div>
        </div>
        {commentToggler && auth && (
          <Comment auth={auth} admin={user} post_id={_id} comments={comments} />
        )}
        <CommentForm id={_id} />
      </div>
    </Fragment>
  );
};
PostItem.propTypes = {
  like: PropTypes.func.isRequired,
  toggleComments: PropTypes.func.isRequired
};
const mapStateToProps = state => {
  return { posts: state.posts };
};
export default connect(mapStateToProps, { like })(withRouter(PostItem));
