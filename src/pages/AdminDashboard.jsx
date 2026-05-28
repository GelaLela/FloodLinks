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
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

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

      <div className="navbar">
        <h2>FloodLink Admin</h2>
      </div>

      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Monitor flood reports and emergency alerts</p>
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

      <h2>Community Flood Reports</h2>

      {reports.length === 0 ? (
        <p>No reports yet.</p>
      ) : (
        reports.map((report) => (
          <div key={report.id} className="report-card">

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

            <button onClick={() => verifyReport(report.id)}>
              Verify Report
            </button>

          </div>
        ))
      )}
    </div>
  );
}

export default AdminDashboard;
