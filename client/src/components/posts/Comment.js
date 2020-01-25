import React, { Fragment, useState, useEffect } from "react";
import "../../styles/posts/postComponent.scss";
import { connect } from "react-redux";
import { removeComment } from "../../redux/actions/@posts";
import PropTypes from "prop-types";

const Comment = ({ admin, auth, post_id, removeComment, comments }) => {
  const commentList = comments
    ? comments.map(comment => {
        const commentId = comment._id;
        return (
          <div className='c-img-text'>
            <img
              className='c-img'
              height={"40px"}
              src={comment.avatar}
              alt='pic'
              onClick={() => console.log(comment.avatar)}
            />
            <div className='c-nt'>
              <a href='#' className='c-n'>
                {comment.name}
              </a>
              <span className='c-t'>{comment.text.toString()}</span>
              <i className='c-d'>{comment.date}</i>
            </div>
            <Toggler
              auth={auth}
              pst_id={post_id}
              adm_id={admin._id}
              cmt_id={commentId}
              cmt_user={comment.user}
              removeComment={removeComment}
              cmt_txt={comment.text}
            />
          </div>
        );
      })
    : "";
  return (
    <Fragment>
      <div className='c-container'>{commentList}</div>
    </Fragment>
  );
};

const Toggler = ({
  auth,
  pst_id,
  adm_id,
  cmt_id,
  cmt_txt,
  cmt_user,
  removeComment
}) => {
  const [showDelete, setShowDelete] = useState(false);
  const deleteComment = () => {
    removeComment(pst_id, cmt_id);
    console.log(cmt_txt, cmt_id);
  };
  return (
    <div onClick={() => setShowDelete(!showDelete)}>
      {auth && adm_id ? adm_id === cmt_user && <div>...</div> : ""}
      {showDelete && (
        <div className='c-delete' onClick={async () => await deleteComment()}>
          icon
        </div>
      )}
    </div>
  );
};

Comment.propTypes = {
  admin: PropTypes.object.isRequired,
  auth: PropTypes.bool.isRequired,
  post_id: PropTypes.object.isRequired,
  removeComment: PropTypes.func.isRequired,
  comments: PropTypes.object.isRequired
};
const mapStateToProps = state => {
  return { state };
};
export default connect(mapStateToProps, { removeComment })(Comment);
