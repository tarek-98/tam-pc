import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendMessageAsync } from "../../store/chatSlice";
import EmojiPicker from "./EmojiPicker";
import "./inbox.css";

const MessageInput = ({ senderId, receiverId }) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleSendMessage = () => {
    if (message.trim()) {
      dispatch(sendMessageAsync({ senderId, receiverId, message }));
      setMessage("");
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMessage(message + emoji);
  };

  return (
    <div className="message-input">
      <input
        type="text"
        className="form-control"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="اكتب رسالتك"
      />
      <button className="btn btn-primary" onClick={handleSendMessage}>
        ارسال
      </button>
    </div>
  );
};

export default MessageInput;
