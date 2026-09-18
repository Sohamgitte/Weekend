/* Booking page - form, slot selection and price calculation */

let selectedVenue = null;
let selectedSlot = "";

document.addEventListener("DOMContentLoaded", function () {
  const id = localStorage.getItem(KEY_VENUE);
  selectedVenue = getVenueById(id);

  if (!selectedVenue) {
    document.getElementById("bookingArea").innerHTML =
      '<div class="alert alert-warning">Please select a venue first from the <a href="venues.html">Venues</a> page.</div>';
    return;
  }

  showVenueSummary();
  fillSports();
  fillSlots();
  setMinDate();
  fillUserDetails();

  document.getElementById("duration").addEventListener("change", updateSummary);
  document.getElementById("bookDate").addEventListener("change", updateSummary);
  document.getElementById("sport").addEventListener("change", updateSummary);
  document.getElementById("bookingForm").addEventListener("submit", submitBooking);

  updateSummary();
});

function showVenueSummary() {
  document.getElementById("venueBanner").innerHTML =
    '<img src="' + selectedVenue.image + '" class="rounded me-3" width="110" height="75" style="object-fit:cover" alt="venue">' +
    "<div><h6 class=\"venue-name mb-1\">" + selectedVenue.name + "</h6>" +
    '<p class="venue-meta mb-0"><i class="bi bi-geo-alt"></i> ' + selectedVenue.location +
    " &nbsp;|&nbsp; &#8377;" + selectedVenue.price + "/hour</p></div>";
}

function fillSports() {
  const select = document.getElementById("sport");
  selectedVenue.sports.forEach(function (s) {
    select.innerHTML += '<option value="' + s + '">' + s + "</option>";
  });
}

/* Slots come from data.js and are printed as buttons */
function fillSlots() {
  const box = document.getElementById("slotBox");
  let html = "";
  timeSlots.forEach(function (t) {
    html += '<button type="button" class="slot-btn" onclick="chooseSlot(this,\'' + t + '\')">' + t + "</button>";
  });
  box.innerHTML = html;
}

function chooseSlot(btn, time) {
  const all = document.querySelectorAll(".slot-btn");
  all.forEach(function (b) { b.classList.remove("selected"); });
  btn.classList.add("selected");
  selectedSlot = time;
  document.getElementById("slotError").classList.add("d-none");
  updateSummary();
}

/* Past dates are not allowed */
function setMinDate() {
  const today = new Date().toISOString().split("T")[0];
  const input = document.getElementById("bookDate");
  input.setAttribute("min", today);
  input.value = today;
}

/* If the user is logged in, fill the name and email automatically */
function fillUserDetails() {
  const user = getLoggedInUser();
  if (user) {
    document.getElementById("custName").value = user.name || "";
    document.getElementById("custEmail").value = user.email || "";
    document.getElementById("custMobile").value = user.mobile || "";
  }
}

/* Total price = hourly price x duration */
function updateSummary() {
  const duration = Number(document.getElementById("duration").value);
  const total = selectedVenue.price * duration;

  document.getElementById("sumVenue").textContent = selectedVenue.name;
  document.getElementById("sumSport").textContent = document.getElementById("sport").value;
  document.getElementById("sumDate").textContent = document.getElementById("bookDate").value || "-";
  document.getElementById("sumDuration").textContent = duration + (duration === 1 ? " Hour" : " Hours");
  document.getElementById("sumTime").textContent = selectedSlot || "-";
  document.getElementById("sumRate").textContent = "\u20B9" + selectedVenue.price;
  document.getElementById("sumTotal").textContent = "\u20B9" + total;
}

function submitBooking(e) {
  e.preventDefault();
  const form = document.getElementById("bookingForm");

  // Bootstrap style validation
  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }

  if (selectedSlot === "") {
    document.getElementById("slotError").classList.remove("d-none");
    return;
  }

  const duration = Number(document.getElementById("duration").value);

  const booking = {
    venueId: selectedVenue.id,
    venue: selectedVenue.name,
    location: selectedVenue.location,
    image: selectedVenue.image,
    sport: document.getElementById("sport").value,
    date: document.getElementById("bookDate").value,
    time: selectedSlot,
    duration: duration,
    rate: selectedVenue.price,
    amount: selectedVenue.price * duration,
    name: document.getElementById("custName").value,
    mobile: document.getElementById("custMobile").value,
    email: document.getElementById("custEmail").value
  };

  // keep the booking temporarily until payment is done
  saveData(KEY_CURRENT, booking);
  window.location.href = "payment.html";
}
