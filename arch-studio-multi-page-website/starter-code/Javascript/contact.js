import * as L from "../../node_modules/leaflet/dist/leaflet-src.esm.js";

// Create a clean black teardrop marker with white circle inside
const customIcon = L.divIcon({
  className: "custom-marker",
  html: `
    <div style="
      position: relative;
      width: 40px;
      height: 50px;
    ">
      <div style="
        width: 40px;
        height: 40px;
        background-color: #000000;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
      "></div>
      <div style="
        position: absolute;
        top: 12px;
        left: 12px;
        width: 16px;
        height: 16px;
        background-color: white;
        border-radius: 50%;
      "></div>
    </div>
  `,
  iconSize: [40, 50],
  iconAnchor: [20, 50],
  popupAnchor: [0, -50],
});

// Fix default icon fallback
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const map = L.map("map");

// Add tile layer
L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
  {
    attribution: "© OpenStreetMap contributors, Tiles style by CartoDB",
  }
).addTo(map);

// Add both markers
const marker1 = L.marker([35.952461, -83.991531], { icon: customIcon }).addTo(
  map
);
const marker2 = L.marker([29.89743, -97.827507], { icon: customIcon }).addTo(
  map
);

// Fit the map view to both markers
const bounds = L.latLngBounds([35.952461, -83.991531], [29.89743, -97.827507]);
map.fitBounds(bounds, { maxZoom: 10 });
