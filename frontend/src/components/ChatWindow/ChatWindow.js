import React, { useContext, useState } from "react";
import ChatHeader from "../ChatHeader/ChatHeader";
import ChatFooter from "../ChatFooter/ChatFooter";
import ChatWindowIdle from "./ChatWindowIdle";
import Chats from "../Chats/Chats";
import "./ChatWindow.css";
import { UserSelectContext } from "../../Context";

export default function ChatWindow() {
  const userSelected = useContext(UserSelectContext);
  const [msg, setMsg] = useState([]);
  const passMessage = (msgObj) => {
    const tempMsg = [...msg];
    tempMsg.push(msgObj);
    setMsg(tempMsg);
  };

  return (
    <div
      style={{ flex: 0.7, flexDirection: "column" }}
      className="dFlex chatWindow"
    >
      {userSelected.value ? (
        <React.Fragment>
          <ChatHeader />
          <Chats message={msg} />
          <ChatFooter passMessage={passMessage} />
        </React.Fragment>
      ) : (
        <ChatWindowIdle />
      )}
    </div>
  );
}
