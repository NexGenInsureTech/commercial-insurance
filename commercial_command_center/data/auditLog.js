const auditLog = [];

function logAction(action, details) {
  auditLog.push({
    user: sessionStorage.getItem("user"),
    role: sessionStorage.getItem("role"),
    action,
    details,
    time: new Date().toISOString(),
  });
}
