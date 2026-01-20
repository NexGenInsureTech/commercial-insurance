const role = sessionStorage.getItem("role");

function restrict(allowedRoles) {
  if (!allowedRoles.includes(role)) {
    alert("Access denied");
    window.location.href = "/auth/login.html";
  }
}
