import React from "react";

const Message = ({ content }) => {
  return (
    <div className="pop-up" id="popup">
      <div className="pop-up-container">
        <h2>{content}</h2>
      </div>
    </div>
  );
};

export default Message;
