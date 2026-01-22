/**
 * QUALITATIVE SIGNALS (FUTURE)
 * ---------------------------
 * Intended to complement numeric analytics
 * with human judgement.
 */

function adjustForUnderwriterConfidence(row, signal) {
  /*
  if (row.UnderwriterConfidence === "Low") {
    return "🔴 Restrict";
  }
  */
  return signal;
}

function adjustForLossDriver(row, signal) {
  /*
  if (row.LossDriver === "Fire" && signal === "🟡 Hold") {
    return "🔴 Restrict";
  }
  */
  return signal;
}
