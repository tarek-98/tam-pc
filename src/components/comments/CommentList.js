import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addReply,
  fetchComments,
  removeComment,
} from "../../store/commentSlice";
import { FaUser } from "react-icons/fa";

const CommentList = ({ comment }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);
  const [replyContent, setReplyContent] = useState("");

  const handleReply = () => {
    if (replyContent.trim() !== "") {
      dispatch(
        addReply({ commentId: comment.id, reply: { content: replyContent } })
      );
      setReplyContent("");
    }
  };

  return (
    <div>
      {comments.status === "loading" ? (
        <div>Loading comments...</div>
      ) : comments.status === "failed" ? (
        <div>Error: {comments.error}</div>
      ) : (
        <ul className="pe-2 pb-5 ps-2">
          {comments.comments.map((comment) => (
            <Fragment>
              <li id={comment.id} key={comment.id} className="mb-3">
                <div className="comment-content d-flex">
                  <div className="comment-logo me-2">
                    <FaUser className="fs-3" />
                  </div>
                  <div className="comment-text">
                    <p className="comment-auther m-0">{comment.name}</p>
                    <p className="comment-auther-text m-0 text-black-50">
                      {comment.body}
                    </p>
                    <p
                      className="remove m-0 w-auto"
                      onClick={() => dispatch(removeComment(comment.id))}
                    >
                      delete
                    </p>
                  </div>
                </div>
              </li>
              {/*<input
                type="text"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
              />
              <button onClick={handleReply}>Reply</button>
              <ul>
                {comment.replies.map((reply) => (
                  <li key={reply.id}>{reply.content}</li>
                ))}
              </ul>*/}
            </Fragment>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentList;
