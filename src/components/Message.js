import React from "react";

const Message = ({ content }) => {
  return (
    <div class="pop-up" id="popup">
      <div class="pop-up-container">
        <h2>{content}</h2>
        <i class="far fa-times-circle" id="closeBtn"></i>
      </div>
    </div>
  );
};

export default Message;
