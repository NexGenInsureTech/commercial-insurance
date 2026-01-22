/**
 * STRATEGY RULE SWITCHES (Master switchboard — everything OFF)
 * ---------------------
 * All flags MUST remain false until explicitly approved.
 * Turning any flag ON changes portfolio decisions.
 */

const strategyRules = {
  useRiskMitigationScore: false,
  useUnderwriterConfidence: false,
  useStrategicPriority: false,
  useLossDriverOverrides: false,
  useExperimentOverrides: false,
};

// DO NOT export by default yet
// This file is NOT imported anywhere today
