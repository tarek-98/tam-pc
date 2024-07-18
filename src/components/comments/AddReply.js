import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReply } from "../../store/commentSlice";

const AddReply = ({ commentId, setReplyMode, product }) => {
  const [reply, setReply] = useState("");
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const userData = userInfo[`Client data`][0];
  const user = userData._id;
  const productId = product._id;
  const onreplyChanged = (e) => setReply(e.target.value);

  const onSaveReplyClicked = () => {
    if (reply) {
      dispatch(addReply({ productId, commentId, user, reply }));
      setReply("");
    }
  };

  return (
    <div className="d-flex align-items-center">
      <input
        type="text"
        value={reply}
        onChange={onreplyChanged}
        className="reply-input"
      />
      <button
        type="button"
        onClick={onSaveReplyClicked}
        className="reply-button"
      >
        رد
      </button>
      <button onClick={() => setReplyMode(null)} className="reply-button">
        الغاء
      </button>
    </div>
  );
};

export default AddReply;
