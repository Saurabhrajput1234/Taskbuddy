import React from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../services/Firebase";
import "./LoginPage.css";
import GoogleSvg from "../../assets/icons8-google.svg";
import TaskViewimg from "../../assets/Taskview.svg";
import Taskimg from '../../assets/Vector.png';


const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      dispatch(
        loginSuccess({
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        })
      );

      navigate("/");
    } catch (error) {
      console.error("Google login failed:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-page">
    <div className="login-box">
    <div style={{display:"flex"}} className="Task-heading">
    <img style={{height:"30px",color: '#7B1984'}} src={Taskimg} alt="" /> 
    <h2 style={{color: '#7B1984'
}}>TaskBuddy</h2>
    </div>
      
      <p className="text-login">Streamline your workflow and track progress effortlessly with our all-in-one task management app.</p>
      <button className="google-login-button" onClick={handleLogin}>
      <img id="googlelogo" src={GoogleSvg} alt="Google" />
        Continue with Google
      </button>
    </div>
    <div className="login-back">
      
      <img id="TaskView" src={TaskViewimg} alt="" />
    </div>
    </div>
  );
};

export default LoginPage;
