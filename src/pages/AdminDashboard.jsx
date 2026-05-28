import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc
} from "firebase/firestore";

import { db } from "../firebase";
import "../styles/dashboard.css";

function AdminDashboard() {
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

  const verifyReport = async (id) => {
    try {
      const reportRef = doc(db, "flood_reports", id);

      await updateDoc(reportRef, {
        status: "Verified"
      });

      alert("Report Verified");

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="dashboard">

      {/* NAVBAR */}

      <div className="navbar">
        <h2>FloodLink Admin</h2>

        <div className="nav-links">
          <a href="/admin">Dashboard</a>
          <a href="/">Logout</a>
        </div>
      </div>

      {/* ADMIN HEADER */}

      <div className="admin-header">
        <h1>FloodLink Control Center</h1>

        <p>
          Real-time barangay flood monitoring dashboard
        </p>
      </div>

      {/* ADMIN STATS */}

      <div className="admin-stats">

        <div className="admin-stat-card">
          <h2>{reports.length}</h2>
          <p>Total Reports</p>
        </div>

        <div className="admin-stat-card">
          <h2>3</h2>
          <p>Critical Areas</p>
        </div>

        <div className="admin-stat-card">
          <h2>12</h2>
          <p>Active Sensors</p>
        </div>

      </div>

      {/* ALERT CARDS */}

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

      {/* REPORTS */}

      <h2>Community Flood Reports</h2>

      {reports.length === 0 ? (

        <p>No reports yet.</p>

      ) : (

        reports.map((report) => (

          <div
            key={report.id}
            className="report-card"
          >

            <h3>{report.location}</h3>

            <p>
              <strong>Water Depth:</strong> {report.depth}
            </p>

            <p>
              <strong>Description:</strong> {report.description}
            </p>

            <p>
              <strong>Status:</strong> {report.status}
            </p>

            <br />

            <button
              onClick={() => verifyReport(report.id)}
            >
              Verify Report
            </button>

          </div>

        ))

      )}

    </div>
  );
}

export default AdminDashboard;
