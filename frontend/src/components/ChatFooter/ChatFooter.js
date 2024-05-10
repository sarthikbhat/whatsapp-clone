import { Laugh, Mic, Paperclip, Send } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import "./ChatFooter.css";

export default function ChatFooter({ passMessage }) {
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const textAreaRef = useRef(null);
  const MAX_SCROLL_HEIGHT = 3 * 46;

  const handleInputChange = (e) => {
    setMsg(e.target.value);
    if (e.target.value.trim().length !== 0) {
      setShow(true);
      return;
    }
    setShow(false);
  };

  useEffect(() => {
    const textAreaRefCurrent = textAreaRef.current;
    if (textAreaRefCurrent.value) {
      let scrollHeight = textAreaRefCurrent.scrollHeight - 58;
      if (msg.length === 0) scrollHeight = 0;
      textAreaRefCurrent.style.height =
        scrollHeight >= 0
          ? scrollHeight > MAX_SCROLL_HEIGHT
            ? MAX_SCROLL_HEIGHT + 10
            : scrollHeight + 10 + "px"
          : null;
    }
  }, [textAreaRef, msg, MAX_SCROLL_HEIGHT]);

  const sendMessage = (e, clickEvent = false) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
    if (e.keyCode === 13 && e.altKey){
      e.preventDefault();
      return;
    } 
    if (e.keyCode === 13 || clickEvent) {
      if (msg.trim()) {
        passMessage({
          message: msg,
          type: "OUT",
        });
      }
      setMsg("");
    }
  };

  const handleNextLine = (e) => {
    if (e.keyCode === 13) e.preventDefault();
    if (e.keyCode === 13 && e.altKey) {
      e.preventDefault();
      if (textAreaRef.current.scrollHeight < MAX_SCROLL_HEIGHT)
        setMsg(msg + "\n");
    }
  };

  return (
    <div className="chatFooter">
      <div style={{ display: "flex", gap: "1rem" }}>
        <Laugh size={25} color="var(--icon-text-clr-light)" />
        <Paperclip size={25} color="var(--icon-text-clr-light)" />
      </div>
      <div
        style={{
          position: "relative",
          width: "100%",
          flex: 1,
          display: "flex",
        }}
      >
        <textarea
          placeholder="Type a message"
          onChange={handleInputChange}
          onKeyUp={sendMessage}
          onKeyDown={handleNextLine}
          className="chatInput"
          value={msg}
          rows={1}
          ref={textAreaRef}
        ></textarea>
      </div>
      {show ? (
        <Send
          size={25}
          color="var(--icon-text-clr-light)"
          className="sendIcon"
          onClick={sendMessage(true)}
        />
      ) : (
        <Mic size={25} color="var(--icon-text-clr-light)" />
      )}
    </div>
  );
}
