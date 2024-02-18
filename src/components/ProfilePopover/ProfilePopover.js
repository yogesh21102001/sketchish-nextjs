import React, { useContext } from "react";
import "./style.css";
import AuthContext from "../../context/AuthProvider";
import { Link } from "react-router-dom";

function ProfilePopover({ setOpen, location }) {
  const { setAuth } = useContext(AuthContext);
  function handleLogout() {
    localStorage.removeItem("user");
    setAuth({});
  }

  const handleClose = () => setOpen(false);

  return (
    <div className="popover-container p-c-margin-right">
      <Link to="/profile" className="p-i-link">
        <div
          className={`popover-items ${
            location && location === "/profile" ? "disabled" : ""
          }`}
          onClick={handleClose}
        >
          Profile
        </div>
      </Link>
      <Link to="/" className="p-i-link">
        <div className="popover-items" onClick={handleLogout}>
          Log Out
        </div>
      </Link>
    </div>
  );
}

export default ProfilePopover;
