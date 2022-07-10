let map;
let toiletList;
let appliedFilters = [];
let unconfirmedFilters = [];
let userCurrentPosition = {};

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
  await callAPIAndUpdateMap("");
}

async function callAPIAndUpdateMap(queryParams) {
  const api = `http://localhost:3000/toilet?lat=${userCurrentPosition.lat}&lng=${userCurrentPosition.lng}${queryParams}`;

  const listToiletEndpoint = new URL(api);
  const response = await fetch(listToiletEndpoint);
  toiletList = await response.json();

  //todo: check if we need to remove all markers and put the updated new ones
  let markers = drawMarkers();

  new markerClusterer.MarkerClusterer({
    map,
    markers,
  });
}

function drawCurrentLocation(position) {
  userCurrentPosition = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  };
  map.setCenter(userCurrentPosition);
  new google.maps.Marker({
    position: userCurrentPosition,
    map,
    title: "you are here!",
    icon: "./images/PeedomPeeIcon.svg",
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
      icon: {
        url: "./images/PeedomLocationPin.svg",
      },
    });
    markers.push(marker);
  });
  return markers;
}

function redirectToGogleMaps(toilet) {
  let toGoogleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${
    userCurrentPosition.lat
  }
  ,${userCurrentPosition.lng}&destination=${+toilet.Latitude.replace(
    ",",
    "."
  )},${+toilet.Longitude.replace(",", ".")}`;

  window.open(toGoogleMapsUrl, "_blank").focus();
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
      <a href="#" class="btn map-button" onclick='redirectToGogleMaps(${JSON.stringify(
        toilet
      )})'>Diection</a>
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

// Filters

function showFilter() {
  let filterWrapper = document.getElementById("filter-wrapper");
  filterWrapper.classList.remove("hidden");
}

function closeFilter() {
  unconfirmedFilters.forEach((filter) => {
    let filterHTML = document.getElementById(filter);
    if (filterHTML.classList.contains("active-filter")) {
      filterHTML.classList.remove("active-filter");
    }
  });

  appliedFilters.forEach((filter) => {
    let filterHTML = document.getElementById(filter);
    if (!filterHTML.classList.contains("active-filter")) {
      filterHTML.classList.add("active-filter");
    }
  });

  unconfirmedFilters = appliedFilters;

  let filterWrapper = document.getElementById("filter-wrapper");
  filterWrapper.classList.add("hidden");
}

function addOrRemoveFilter(filterName) {
  let elementHTML = document.getElementById(filterName);

  if (unconfirmedFilters.includes(filterName)) {
    unconfirmedFilters = unconfirmedFilters.filter(
      (name) => name != filterName
    );
    elementHTML.classList.remove("active-filter");
  } else {
    unconfirmedFilters.push(filterName);
    elementHTML.classList.add("active-filter");
  }
}

function confirmFilter() {
  appliedFilters = unconfirmedFilters;
  let queryParams = ``;

  appliedFilters.forEach((element) => {
    queryParams += `&${element}=true`;
  });

  callAPIAndUpdateMap(queryParams);

  let filterWrapper = document.getElementById("filter-wrapper");
  filterWrapper.classList.add("hidden");

  let filterButton = document.getElementById("filter-button");
  let resetFilterIcon = document.getElementById("reset-filter");

  if (appliedFilters.length != 0) {
    filterButton.classList.add("active-map-button");
    resetFilterIcon.classList.remove("hidden");
    resetFilterIcon.classList.add("active-icon");
  } else {
    filterButton.classList.remove("active-map-button");
    resetFilterIcon.classList.add("hidden");
    resetFilterIcon.classList.remove("active-icon");
  }
}

function resetFilter() {
  appliedFilters.forEach((filter) => {
    let filterHTML = document.getElementById(filter);
    if (filterHTML.classList.contains("active-filter")) {
      filterHTML.classList.remove("active-filter");
    }
  });

  unconfirmedFilters = [];
  appliedFilters = [];

  let filterButton = document.getElementById("filter-button");
  let resetFilterIcon = document.getElementById("reset-filter");

  filterButton.classList.remove("active-map-button");
  filterButton.blur();
  resetFilterIcon.classList.add("hidden");
  resetFilterIcon.classList.remove("active-icon");

  callAPIAndUpdateMap("");
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
window.showFilter = showFilter;
window.closeFilter = closeFilter;
window.addOrRemoveFilter = addOrRemoveFilter;
window.confirmFilter = confirmFilter;
window.resetFilter = resetFilter;
window.redirectToGogleMaps = redirectToGogleMaps;
