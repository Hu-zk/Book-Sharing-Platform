import React, { useState } from "react";
import { sendRequest } from "../../../core/config/request";
import { requestMethods } from "../../../core/enums/requestMethods";
import { localStorageAction } from "../../../core/config/localstorage";
import "./style.css";
import { useNavigate } from "react-router-dom";

function Login({onToggle}) {
  const navigation = useNavigate();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');


  const handleLogin = async (event) => {
    event.preventDefault();
    localStorage.clear();

    if ( !password || !email) {
      setError('All fields are required');
      return;
  }


    try {
      const response = await sendRequest({
        method: requestMethods.POST,
        route: "/guest/login",
        body:{
          email,
          password,
        }
      });
      console.log(response)
      const data = response.user;
      const token = response.user.token;

      localStorageAction("access_token", token);
      localStorage.setItem("userData", JSON.stringify(data));
      navigation("/user");
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="create-form-container">
        <div className="form-header">
            <h1>
                Login
            </h1>
        </div>

        <form className="create-form ">

                <div className="label-input">
                    <label htmlFor="email">Email </label>
                    <input id="email" name="email" type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div className="label-input">
                    <label htmlFor="password">Password </label>
                    <input id="password" name="password" type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>

                {error && <p className="error-message">{error}</p>}


            <button className='black-button' type="submit" onClick={handleLogin}>Login</button>
        </form>


        <div className="bottom-form">
            <p>Don't have an account?</p>
            <span className='create-toggle' onClick={() => onToggle(false)}>Register</span>
        </div>
    </div>
)
}

export default Login;
