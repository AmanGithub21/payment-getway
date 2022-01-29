import axios from "axios";
import useHandleChange from "./hooks/useHandleChange";

import "./css/Signup.css";

function Signup() {
  const [email, handleChangeEmail, handleResetEmail] = useHandleChange("");
  const [password, handleChangePassword, handleResetPassword] =
    useHandleChange("");
  const [repassword, handleChangeRePassword, handleResetRePassword] =
    useHandleChange("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.length || !password.length || !repassword.length) {
      return alert("Fill all the entries");
    }
    if (password !== repassword) {
      return alert("Rewrite same password");
    }
    const data = { email, password };
    await axios.post("https://payment-getway.herokuapp.com/signup", data);
    alert("Verification mail sent.");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <label htmlFor="email" className="form-label">
          Username
        </label>
        <input
          className="form-control"
          type="text"
          id="email"
          placeholder="Email..."
          value={email}
          onChange={handleChangeEmail}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          className="form-control"
          type="password"
          id="password"
          placeholder="Password..."
          value={password}
          onChange={handleChangePassword}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="password" className="form-label">
          Rewrite Password
        </label>
        <input
          className="form-control"
          type="password"
          id="repassword"
          placeholder="Rewrite Password..."
          value={repassword}
          onChange={handleChangeRePassword}
        />
      </div>
      <button className="btn btn-outline-dark submit-button m-2" type="submit">
        Signup
      </button>
    </form>
  );
}

export default Signup;
