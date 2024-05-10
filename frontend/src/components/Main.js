import React, { useContext } from "react";
import ChatBar from "./ChatBar/ChatBar";
import ChatWindow from "./ChatWindow/ChatWindow";
import { Navigate } from "react-router-dom";
import { LoginContext } from "../Context";

export default function Main({ socket }) {
  const auth = useContext(LoginContext);
  console.log(socket);
  return (
    <React.Fragment>
      {!auth.loggedIn ? (
        <Navigate to="/login" replace />
      ) : (
        <React.Fragment>
          <ChatBar />
          <ChatWindow />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
