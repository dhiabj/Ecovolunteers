import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L from "leaflet";
import "./mapevent.css";
import LeafletGeocoder from "./LeafletGeocoder";
import LeafletRoutingMachine from "./LeafletRoutingMachine";

function Mapevent() {
  const position = [36.8065, 10.1815];

  let DefaultIcon = L.icon({
    iconUrl: process.env.PUBLIC_URL + "/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -35],
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  return (
    <div className="mapevent">
      <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
          <LeafletGeocoder />
          <LeafletRoutingMachine />
      </MapContainer>
    </div>
  );
}

export default Mapevent;
