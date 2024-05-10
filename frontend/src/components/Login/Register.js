import React, { useContext, useState } from "react";
import "./Login.css";
import logo from "../../assets/images/WhatsApp.webp";
import { MoveRight } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { LoginContext } from "../../Context";

export default function Register() {
  const navigate = useNavigate();
  const [body, setbody] = useState({ userName: "", password: "" });
  const [loading, setloading] = useState(false);

  const auth = useContext(LoginContext);

  const handleInput = async (e) => {
    setbody({ ...body, [e.target.name]: e.target.value });
  };

  const navigateFunction = () => {
    navigate("/login");
  };

  const register = () => {
    setloading(true);
    axios
      .post("http://localhost:5000/REST/register", body)
      .then(({ data }) => {
        sessionStorage.setItem("token", data.token);
        navigate("/");
        auth.loginStatus();
        toast.success("User created, logged in successfully");
      })
      .catch((e) => {
        let message = "";
        if (e.response.data.message) message = e.response.data.message;
        else {
          Object.entries(e.response?.data).forEach((key) => {
            message += key[1] + "\n";
          });
        }
        toast.error(message, { style: { textAlign: "left" } });
      })
      .finally(() => setloading(false));
  };

  return (
    <React.Fragment>
      {auth.isLoggedin ? (
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
              <h2>Create New Account</h2>
              <form className="form">
              <div className="formField">
                <input
                  type="email"
                  onChange={handleInput}
                  name="email"
                  placeholder="Email"
                  id="email"
                />
                <label htmlFor="email">Email</label>
                </div>
                <div className="formField">
                <input
                  type="text"
                  onChange={handleInput}
                  name="userName"
                  placeholder="Username"
                  id="name"
                />
                <label htmlFor="name">Username</label>
                </div>
                <div className="formField">
                <input
                  type="password"
                  onChange={handleInput}
                  name="password"
                  placeholder="Password"
                  id="password"
                />
                <label htmlFor="password">Password</label>
                </div>
                <button type="button" onClick={register} name="register">
                  Create Account
                  <MoveRight
                    style={{ marginTop: "1px" }}
                    size={20}
                    strokeWidth={3}
                    color="var(--text-clr"
                  />
                </button>
              </form>
              <div className="signUp">
                Already have an account?{" "}
                <span onClick={navigateFunction}> Login</span>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
