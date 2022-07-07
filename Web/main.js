let map;
let toiletList;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: 52.522,
      lng: 13.4133,
    },
    zoom: 13,
  });
  getLocation();
}

window.initMap = initMap;

function getLocation() {
  if (navigator.geolocation) {
    let options = {
      enableHighAccuracy: true,
    };
    navigator.geolocation.watchPosition(showPosition, error, options);
  }
}

function error(err) {
  console.warn("ERROR(" + err.code + "): " + err.message);
}

async function showPosition(position) {
  drawCurrentLocation(position);

  const listToiletEndpoint = new URL("http://localhost:3000/toilet");
  const response = await fetch(listToiletEndpoint);
  toiletList = await response.json();
  let markers = drawMarkers();

  const markerCluster = new markerClusterer.MarkerClusterer({
    map,
    markers,
  });
}

function drawCurrentLocation(position) {
  let mapPosition = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
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
      fillColor: "#5384ED",
      strokeColor: "#ffffff",
    },
  });
}

function drawMarkers() {
  let markers = [];
  toiletList.forEach((element) => {
    let marker = new google.maps.Marker({
      position: {
        lat: +element.Latitude.replace(",", "."),
        lng: +element.Longitude.replace(",", "."),
      },
      map,
      title: element.Description,
    });
    markers.push(marker);
  });
  return markers;
}

function showToiletList() {
  let cardHTML = "";
  let numCallbackRuns = 0;

  toiletList.forEach((element) => {
    let toiletType;
    if (element.isOwnedByWall === "Yes") {
      toiletType = "public toilet";
    } else {
      toiletType = "private toilet";
    }

    let toiletPrice;
    if (element.Price === "0,00") {
      toiletPrice = "Free";
    } else {
      toiletPrice = `Paid ${element.Price} euro`;
    }

    cardHTML += `
  <div class="card" onclick="showToiletDetalis(${numCallbackRuns})">
  <div class="card-horizontal">
    <div class="img-square-wrapper">
      <img
        class=""
        src="http://via.placeholder.com/300x180"
        alt="toilet image"
      />
    </div>
    <div class="card-body">
      <h4 class="card-title">${element.Description}</h4>
      <p class="card-text">
        ${toiletType}
        ${toiletPrice}
      </p>
    </div>
  </div>
</div>`;
    numCallbackRuns++;
  });
  document.getElementById("list-wrapper").innerHTML = cardHTML;
}

function showToiletDetalis(index) {
  alert(`you clicked on ${toiletList[index].Description}`);
}

window.showToiletList = showToiletList;
window.showToiletDetalis = showToiletDetalis;
