function restrict(allowedRoles) {
  const role = sessionStorage.getItem("role");

  if (!role) {
    window.location.href = "auth/login.html";
    return;
  }

  if (!allowedRoles.includes(role)) {
    alert("Access denied: insufficient permissions");
    return;
  }
}
