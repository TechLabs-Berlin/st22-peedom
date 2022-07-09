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

  new markerClusterer.MarkerClusterer({
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
    title: "you are here!",
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
  let closeListIcon = document.getElementById("close-list");
  closeListIcon.classList.remove("hidden");
  closeListIcon.classList.add("active-icon");

  let listButton = document.getElementById("list-button");
  listButton.classList.add("active-map-button");

  let cardHTML = "<div id='cards-wrapper' class='scrollbar scrollbar-primary'>";

  toiletList.forEach((element) => {
    if (element.isOwnedByWall === "Yes") {
      element.toiletType = "public toilet";
    } else {
      element.toiletType = "private toilet";
    }

    if (element.Price === "0,00") {
      element.toiletPrice = "Free";
    } else {
      element.toiletPrice = `Paid ${element.Price} euro`;
    }

    cardHTML += `
        <div class="card" onclick='showToiletDetalis(${JSON.stringify(
          element
        )})'>
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
              ${element.toiletType}
              ${element.toiletPrice}
            </p>
          </div>
        </div>
      </div>`;
  });

  cardHTML += "</div>";
  document.getElementById("list-wrapper").innerHTML = cardHTML;
}

function showToiletDetalis(toilet) {
  document.body.innerHTML += `
  <div id="toilet-details" class="card">
    <i class="fa-solid fa-xmark fa-2x" onclick="closeToiletDetails()"></i>
    <img class="card-img-top" src="http://via.placeholder.com/300x180" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${toilet.Description}</h5>
      <p class="card-text">${toilet.Street}</p>
      <div>
        <span class="badge badge-pill">${toilet.toiletPrice}</span>
        <span class="badge badge-pill">${toilet.toiletType}</span>
      </div>
      <a href="#" class="btn map-button" onclick='showToiletReviews(${JSON.stringify(
        toilet
      )})'>Show reviews</a>
    </div>
  </div>
  `;
}

function showToiletReviews(toilet) {
  let detailsCard = document.getElementById("toilet-details");
  detailsCard.classList.add("hidden");

  document.body.innerHTML += `
  <div id="toilet-reviews" class="card">
    <div class="card-icons">
      <i class="fa-solid fa-arrow-left fa-2x" onclick='goBack("toilet-reviews", "toilet-details")'></i>
      <i class="fa-solid fa-xmark fa-2x" onclick="closeToiletReviews()"></i>
    </div>
    <div class="card-body">
      <h5 class="card-title">Reviews</h5>
      <p class="card-text">${toilet.reviews || "No reviews."}</p>
      <a href="#" class="btn map-button" onclick='showAddReviewCard(${JSON.stringify(
        toilet._id
      )})'>Add review</a>
    </div>
  </div>
  `;
}

function showAddReviewCard(id) {
  let reviewsCard = document.getElementById("toilet-reviews");
  reviewsCard.classList.add("hidden");

  document.body.innerHTML += `
  <div id="toilet-add-review" class="card">
    <div class="card-icons">
      <i class="fa-solid fa-arrow-left fa-2x" onclick='goBack("toilet-add-review", "toilet-reviews")'></i>
      <i class="fa-solid fa-xmark fa-2x" onclick="closeAddReviewCard()"></i>
    </div>
    <div class="card-body">
      <form id="reviewForm">
        <textarea name="reviewText" class="reviewTextBox"></textarea><br>
        <input class="btn map-button" type="button" onclick='submitReview(this.form, ${JSON.stringify(
          id
        )})' value="Add Review">
      </form>
    </div>
  </div>
  `;
}

function submitReview(form, id) {
  let reviewsCard = document.getElementById("toilet-add-review");
  reviewsCard.classList.add("hidden");

  // call backend here to add comment

  closeAddReviewCard();
}

function closeList() {
  let closeListIcon = document.getElementById("close-list");
  closeListIcon.classList.remove("active-icon");
  closeListIcon.classList.add("hidden");

  let cardsWrapper = document.getElementById("cards-wrapper");
  cardsWrapper.classList.add("hidden");

  let listButton = document.getElementById("list-button");
  listButton.classList.remove("active-map-button");
  listButton.blur();
}

function closeToiletDetails() {
  let toiletDetalis = document.getElementById("toilet-details");
  if (toiletDetalis != null) document.body.removeChild(toiletDetalis);
}

function closeToiletReviews() {
  closeToiletDetails();
  let toiletReviews = document.getElementById("toilet-reviews");
  if (toiletReviews != null) document.body.removeChild(toiletReviews);
}

function closeAddReviewCard() {
  closeToiletReviews();
  closeToiletDetails();
  let toiletAddReview = document.getElementById("toilet-add-review");
  if (toiletAddReview != null) document.body.removeChild(toiletAddReview);
}

function goBack(from, to) {
  let fromElement = document.getElementById(from);
  if (fromElement != null) document.body.removeChild(fromElement);

  let toElement = document.getElementById(to);
  toElement.classList.remove("hidden");
}

window.initMap = initMap;
window.showToiletList = showToiletList;
window.showToiletDetalis = showToiletDetalis;
window.closeList = closeList;
window.closeToiletDetails = closeToiletDetails;
window.showToiletReviews = showToiletReviews;
window.closeToiletReviews = closeToiletReviews;
window.submitReview = submitReview;
window.showAddReviewCard = showAddReviewCard;
window.closeAddReviewCard = closeAddReviewCard;
window.goBack = goBack;
