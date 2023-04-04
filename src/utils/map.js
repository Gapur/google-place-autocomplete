// Load the Google Maps JavaScript API asynchronously
export const loadMapScript = (callback) => {
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCtABEXRCga9WoTi_pQ3d8lvvRJXlQ-T9o&libraries=places`;
  script.async = true;
  script.defer = true;
  script.addEventListener("load", callback);
  document.head.appendChild(script);
};

// Initialize the Google Maps map
export const initMap = (mapElement, options) => {
  return new window.google.maps.Map(mapElement, options);
};
