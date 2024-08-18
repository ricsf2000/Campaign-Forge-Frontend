import React from "react";
import "./Buttons.css"
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button className="login-position custom-button" onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;