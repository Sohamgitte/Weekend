/* Load the venue selected on the listings page */

document.addEventListener("DOMContentLoaded", function () {
  const id = localStorage.getItem(KEY_VENUE);
  const venue = getVenueById(id);
  const box = document.getElementById("detailsBox");

  if (!venue) {
    box.innerHTML =
      '<div class="alert alert-warning">No venue selected. Please go to the <a href="venues.html">Venues</a> page.</div>';
    return;
  }

  let facilities = "";
  venue.facilities.forEach(function (f) {
    facilities += '<li class="list-group-item"><i class="bi bi-check2 text-success"></i> ' + f + "</li>";
  });

  box.innerHTML =
    '<div class="row g-4">' +
    '<div class="col-lg-7">' +
    '<img src="' + venue.image + '" class="detail-img" alt="' + venue.name + '">' +
    '<h3 class="mt-3 mb-1" style="color:#12304f">' + venue.name + "</h3>" +
    '<p class="venue-meta mb-2"><i class="bi bi-geo-alt"></i> ' + venue.location +
    ' &nbsp; ' + ratingStars(venue.rating) + "</p>" +
    "<h6 class=\"mt-4\">About this venue</h6>" +
    "<p>" + venue.description + "</p>" +
    "<h6 class=\"mt-4\">Available sports</h6>" +
    '<p>' + venue.sports.join(", ") + "</p>" +
    "<h6 class=\"mt-4\">Opening hours</h6>" +
    "<p>" + venue.hours + "</p>" +
    "</div>" +
    '<div class="col-lg-5">' +
    '<div class="card border-0 shadow-sm rounded-4 p-4 mb-3">' +
    '<div class="card-body p-0">' +
    '<p class="mb-1 text-muted small">Starting price</p>' +
    '<h4 class="price-text mb-3">&#8377;' + venue.price + ' <small class="text-muted fs-6 fw-normal">/ hour</small></h4>' +
    '<button class="btn btn-green w-100 mb-2" onclick="bookVenue()">Book This Venue</button>' +
    '<a class="btn btn-outline-secondary w-100" href="venues.html">Back to Venues</a>' +
    "</div></div>" +
    '<div class="card border-0 shadow-sm rounded-4">' +
    '<div class="card-header bg-transparent fw-bold py-3 border-bottom-0" style="color: var(--navy-dark)">Facilities</div>' +
    '<ul class="list-group list-group-flush border-top-0">' + facilities + "</ul>" +
    "</div></div></div>";
});

function bookVenue() {
  // Continue with the selected venue
  window.location.href = "booking.html";
}
