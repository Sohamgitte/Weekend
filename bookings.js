/* My Bookings page rendering and cancellation */

document.addEventListener("DOMContentLoaded", function () {
  markCompletedBookings();
  renderBookings("Upcoming");

  const tabs = document.querySelectorAll("#bookingTabs button");
  tabs.forEach(function (t) {
    t.addEventListener("click", function () {
      tabs.forEach(function (x) { x.classList.remove("active"); });
      t.classList.add("active");
      renderBookings(t.getAttribute("data-status"));
    });
  });
});

/* If the booking date is over, mark it as Completed */
function markCompletedBookings() {
  const list = loadData(KEY_BOOKINGS) || [];
  const today = new Date().toISOString().split("T")[0];
  let changed = false;

  list.forEach(function (b) {
    if (b.status === "Upcoming" && b.date < today) {
      b.status = "Completed";
      changed = true;
    }
  });

  if (changed) saveData(KEY_BOOKINGS, list);
}

function renderBookings(status) {
  const list = loadData(KEY_BOOKINGS) || [];
  const filtered = list.filter(function (b) { return b.status === status; });
  const box = document.getElementById("bookingList");

  if (filtered.length === 0) {
    box.innerHTML =
      '<div class="col-12"><div class="alert alert-light border text-center py-4">Your bookings will appear here.</div></div>';
    return;
  }

  let html = "";
  filtered.forEach(function (b) {
    let badge = "bg-success";
    if (b.status === "Cancelled") badge = "bg-danger";
    else if (b.status === "Completed") badge = "bg-secondary";

    html +=
      '<div class="col-md-6"><div class="card border-0 shadow-sm rounded-4 h-100"><div class="card-body">' +
      '<div class="d-flex justify-content-between align-items-start mb-2">' +
      "<div><h6 class=\"venue-name mb-1\">" + b.venue + "</h6>" +
      '<p class="venue-meta mb-0">Booking ID: ' + b.bookingId + "</p></div>" +
      '<span class="badge ' + badge + '">' + b.status + "</span></div>" +
      '<div class="row venue-meta">' +
      '<div class="col-6 mb-1">Sport: <span class="text-dark">' + b.sport + "</span></div>" +
      '<div class="col-6 mb-1">Date: <span class="text-dark">' + b.date + "</span></div>" +
      '<div class="col-6 mb-1">Time: <span class="text-dark">' + b.time + "</span></div>" +
      '<div class="col-6 mb-1">Duration: <span class="text-dark">' + b.duration + " Hour(s)</span></div>" +
      '<div class="col-6 mb-1">Amount: <span class="price-text">\u20B9' + b.amount + "</span></div>" +
      '<div class="col-6 mb-1">Payment: <span class="text-dark">' + b.paymentStatus + "</span></div>" +
      "</div>";

    if (b.status === "Upcoming") {
      html +=
        '<button class="btn btn-sm btn-outline-danger mt-3" onclick="cancelBooking(\'' + b.bookingId +
        '\')">Cancel Booking</button>';
    }

    html += "</div></div></div>";
  });

  box.innerHTML = html;
}

/* Update the saved booking when a player cancels */
function cancelBooking(bookingId) {
  if (!confirm("Do you want to cancel this booking?")) return;

  const list = loadData(KEY_BOOKINGS) || [];
  list.forEach(function (b) {
    if (b.bookingId === bookingId) {
      b.status = "Cancelled";
      b.paymentStatus = "Refund in process";
    }
  });
  saveData(KEY_BOOKINGS, list);
  renderBookings("Upcoming");
}
