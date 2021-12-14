import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import EMButton from "../UI/button/EMButton";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <EMButton onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </EMButton>
  );
};

export default LogoutButton;