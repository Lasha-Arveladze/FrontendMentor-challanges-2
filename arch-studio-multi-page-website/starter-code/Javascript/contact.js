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

// Contact form Validation

const form = document.querySelector(".form");
const name = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");

const init = () => {
  name.value = "";
  email.value = "";
  message.value = "";
  document.querySelector(".nameError").style.display = "none";
  name.style.borderColor = "var(--color-Very-Dark-Blue)";
  name.classList.remove("error-placeholder");
  document.querySelector(".emailError").style.display = "none";
  email.style.borderColor = "var(--color-Very-Dark-Blue)";
  email.classList.remove("error-placeholder");
  document.querySelector(".messageError").style.display = "none";
  message.style.borderColor = "var(--color-Very-Dark-Blue)";
  message.classList.remove("error-placeholder");
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let errorCount = 0;

  if (name.value.trim().length < 2) {
    document.querySelector(".nameError").style.display = "block";
    name.style.borderColor = "var(--color-Red-Errors)";
    name.classList.add("error-placeholder");
    errorCount++;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email.value.trim())) {
    document.querySelector(".emailError").style.display = "block";
    email.style.borderColor = "var(--color-Red-Errors)";
    email.classList.add("error-placeholder");
    errorCount++;
  }

  if (message.value.trim().length < 10) {
    document.querySelector(".messageError").style.display = "block";
    message.style.borderColor = "var(--color-Red-Errors)";
    message.classList.add("error-placeholder");
    errorCount++;
  }

  if (errorCount === 0) {
    const alertBox = document.getElementById("successAlert");
    alertBox.classList.add("show");
    init();

    setTimeout(() => {
      alertBox.classList.remove("show");
    }, 3000);
  }
});
