let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: 52.5220,
      lng: 13.4133
    },
    zoom: 13,
  });
  getLocation()




}

window.initMap = initMap;

function getLocation() {
  if (navigator.geolocation) {
    let options = {
      enableHighAccuracy: true
    };
    navigator.geolocation.watchPosition(showPosition, error, options);
  }
}

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
}



function showPosition(position) {
  let mapPosition = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };
  map.setCenter(mapPosition);
  new google.maps.Marker({
    position: mapPosition,
    map,
    title: "Hello World!",
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 10,
      fillOpacity: 1,
      strokeWeight: 2,
      fillColor: '#5384ED',
      strokeColor: '#ffffff',
    },
  });

  let markers = [];

  let marker1 = new google.maps.Marker({
    position: {
      lat: 52.51950268923511,
      lng: 13.257165884213851
    },
    map,
    title: "Random location1!",

  });
  markers.push(marker1)
  let marker2 = new google.maps.Marker({
    position: {
      lat: 52.51864746001577,
      lng: 13.25715515537783
    },
    map,
    title: "Random location2!",
  });
  markers.push(marker2)
  const markerCluster = new markerClusterer.MarkerClusterer({ map, markers });

}
