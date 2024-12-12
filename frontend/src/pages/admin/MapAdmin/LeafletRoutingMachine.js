import React, { useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import axios from "axios";
import { useMap } from "react-leaflet";

const LeafletRoutingMachine = () => {
  const map = useMap();
  const [position, setPosition] = useState([]);

  let DefaultIcon = L.icon({
    iconUrl: "/marker-icon.png",
    iconSize: [25, 41],
  });

  const handleMapClick = async (e) => {
    const newPosition = [e.latlng.lat, e.latlng.lng];

    // Add marker to map
    L.marker(newPosition, { icon: DefaultIcon }).addTo(map);

    // Update the event's localisation in the database
    const eventId = "6445bbe7a39cd4c7d3831290"; // Replace with the actual event id
    try {
      await axios.put(`http://localhost:5000/events/${eventId}/localisation`, {
        localisation: newPosition,
      });
      console.log("Position saved successfully!");
    } catch (error) {
      console.error(error);
    }

    // Update state
    setPosition(newPosition);
  };

  map.on("click", handleMapClick);

  return null;
};

export default LeafletRoutingMachine;
