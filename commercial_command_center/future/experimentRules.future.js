/**
 * EXPERIMENT-SPECIFIC RULES (FUTURE)
 * ---------------------------------
 * These rules apply ONLY to ExperimentFlag === YES
 */

function experimentScaleOverride(row, signal) {
  /*
  if (
    row.ExperimentFlag === "YES" &&
    row.RiskMitigationScore === "High" &&
    signal === "🟡 Watch"
  ) {
    return "🟢 Scale";
  }
  */
  return signal;
}
