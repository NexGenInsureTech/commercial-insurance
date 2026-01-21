const auditTrail = [];

function audit(action, context) {
  auditTrail.push({
    action, // e.g. "UPLOAD_OPERATIONAL_DATA"
    context, // free text explanation
    user: sessionStorage.getItem("user"),
    role: sessionStorage.getItem("role"),
    time: new Date().toISOString(),
  });
}
