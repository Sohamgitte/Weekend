/* Login and signup page interactions */

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("loginForm").addEventListener("submit", loginUser);
  document.getElementById("signupForm").addEventListener("submit", signupUser);
});

function showMessage(id, text, type) {
  const box = document.getElementById(id);
  box.className = "alert alert-" + type;
  box.textContent = text;
  box.classList.remove("d-none");
}

function signupUser(e) {
  e.preventDefault();
  const name = document.getElementById("suName").value.trim();
  const email = document.getElementById("suEmail").value.trim();
  const mobile = document.getElementById("suMobile").value.trim();
  const pass = document.getElementById("suPassword").value;
  const cpass = document.getElementById("suConfirm").value;

  if (name === "" || email === "" || mobile.length !== 10 || pass.length < 4) {
    showMessage("signupMsg", "Please fill all fields correctly (mobile 10 digits, password min 4 characters).", "danger");
    return;
  }
  if (pass !== cpass) {
    showMessage("signupMsg", "Password and Confirm Password do not match.", "danger");
    return;
  }

  const users = loadData(KEY_USERS) || [];
  const exists = users.some(function (u) { return u.email === email; });
  if (exists) {
    showMessage("signupMsg", "This email is already registered. Please login.", "warning");
    return;
  }

  users.push({ name: name, email: email, mobile: mobile, password: pass });
  saveData(KEY_USERS, users);
  showMessage("signupMsg", "Account created successfully. You can login now.", "success");
  document.getElementById("signupForm").reset();
}

function loginUser(e) {
  e.preventDefault();
  const email = document.getElementById("liEmail").value.trim();
  const pass = document.getElementById("liPassword").value;

  const users = loadData(KEY_USERS) || [];
  const user = users.find(function (u) { return u.email === email && u.password === pass; });

  if (!user) {
    showMessage("loginMsg", "Invalid email or password. If you are new, please sign up first.", "danger");
    return;
  }

  // Keep the signed-in user available across pages
  saveData(KEY_USER, { name: user.name, email: user.email, mobile: user.mobile });
  showMessage("loginMsg", "Login successful. Redirecting...", "success");
  setTimeout(function () { window.location.href = "home.html"; }, 800);
}
