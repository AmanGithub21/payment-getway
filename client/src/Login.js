import axios from "axios";
import { useHistory } from "react-router-dom";

import useHandleChange from "./hooks/useHandleChange";
import "./css/Login.css";

function Login() {
  const history = useHistory();
  const [email, handleChangeEmail, handleResetEmail] = useHandleChange("");
  const [password, handleChangePassword, handleResetPassword] =
    useHandleChange("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.length || !password.length) {
      return alert("Fill all the entries");
    }
    const data = { email, password };
    const res = await axios.post(
      "https://payment-getway.herokuapp.com/login",
      data
    );
    if (res.data === "Logged In") {
      history.push("/home");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Username
        </label>
        <input
          className="form-control"
          type="text"
          id="email"
          placeholder="Email..."
          onChange={handleChangeEmail}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          className="form-control"
          type="password"
          id="password"
          placeholder="Password..."
          onChange={handleChangePassword}
        />
      </div>
      <button className="btn btn-outline-dark submit-button m-2" type="submit">
        Login
      </button>
    </form>
  );
}

export default Login;
