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

async function showPosition(position) {
  let mapPosition = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }
  fetch("/location", options).then(console.log(response));
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

  const listToiletEndpoint = new URL("http://localhost:3000/toilet");
  const response = await fetch(listToiletEndpoint);
  const toiletList = await response.json();
  let markers = [];

  toiletList.forEach((element) => {
    let marker = new google.maps.Marker({
      position: {
        lat: +element.Latitude.replace(",", "."),
        lng: +element.Longitude.replace(",", ".")
      },
      map,
      title: element.Description,
    });
    markers.push(marker)
  });


  const markerCluster = new markerClusterer.MarkerClusterer({
    map,
    markers
  });

}