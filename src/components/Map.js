import { React } from "react";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";

export default function Map(props) {
  return (
    <div>
      <MapContainer
        className="map"
        center={[props.lat, props.long]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[props.lat, props.long]}>
          <Popup>The location you selected</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
