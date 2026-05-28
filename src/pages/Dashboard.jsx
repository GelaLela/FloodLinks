import FloodMap from "../components/FloodMap";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import "../styles/dashboard.css";

function Dashboard() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "flood_reports"), (snapshot) => {
      const data = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      .reverse();

      setReports(data);
    });

    return () => unsub();
  }, []);

  return (
    <div className="dashboard">

      <div className="navbar">
        <h2>FloodLink</h2>

        <div className="nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/report">Report</Link>
        </div>
      </div>

      <div className="dashboard-header">
        <h1>Resident Dashboard</h1>
        <p>Real-time flood monitoring and alerts</p>
      </div>

      <div className="weather-card">
        <h2>Heavy Rainfall Warning</h2>
        <p>Possible flooding in low-lying barangays.</p>
      </div>

      <div className="alert-container">

        <div className="alert-card danger">
          <h2>Danger</h2>
          <p>Critical Flood Risk</p>
        </div>

        <div className="alert-card warning">
          <h2>Warning</h2>
          <p>Water Level Rising</p>
        </div>

        <div className="alert-card safe">
          <h2>Safe</h2>
          <p>No Flood Detected</p>
        </div>

      </div>

      <Link to="/report">
        <button>Report Flood</button>
      </Link>

      <br /><br />

      <h2>Community Reports</h2>

      {reports.map((report) => (
        <div key={report.id} className="report-card">
          <h3>{report.location}</h3>

          <p>
            <strong>Water Depth:</strong> {report.depth}
          </p>

          <p>{report.description}</p>

          <p>
            <strong>Status:</strong> {report.status}
          </p>
        </div>
      ))}

      <div className="map-container">
        <h2>Flood Map</h2>
        <FloodMap />
      </div>

    </div>
  );
}

export default Dashboard;
