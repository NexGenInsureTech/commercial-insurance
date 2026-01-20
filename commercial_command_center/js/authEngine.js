function login() {
  const uname = document.getElementById("username").value;
  const user = users.find((u) => u.username === uname);

  if (!user) {
    alert("User not found");
    return;
  }

  sessionStorage.setItem("role", user.role);
  sessionStorage.setItem("user", uname);

  window.location.href = "../index.html";
}
