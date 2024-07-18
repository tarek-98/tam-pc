// src/features/comments/Comments.js
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../store/commentSlice";
import "./comments.css";
import AddComment from "./AddComment";
import EditComment from "./EditComment";
import AddReply from "./AddReply";
import { FaUser } from "react-icons/fa";

const Comments = ({ product }) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(null);
  const [replyMode, setReplyMode] = useState(null);
  const [visibleReplies, setVisibleReplies] = useState({});
  const comments = product.comments;

  const { userInfo } = useSelector((state) => state.auth);
  const userData = userInfo ? userInfo[`Client data`][0] : null;
  const user = userData ? userData._id : null;

  useEffect(() => {
    console.log(comments);
  }, []);
  const toggleReplies = (commentId) => {
    setVisibleReplies((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

  let content;
  content = comments.map((comment) => (
    <li key={comment._id} className="comment-item">
      <Fragment>
        <div className="d-flex align-items-center gap-2">
          <FaUser className="fs-4" />
          <span>userName</span>
        </div>
        <div className="comment-text mb-0">{comment.comment}</div>
        <div>
          <span className="comment-date me-4">
            {new Date(comment.createdAt).toLocaleString()}
          </span>
          <div className="comment-actions d-flex gap-2 me-4">
            {user === comment.client && (
              <span
                onClick={() => {
                  setEditMode(comment._id);
                }}
                className="text-black-50"
              >
                تعديل
              </span>
            )}

            <span
              onClick={() => setReplyMode(comment._id)}
              className="text-black-50"
            >
              رد
            </span>

            {user === comment.client && (
              <span
                onClick={() =>
                  dispatch(
                    deleteComment({
                      productId: product._id,
                      commentId: comment._id,
                    })
                  )
                }
                className="text-black-50"
              >
                حذف
              </span>
            )}
          </div>
        </div>
        {comment.replies.length > 0 && (
          <div>
            <p onClick={() => toggleReplies(comment._id)}>
              {visibleReplies[comment.id]
                ? "Hide Replies"
                : `Show ${comment.replies.length} Replies`}
            </p>
            {visibleReplies[comment._id] && (
              <div>
                {comment.replies.map((reply) => (
                  <div key={reply._id} style={{ marginLeft: "20px" }}>
                    <p>{reply.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </Fragment>

      {editMode === comment._id && (
        <Fragment>
          <div className="d-flex align-items-center">
            <EditComment
              comment={comment}
              setEditMode={setEditMode}
              product={product}
            />
          </div>
        </Fragment>
      )}

      {replyMode === comment._id && (
        <Fragment>
          <div className="d-flex align-items-center">
            <AddReply
              commentId={comment._id}
              setReplyMode={setReplyMode}
              product={product}
            />
          </div>
        </Fragment>
      )}
    </li>
  ));

  return (
    <div className="comment-section">
      <form>
        <div className="comment-form">
          <AddComment product={product} />
        </div>
        <ul className="comment-list">{content}</ul>
      </form>
    </div>
  );
};

export default Comments;
