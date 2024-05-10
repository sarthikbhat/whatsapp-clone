import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import toast, { Toaster } from "react-hot-toast";
import { LoginContext, UserSelectContext } from "./Context";
import { io } from "socket.io-client";


function App() {
  // const URL = "http://localhost:5000";
  let socket;
  // useEffect(() => {
  //   socket = io(URL, {autoConnect:true})
  //   console.log(socket);
  //   socket.on("connect_error", (err) => {
  //     console.log(err);
  //     if (err.message) {
  //       toast.error(err.message);
  //     }
  //   });
  // }, [])
  

  const toastOptions = {
    error: {
      style: {
        background: "#D8000C",
        color: "white",
      },
      iconTheme: {
        primary: "#ffffff",
        secondary: "#D8000C",
      },
    },
    success: {
      style: {
        background: "#4F8A10",
        color: "white",
      },
      iconTheme: {
        primary: "#ffffff",
        secondary: "#4F8A10",
      },
    },
  };
  const auth = useContext(LoginContext);
  const [authstatus, setauthstatus] = useState(auth.loggedIn);
  const [userSelected, setuserSelected] = useState(null);

  const loginStatus = () => {
    setauthstatus((prev) => !prev);
  };

  const selectUser = (userName) => {
    setuserSelected(userName);
  };

  return (
    <LoginContext.Provider
      value={{ loggedIn: authstatus, loginStatus: loginStatus }}
    >
      <BrowserRouter>
        <div className="App dFlexAlignCenterJustifyCenter">
          <div className="dFlex container">
            <UserSelectContext.Provider
              value={{ value: userSelected, change: selectUser }}
            >
              <Routes>
                <Route path="/" element={<Main socket={socket} />}  />
                <Route path="/register" Component={Register} />
                <Route path="/login" Component={Login} />
              </Routes>
            </UserSelectContext.Provider>
          </div>
          <Toaster
            position="bottom-right"
            toastOptions={toastOptions}
            reverseOrder={false}
          />
        </div>
      </BrowserRouter>
    </LoginContext.Provider>
  );
}

export default App;
