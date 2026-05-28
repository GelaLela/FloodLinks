import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import "../styles/dashboard.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginUser = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      if (email === "admin@floodlink.com") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h1>FloodLink Login</h1>

        <p>Real-time flood monitoring and community reporting</p>

        <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button onClick={loginUser}>Login</button>

        <div className="auth-footer">
            <Link to="/register">
            Create Account
            </Link>
        </div>
    </div>
    </div>
    
  );
}

export default Login;