import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc
} from "firebase/firestore";

import { db } from "../firebase";

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
    <div
      style={{
        padding: 20,
        fontFamily: "Arial"
      }}
    >
      <h1>FloodLink Admin Dashboard</h1>

      {/* ALERT STATUS CARDS */}

      <div
        style={{
          display: "flex",
          gap: 20,
          marginTop: 20,
          marginBottom: 30,
          flexWrap: "wrap"
        }}
      >
        <div
          style={{
            backgroundColor: "red",
            color: "white",
            padding: 20,
            borderRadius: 10,
            width: 200
          }}
        >
          <h2>Danger</h2>
          <p>Critical Flood Risk</p>
        </div>

        <div
          style={{
            backgroundColor: "orange",
            color: "white",
            padding: 20,
            borderRadius: 10,
            width: 200
          }}
        >
          <h2>Warning</h2>
          <p>Water Level Rising</p>
        </div>

        <div
          style={{
            backgroundColor: "green",
            color: "white",
            padding: 20,
            borderRadius: 10,
            width: 200
          }}
        >
          <h2>Safe</h2>
          <p>No Flood Detected</p>
        </div>
      </div>

      {/* REPORTS SECTION */}

      <h2>Community Flood Reports</h2>

      {reports.length === 0 ? (
        <p>No reports yet.</p>
      ) : (
        reports.map((report) => (
          <div
            key={report.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: 10,
              padding: 15,
              marginBottom: 15
            }}
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

            <button
              onClick={() => verifyReport(report.id)}
              style={{
                backgroundColor: "blue",
                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: 5,
                cursor: "pointer"
              }}
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
