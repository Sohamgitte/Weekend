/* Payment page interactions */

let currentBooking = null;

document.addEventListener("DOMContentLoaded", function () {
  currentBooking = loadData(KEY_CURRENT);

  if (!currentBooking) {
    document.getElementById("paymentArea").innerHTML =
      '<div class="alert alert-warning">No booking found. Please start from the <a href="venues.html">Venues</a> page.</div>';
    return;
  }

  showOrderSummary();

  const radios = document.querySelectorAll("input[name='payMethod']");
  radios.forEach(function (r) {
    r.addEventListener("change", switchPaymentForm);
  });

  document.getElementById("payForm").addEventListener("submit", payNow);
});

function showOrderSummary() {
  const b = currentBooking;
  document.getElementById("orderSummary").innerHTML =
    '<div class="d-flex justify-content-between"><span>Venue</span><strong>' + b.venue + "</strong></div>" +
    '<div class="d-flex justify-content-between"><span>Sport</span><span>' + b.sport + "</span></div>" +
    '<div class="d-flex justify-content-between"><span>Date</span><span>' + b.date + "</span></div>" +
    '<div class="d-flex justify-content-between"><span>Time</span><span>' + b.time + "</span></div>" +
    '<div class="d-flex justify-content-between"><span>Duration</span><span>' + b.duration + " Hour(s)</span></div>" +
    '<hr class="my-2">' +
    '<div class="d-flex justify-content-between"><strong>Total</strong><strong class="price-text">\u20B9' + b.amount + "</strong></div>";
}

/* Show only the selected payment method form */
function switchPaymentForm() {
  const method = document.querySelector("input[name='payMethod']:checked").value;
  document.getElementById("upiBox").classList.add("d-none");
  document.getElementById("cardBox").classList.add("d-none");
  document.getElementById("venueBox").classList.add("d-none");

  if (method === "UPI") document.getElementById("upiBox").classList.remove("d-none");
  else if (method === "Card") document.getElementById("cardBox").classList.remove("d-none");
  else document.getElementById("venueBox").classList.remove("d-none");
}

/* Simple validation written by hand so it is easy to explain */
function validatePayment(method) {
  const err = document.getElementById("payError");
  err.classList.add("d-none");

  if (method === "UPI") {
    const upi = document.getElementById("upiId").value.trim();
    if (upi.indexOf("@") === -1 || upi.length < 5) {
      err.textContent = "Please enter a valid UPI ID (example: name@okbank).";
      err.classList.remove("d-none");
      return false;
    }
  } else if (method === "Card") {
    const number = document.getElementById("cardNumber").value.replace(/\s/g, "");
    const expiry = document.getElementById("cardExpiry").value.trim();
    const cvv = document.getElementById("cardCvv").value.trim();
    const holder = document.getElementById("cardName").value.trim();

    if (number.length !== 16 || isNaN(number)) {
      err.textContent = "Card number must be 16 digits.";
      err.classList.remove("d-none");
      return false;
    }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      err.textContent = "Expiry must be in MM/YY format.";
      err.classList.remove("d-none");
      return false;
    }
    if (cvv.length !== 3 || isNaN(cvv)) {
      err.textContent = "CVV must be 3 digits.";
      err.classList.remove("d-none");
      return false;
    }
    if (holder === "") {
      err.textContent = "Please enter the name on the card.";
      err.classList.remove("d-none");
      return false;
    }
  }
  return true;
}

function payNow(e) {
  e.preventDefault();
  const method = document.querySelector("input[name='payMethod']:checked").value;
  if (!validatePayment(method)) return;

  // random booking id like WK4821
  const bookingId = "WK" + Math.floor(1000 + Math.random() * 9000);

  const finalBooking = Object.assign({}, currentBooking, {
    bookingId: bookingId,
    paymentMethod: method,
    paymentStatus: method === "Pay at Venue" ? "Pending at Venue" : "Paid",
    status: "Upcoming",
    bookedOn: new Date().toLocaleDateString()
  });

  // Add the confirmed booking to booking history
  const list = loadData(KEY_BOOKINGS) || [];
  list.push(finalBooking);
  saveData(KEY_BOOKINGS, list);

  localStorage.removeItem(KEY_CURRENT);
  saveData("weekend_last_booking", finalBooking);

  window.location.href = "confirmation.html";
}
