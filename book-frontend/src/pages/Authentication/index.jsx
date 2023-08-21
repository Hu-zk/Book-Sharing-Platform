import React, { useState } from "react";
import "./style.css";
import Login from "../../components/authenticationForms/Login";
import Register from "../../components/authenticationForms/Register";


const Authentication = () => {
  const [login, setLogin] = useState(true);

  return (
    <div className="create-page-container">
      {login ? (
        <Login onToggle={() => setLogin(false)} />
      ) : (
        <Register onToggle={() => setLogin(true)} />
      )}
    </div>
  );
};

export default Authentication;
