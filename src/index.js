import L from "leaflet";
import "leaflet/dist/leaflet.css";
import ua_dnipro_poweline from "./ua_dnipro_poweline.json";

const map = L.map("map").setView([48.465493, 35.006522], 8);

L.tileLayer("https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png").addTo(map);

L.geoJSON(ua_dnipro_poweline, {
  style: (feature) => ({
    color: getLineColor(feature.properties?.voltage),
    weight: getLineWeight(feature.properties?.voltage)
  })
}).addTo(map);

function getLineColor(voltage) {
  const mapColor = {
    "35000": "blue",
    "150000": "green",
    "330000": "yellow",
    "750000": "red"
  };
  return mapColor[voltage] || "black";
}

function getLineWeight(voltage) {
  const lineWeight = {
    "35000": 1,
    "150000": 2,
    "330000": 3,
    "750000": 4
  };
  return lineWeight[voltage] || 5;
}

console.log(
  ua_dnipro_poweline.features.reduce((acc, current) => {
    if (acc.hasOwnProperty(current.properties.voltage)) {
      return {
        ...acc,
        [current.properties.voltage]: ++acc[current.properties.voltage]
      };
    }
    return { ...acc, [current.properties.voltage]: 0 };
  }, {})
);
