import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./LoginButton.scss";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button className="login" onClick={() => loginWithRedirect()}>
      Login
    </button>
  );
};

export default LoginButton;
