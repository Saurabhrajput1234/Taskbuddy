import { signOut } from "firebase/auth";
import { auth } from "../../services/Firebase";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";

// Auth Action Creators
export const loginSuccess = (userData) => (dispatch) => {
  dispatch({ type: LOGIN_SUCCESS, payload: userData });
};

export const logout = () => async (dispatch) => {
  try {
    await signOut(auth);

    dispatch({ type: LOGOUT });
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
