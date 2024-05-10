import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import logo from "../../assets/images/WhatsApp.webp";
import { MoveRight } from "lucide-react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LoginContext } from "../../Context";

export default function Login() {
  const navigate = useNavigate();
  const [body, setbody] = useState({ userName: "", password: "" });
  const [loading, setloading] = useState(false);

  const auth = useContext(LoginContext);

  useEffect(() => {}, [navigate]);

  const handleInput = async (e) => {
    setbody({ ...body, [e.target.name]: e.target.value });
  };

  const login = () => {
    setloading(true);
    axios
      .post("http://localhost:5000/REST/login", body)
      .then(({ data }) => {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("user", data.user);
        navigate("/");
        auth.loginStatus();
        toast.success("Logged in successfully");
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      })
      .finally(() => setloading(false));
  };

  const navigateFunction = () => {
    navigate("/register");
  };

  return (
    <React.Fragment>
      {auth.loggedIn ? (
        <Navigate to="/" replace />
      ) : (
        <React.Fragment>
          {loading && <div className="loader">Loading...</div>}
          <div className="formContainer">
            <div className="logo">
              <img src={logo} alt="logo"></img>
              <div className="header-intro-container">
                <div className="header">Socially - A WhatsApp Web Clone</div>
                <div className="intro">
                  Send and receive messages but keep keep your phone online.
                  <br />
                  Cannot Use WhatsApp on up to 4 linked devices and 1 phone at
                  the same time as it is just a clone.
                </div>
              </div>
            </div>
            <div className="loginContainer">
              <h2>Welcome Back !!</h2>
              <form className="form">
                <div className="formField">
                  <input
                    type="text"
                    id="name"
                    onChange={handleInput}
                    value={body.userName}
                    name="userName"
                    placeholder="Username"
                  />
                  <label htmlFor="name">Username</label>
                </div>
                <div className="formField">
                  <input
                    id="password"
                    type="password"
                    onChange={handleInput}
                    value={body.password}
                    name="password"
                    placeholder="Password"
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <button type="button" onClick={login} name="login">
                  Login
                  <MoveRight
                    style={{ marginTop: "1px" }}
                    size={20}
                    strokeWidth={3}
                    color="var(--text-clr"
                  />
                </button>
              </form>
              <div className="signUp">
                Don't have an account?{" "}
                <span onClick={navigateFunction}> Sign Up</span>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
