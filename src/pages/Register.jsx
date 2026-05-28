import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

function Register() {
  const [name, setName] = useState("");
  const [barangay, setBarangay] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const registerUser = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", userCredential.user.uid), {
        name,
        barangay,
        email,
        role: "resident"
      });

      alert("Registered Successfully");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">
        <div className="auth-card">

            <h1>Create Account</h1>

            <p>Join FloodLink to report and monitor flood incidents in your community</p>

            <input
                type="text"
                placeholder="Full Name"
                onChange={(e) => setName(e.target.value)}
            />

            <br /><br />

            <select onChange={(e) => setBarangay(e.target.value)}>
                <option>Select Barangay</option>
                <option>Arias</option>
                <option>Isabang</option>
                <option>Domoit</option>
                <option>Sariaya</option>
            </select>

            <br /><br />

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

            <button onClick={registerUser}>Register</button>

            <div className="auth-footer">
                <Link to="/">Back to login</Link>
            </div>
        </div>
    </div>
  );
}

export default Register;