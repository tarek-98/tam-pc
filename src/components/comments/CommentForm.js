import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../../store/commentSlice";
import { v4 as uuidv4 } from "uuid";
import "../slideOverlay.css";

const CommentForm = () => {
  const [body, setBody] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    if (body === "") {
      e.preventDefault();
      // alert("Please enter a comment");
    } else {
      e.preventDefault();
      const id = uuidv4();
      dispatch(addComment({ id, body }));
      setBody("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Add comment"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default CommentForm;
