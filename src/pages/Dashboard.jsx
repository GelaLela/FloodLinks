import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "water_levels", "san_juan"),
      (doc) => {
        setData(doc.data());
      }
    );

    return () => unsub();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>FloodLink Dashboard</h1>

      {data && (
        <div>
          <h2>Barangay: {data.barangay}</h2>
          <h2>Water Level: {data.level} cm</h2>
          <h2>Status: {data.status}</h2>
        </div>
      )}
    </div>
  );
}

export default Dashboard;