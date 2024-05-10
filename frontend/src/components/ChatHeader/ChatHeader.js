import React from "react";
import "./ChatHeader.css";
import dp from "../../assets/images/dp.jpg";
import { MoreVertical, Search } from "lucide-react";

export default function ChatHeader() {
  return (
    <div className="chatHeader">
      <div className="userProfile">
        <img src={dp} alt="dp"></img>
      </div>
      <div className="userName">Sarthik Bhat</div>
      <Search color="var(--icon-text-clr-light)" size={20} />
      <MoreVertical color="var(--icon-text-clr-light)" size={20} />
    </div>
  );
}
