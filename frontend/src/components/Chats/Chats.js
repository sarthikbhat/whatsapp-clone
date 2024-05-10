import React, { useEffect, useState } from "react";
import "./Chats.css";
import ChatIn from "./ChatIn";
import ChatOut from "./ChatOut";

export default function Chats({ message }) {
  const [msg, setMsg] = useState([]);

  useEffect(() => {
    setMsg(message.reverse());
  }, [message]);

  return (
    <React.Fragment>
      <div className="chat">
        {msg.map((elm, index) => {
          return elm.type === "OUT" ? (
            <ChatOut key={index} msg={elm.message} />
          ) : (
            <ChatIn key={index} msg={elm.message} />
          );
        })}
      </div>
    </React.Fragment>
  );
}
