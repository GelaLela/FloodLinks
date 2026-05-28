import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/dashboard.css";

function ReportFlood() {
  const [location, setLocation] = useState("");
  const [depth, setDepth] = useState("");
  const [description, setDescription] = useState("");

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

      setLocation("");
      setDepth("");
      setDescription("");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="dashboard">
      <h1>Community Flood Report</h1>

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
        value={location}
        onChange={(e) => setDepth(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Description"
        value={location}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br /><br />

      <button onClick={submitReport}>Submit Report</button>
    </div>
  );
}

export default ReportFlood;