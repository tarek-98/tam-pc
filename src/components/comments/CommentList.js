// src/features/comments/Comments.js
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComments,
  addComment,
  deleteComment,
} from "../../store/commentSlice";
import "./comments.css";
import { FaUser } from "react-icons/fa";
import axios from "axios";

const Comments = ({ product }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.comments);
  // const comments = product.comments
  const [newComment, setNewComment] = useState("");
  const [replyText, setReplyText] = useState("");
  const [editMode, setEditMode] = useState(null);
  const [editText, setEditText] = useState("");
  const [replyMode, setReplyMode] = useState(null);

  const curretUser = "user2";

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  const handleAddComment = () => {
    dispatch(
      addComment({
        text: newComment,
        userId: curretUser,
        createdAt: new Date().toISOString(),
        parentId: null,
      })
    );
    setNewComment("");
  };

  const handleAddReply = (parentId) => {
    dispatch(
      addComment({
        text: replyText,
        userId: curretUser,
        createdAt: new Date().toISOString(),
        parentId,
      })
    );
    setReplyText("");
    setReplyMode(null);
  };

  const handleEditComment = (comment) => {
    const now = new Date();
    console.log(now);
    axios({
      method: "PUT",
      url: `http://localhost:9000/comments/${comment.id}`,
      data: {
        id: comment.id,
        text: editText,
        userId: comment.userId,
        createdAt: now,
        parentId: comment.parentId,
      },
    }).then((data) => {
      dispatch(fetchComments());
      setEditMode(null);
      setEditText("");
    });
  };

  const handleDeleteComment = (id) => {
    dispatch(deleteComment(id));
  };

  const renderComments = (parentId = null) => {
    return comments
      .filter((comment) => comment.parentId === parentId)
      .map((comment) => (
        <li key={comment.id} className="comment-item">
          {editMode === comment.id ? (
            <Fragment>
              <div className="d-flex align-items-center">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="edit-input"
                />
                <button
                  onClick={() => handleEditComment(comment)}
                  className="edit-button"
                >
                  تعديل
                </button>
                <button
                  onClick={() => setEditMode(null)}
                  className="edit-button"
                >
                  الغاء
                </button>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div className="d-flex align-items-center gap-2">
                <FaUser className="fs-4" />
                <span>userName</span>
              </div>
              <div className="comment-text">{comment.text}</div>
              <div>
                <span className="comment-date">
                  {new Date(comment.createdAt).toLocaleString()}
                </span>
                <div className="comment-actions">
                  <button
                    onClick={() => {
                      setEditMode(comment.id);
                      setEditText(comment.text);
                    }}
                    className="edit-button text-black-50"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="delete-button text-black-50"
                  >
                    حذف
                  </button>
                  <button
                    onClick={() => setReplyMode(comment.id)}
                    className="reply-button text-black-50"
                  >
                    رد
                  </button>
                </div>
              </div>
            </Fragment>
          )}
          {replyMode === comment.id && (
            <Fragment>
              <div className="d-flex align-items-center">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="reply-input"
                />
                <button
                  onClick={() => handleAddReply(comment.id)}
                  className="reply-button"
                >
                  رد
                </button>
                <button
                  onClick={() => setReplyMode(null)}
                  className="reply-button"
                >
                  الغاء
                </button>
              </div>
            </Fragment>
          )}
          <ul className="comment-list pe-4">{renderComments(comment.id)}</ul>
        </li>
      ));
  };

  return (
    <div className="comment-section">
      <div className="comment-form">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="comment-input"
        />
        <button onClick={handleAddComment} className="comment-button">
          اضف
        </button>
      </div>
      <ul className="comment-list">{renderComments()}</ul>
    </div>
  );
};

export default Comments;
