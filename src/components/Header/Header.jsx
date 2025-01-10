import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import Taskimg from "../../assets/task_icon.svg";
import logoutimg from "../../assets/logout_icon.svg";
import listimg from "../../assets/list.svg";
import boardimg from "../../assets/boardimg.png";

const Header = ({ setView }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [activeView, setActiveView] = useState("list");

  const handleViewChange = (view) => {
    setActiveView(view);
    setView(view);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <header className="header">
        <div className="header-left">
          <h1 className="header-title" onClick={() => navigate("/")}>
            <img src={Taskimg} alt="" /> TaskBuddy
          </h1>
        </div>
        {isAuthenticated ? (
          <div className="header-right">
            <div className="user-info">
              <img
                src={user?.photoURL || "https://via.placeholder.com/40"}
                alt="User Avatar"
                className="user-avatar"
              />
              <span className="user-name">{user?.name || "User"}</span>
            </div>

            <button className="logout-button" onClick={handleLogout}>
              <img style={{ height: "16px" }} src={logoutimg} alt="" />
              Logout
            </button>
          </div>
        ) : (
          <button className="login-button" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </header>
      <div className="header-nav-link">
        {isAuthenticated && (
          <div className="header-nav">
            <button
              className={`nav-button ${activeView === "list" ? "active" : ""}`}
              onClick={() => handleViewChange("list")}
            >
              <img style={{ height: "16px" }} src={listimg} alt="" />
              List
            </button>
            <button
              className={`nav-button ${activeView === "board" ? "active" : ""}`}
              onClick={() => handleViewChange("board")}
            >
              <img style={{ height: "16px" }} src={boardimg} alt="" />
              Board
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
