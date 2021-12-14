import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import EMButton from "../UI/button/EMButton";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <EMButton onClick={() => loginWithRedirect()}>Log In</EMButton>;
};

export default LoginButton;