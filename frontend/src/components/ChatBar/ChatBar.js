import React, { useContext, useEffect, useState } from "react";
import "./ChatBar.css";
import ChatBarHeader from "../ChatBarHeader/ChatBarHeader";
import { ListFilter, PlusCircleIcon, Search } from "lucide-react";
import dp from "../../assets/images/dp.jpg";
import { UserSelectContext } from "../../Context";
import axios from "axios";
import toast from "react-hot-toast";

export default function ChatBar() {
  const selectUserContext = useContext(UserSelectContext);
  const [loading, setloading] = useState(true);
  const [users, setusers] = useState([]);
  const [foundUsers, setfoundUsers] = useState([]);
  const [search, setsearch] = useState("");

  const selectUser = (userName) => {
    selectUserContext.change(userName);
  };

  useEffect(() => {
    setloading(true);
    const handleChange = setTimeout(() => {
      axios
        .post("http://localhost:5000/REST/findUsers", {
          userName: sessionStorage.getItem("user"),
          search: search,
        })
        .then(({ data }) => {
          setfoundUsers(data);
        })
        .catch((e) => {
          toast.error(e.response.data.message);
        })
        .finally(() => setloading(false));
    }, 1000);

    return () => clearTimeout(handleChange);
  }, [search]);

  useEffect(() => {
    axios
      .post("http://localhost:5000/REST/friends", {
        userName: sessionStorage.getItem("user"),
      })
      .then(({ data }) => {
        setusers(data);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      })
      .finally(() => setloading(false));
  }, []);

  const addFriend = (add) => {
    setloading(true);
    axios
      .post("http://localhost:5000/REST/addFriend", {
        userName: sessionStorage.getItem("user"),
        add,
      })
      .then(({ data }) => {
        setusers(data);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      })
      .finally(() => setloading(false));
  };

  const Msgs = [
    "hey there, how are you",
    "hey there, Whats Up!!",
    "hey there",
    "Sup?",
    "kya haal hai?",
    "Bhai idhar bhi dekhle",
  ];

  return (
    <React.Fragment>
      {loading && <div className="loader">Loading...</div>}
      <div
        style={{
          flex: 0.3,
          borderRight: "1px solid #e9edef1f",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ChatBarHeader />
        <div style={{ flex: 1, height: "10%" }}>
          <div className="filterContainer">
            <Search
              color="var(--icon-text-clr-light)"
              size={15}
              className="searchIcon"
            />
            <input
              type="text"
              placeholder="Search or start a new chat"
              className="searchInput"
              onChange={(e) => setsearch(e.target.value)}
            />
            <ListFilter size={20} color="var(--icon-text-clr-light)" />
          </div>
          <div className="chatContainer">
            {(!!search.trim().length ? foundUsers : users).length === 0 ? (
              <div style={{ fontSize: "1rem", color: "var(--text-clr-light)" }}>
                {!!search.trim().length
                  ? "No records found"
                  : " Oops!!, please add some friends"}
              </div>
            ) : (
              (!!search.trim().length ? foundUsers : users).map(
                (elm, index) => {
                  return (
                    <div
                      className="Chat"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        !!search.trim().length
                          ? addFriend(elm)
                          : selectUser(elm.userName)
                      }
                      key={index}
                    >
                      <div className="userProfileChatBar">
                        <img src={dp} alt="dp"></img>
                      </div>
                      <div className="messagesandtime">
                        <div
                          style={
                            !!search.trim().length
                              ? { justifyContent: "center" }
                              : {}
                          }
                          className="messages"
                        >
                          <span className={`name${elm.active ? " f-500" : ""}`}>
                            {elm.userName}
                          </span>
                          {!search.trim().length && (
                            <span
                              className={`msg${elm.active ? " f-500" : ""}`}
                            >
                              {Msgs[index]}
                            </span>
                          )}
                        </div>
                        {!search.trim().length && (
                          <div
                            className={`timeandother${
                              elm.active ? " active" : ""
                            }`}
                          >
                            <span className="time">7:34 Pm</span>
                            {elm?.unreadCount > 0 && (
                              <span className="unread">1</span>
                            )}
                          </div>
                        )}
                        {!!search.trim().length && (
                          <div className="addFriends">
                            <PlusCircleIcon
                              style={{ marginTop: "1px" }}
                              size={28}
                              color="var(--icon-text-clr-light)"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }
              )
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
