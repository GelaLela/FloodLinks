import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";

function FloodMap() {
  return (
    <MapContainer
      center={[14.6760, 121.0437]}
      zoom={13}
      style={{
        height: "400px",
        width: "100%",
        borderRadius: "15px"
      }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Flood Area */}

      <Circle
        center={[14.6760, 121.0437]}
        radius={500}
        pathOptions={{
          color: "red",
          fillColor: "red",
          fillOpacity: 0.4
        }}
      />

      <Marker position={[14.6760, 121.0437]}>
        <Popup>
          Critical Flood Area
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default FloodMap;
