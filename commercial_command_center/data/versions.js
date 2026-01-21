const versions = [];

function createVersion(entity, oldValue, newValue) {
  versions.push({
    entity, // e.g. "LOSS_CAP"
    oldValue,
    newValue,
    changedBy: sessionStorage.getItem("user"),
    role: sessionStorage.getItem("role"),
    timestamp: new Date().toISOString(),
  });
}
