import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

function Dashboard() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "flood_reports"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setReports(data);
    });

    return () => unsub();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>FloodLink Resident Dashboard</h1>

      <div
        style={{
          backgroundColor: "orange",
          color: "white",
          padding: 20,
          width: 250,
          borderRadius: 10
        }}
      >
        <h2>WARNING</h2>
        <p>Water Level Rising</p>
      </div>

      <br />

      <Link to="/report">
        <button>Report Flood</button>
      </Link>

      <br /><br />

      <h2>Community Reports</h2>

      {reports.map((report) => (
        <div
          key={report.id}
          style={{
            border: "1px solid gray",
            padding: 10,
            marginBottom: 10
          }}
        >
          <h3>{report.location}</h3>
          <p>{report.description}</p>
          <p>Status: {report.status}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;