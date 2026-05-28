import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

function ReportFlood() {
  const [location, setLocation] = useState("");
  const [depth, setDepth] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const submitReport = async () => {
    try {
      await addDoc(collection(db, "flood_reports"), {
        location,
        depth,
        description,
        status: "Pending Verification",
        createdAt: new Date()
      });

      alert("Flood Report Submitted");

      // CLEAR INPUTS
      setLocation("");
      setDepth("");
      setDescription("");

      // REDIRECT TO DASHBOARD
      navigate("/dashboard");

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="dashboard">
      <div className="navbar">
        <h2>FloodLink</h2>

        <div className="nav-links">
          <Link to="/dashboard">Back</Link>
        </div>
      </div>

      <div className="dashboard-header">
        <h1>Community Flood Report</h1>
        <p>Submit flood incidents in your barangay</p>
      </div>

      <div className="report-card">

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <br /><br />

        <input
          type="text"
          placeholder="Water Depth"
          value={depth}
          onChange={(e) => setDepth(e.target.value)}
        />

        <br /><br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br /><br />

        <button onClick={submitReport}>
          Submit Report
        </button>

      </div>
    </div>
  );
}

export default ReportFlood;
