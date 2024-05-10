import React, { useContext } from "react";
import "./ChatBarHeader.css";
import dp from "../../assets/images/dp.jpg";
import {
  CircleDotDashed,
  MessageSquarePlus,
  MoreVertical,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LoginContext, UserSelectContext } from "../../Context";

export default function ChatBarHeader() {
  const navigate = useNavigate();
  const auth = useContext(LoginContext);
  const userSelected = useContext(UserSelectContext);

  const logout = () => {
    sessionStorage.removeItem("token");
    auth.loginStatus();
    userSelected.change(null)
    navigate("/login");
  };
  return (
    <div style={{ background: "var(--light-clr)" }} className="chatBarHeader">
      <div className="userProfile">
        <img onClick={logout} src={dp} alt="dp"></img>
      </div>
      <div style={{ flex: 1 }}></div>
      <Users color="var(--icon-text-clr-light)" size={20} />
      <CircleDotDashed size={20} color="var(--icon-text-clr-light)" />
      <MessageSquarePlus size={20} color="var(--icon-text-clr-light)" />
      <MoreVertical color="var(--icon-text-clr-light)" size={20} />
    </div>
  );
}
