import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

function ReportFlood() {
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const submitReport = async () => {
    try {
      await addDoc(collection(db, "flood_reports"), {
        location,
        description,
        status: "pending",
        createdAt: new Date()
      });

      alert("Flood Report Submitted");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Report Flood</h1>

      <input
        type="text"
        placeholder="Location"
        onChange={(e) => setLocation(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />

      <br /><br />

      <button onClick={submitReport}>Submit</button>
    </div>
  );
}

export default ReportFlood;