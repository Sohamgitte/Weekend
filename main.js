/* Common functions used on every page */

/* ---- localStorage keys ---- */
const KEY_USER = "weekend_user";
const KEY_USERS = "weekend_users";
const KEY_VENUE = "weekend_selected_venue";
const KEY_CURRENT = "weekend_current_booking";
const KEY_BOOKINGS = "weekend_bookings";

/* Small helpers so we do not repeat JSON.parse everywhere */
function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadData(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

function getLoggedInUser() {
  return loadData(KEY_USER);
}

function logoutUser() {
  localStorage.removeItem(KEY_USER);
  window.location.href = "home.html";
}

/* Show star rating text like 4.5 */
function ratingStars(rating) {
  return '<span class="rating-badge"><i class="bi bi-star-fill"></i> ' + rating + "</span>";
}

/* Build one venue card (used on home and venues page) */
function venueCardHTML(venue) {
  return (
    '<div class="col-md-6 col-lg-4">' +
    '<div class="card venue-card h-100">' +
    '<img src="' + venue.image + '" class="card-img-top" alt="' + venue.name + '">' +
    '<div class="card-body">' +
    '<div class="d-flex justify-content-between align-items-start">' +
    '<h6 class="venue-name">' + venue.name + "</h6>" +
    ratingStars(venue.rating) +
    "</div>" +
    '<p class="venue-meta mb-1"><i class="bi bi-geo-alt"></i> ' + venue.location + "</p>" +
    '<p class="venue-meta mb-3"><i class="bi bi-dribbble"></i> ' + venue.sports.join(", ") + "</p>" +
    '<div class="d-flex justify-content-between align-items-center">' +
    '<span class="price-text">&#8377;' + venue.price + '<small class="text-muted fw-normal">/hour</small></span>' +
    '<button class="btn btn-sm btn-navy" onclick="viewVenue(' + venue.id + ')">View Details</button>' +
    "</div></div></div></div>"
  );
}

/* Store the clicked venue id and open the details page */
function viewVenue(id) {
  localStorage.setItem(KEY_VENUE, id);
  window.location.href = "venue-details.html";
}

/* Update navbar: show Login or the user name + Logout */
function updateNavbar() {
  const area = document.getElementById("authArea");
  if (!area) return;

  const user = getLoggedInUser();
  if (user) {
    area.innerHTML =
      '<span class="text-white me-3 small">Hi, ' + user.name + "</span>" +
      '<button class="btn btn-sm btn-outline-light" onclick="logoutUser()">Logout</button>';
  } else {
    area.innerHTML = '<a class="btn btn-sm btn-green" href="login.html">Login</a>';
  }
}

/* Home page: render 6 venues and handle the hero search */
function initHomePage() {
  const box = document.getElementById("popularVenues");
  if (box) {
    let html = "";
    for (let i = 0; i < 6; i++) {
      html += venueCardHTML(venues[i]);
    }
    box.innerHTML = html;
  }

  const form = document.getElementById("heroSearchForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const loc = document.getElementById("heroLocation").value.trim();
      const sport = document.getElementById("heroSport").value;
      // pass the search values to venues.html using the URL query string
      window.location.href = "venues.html?location=" + encodeURIComponent(loc) + "&sport=" + encodeURIComponent(sport);
    });
  }
}

/* Open venues page filtered by a sport card */
function openSport(sport) {
  window.location.href = "venues.html?sport=" + encodeURIComponent(sport);
}

document.addEventListener("DOMContentLoaded", function () {
  updateNavbar();
  initHomePage();
});
