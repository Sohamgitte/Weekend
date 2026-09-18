/* Venues page - search, filter and sort the venue array */

document.addEventListener("DOMContentLoaded", function () {
  // If the home page sent a sport/location in the URL, apply it first
  const params = new URLSearchParams(window.location.search);
  if (params.get("sport")) {
    document.getElementById("filterSport").value = params.get("sport");
  }
  if (params.get("location")) {
    document.getElementById("searchInput").value = params.get("location");
  }

  document.getElementById("searchInput").addEventListener("input", showVenues);
  document.getElementById("filterSport").addEventListener("change", showVenues);
  document.getElementById("filterLocation").addEventListener("change", showVenues);
  document.getElementById("filterPrice").addEventListener("change", showVenues);
  document.getElementById("filterRating").addEventListener("change", showVenues);
  document.getElementById("sortBy").addEventListener("change", showVenues);

  fillLocationFilter();
  showVenues();
});

/* Location dropdown is built from the venue data itself */
function fillLocationFilter() {
  const select = document.getElementById("filterLocation");
  const added = [];
  venues.forEach(function (v) {
    if (added.indexOf(v.location) === -1) {
      added.push(v.location);
      select.innerHTML += '<option value="' + v.location + '">' + v.location + "</option>";
    }
  });
}

function showVenues() {
  const text = document.getElementById("searchInput").value.toLowerCase();
  const sport = document.getElementById("filterSport").value;
  const location = document.getElementById("filterLocation").value;
  const price = document.getElementById("filterPrice").value;
  const rating = document.getElementById("filterRating").value;
  const sort = document.getElementById("sortBy").value;

  // Step 1: filter the array
  let result = venues.filter(function (v) {
    const matchText =
      v.name.toLowerCase().includes(text) ||
      v.location.toLowerCase().includes(text) ||
      v.sport.toLowerCase().includes(text);

    const matchSport = sport === "" || v.sports.indexOf(sport) !== -1;
    const matchLocation = location === "" || v.location === location;
    const matchRating = rating === "" || v.rating >= Number(rating);

    let matchPrice = true;
    if (price === "low") matchPrice = v.price < 500;
    else if (price === "mid") matchPrice = v.price >= 500 && v.price <= 800;
    else if (price === "high") matchPrice = v.price > 800;

    return matchText && matchSport && matchLocation && matchRating && matchPrice;
  });

  // Step 2: sort the filtered array
  if (sort === "priceLow") {
    result.sort(function (a, b) { return a.price - b.price; });
  } else if (sort === "priceHigh") {
    result.sort(function (a, b) { return b.price - a.price; });
  } else if (sort === "rating") {
    result.sort(function (a, b) { return b.rating - a.rating; });
  }

  // Step 3: print the cards
  const list = document.getElementById("venueList");
  document.getElementById("resultCount").textContent = result.length + " venue(s) found";

  if (result.length === 0) {
    list.innerHTML =
      '<div class="col-12"><div class="alert alert-warning">No venue matches your search. Try changing the filters.</div></div>';
    return;
  }

  let html = "";
  result.forEach(function (v) {
    html += venueCardHTML(v);
  });
  list.innerHTML = html;
}

function resetFilters() {
  document.getElementById("searchInput").value = "";
  document.getElementById("filterSport").value = "";
  document.getElementById("filterLocation").value = "";
  document.getElementById("filterPrice").value = "";
  document.getElementById("filterRating").value = "";
  document.getElementById("sortBy").value = "";
  showVenues();
}
