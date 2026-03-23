/**
 * Custom logger module for safe and formatted console outputs.
 * Helps prevent console spamming by allowing specific log levels and formatted timestamps.
 *
 * @module utils/logger
 */

/**
 * Gets the current timestamp in a localized string format.
 *
 * @returns {string} Formatted timestamp string.
 */
function getTimestamp() {
  return new Date().toLocaleString('en-US', { hour12: false });
}

/**
 * Logs an informational message to the console.
 *
 * @param {string} message - The message to log.
 */
function info(message) {
  console.log(`[${getTimestamp()}] [INFO] ${message}`);
}

/**
 * Logs a warning message to the console.
 *
 * @param {string} message - The warning message to log.
 */
function warn(message) {
  console.warn(`[${getTimestamp()}] [WARN] ${message}`);
}

/**
 * Logs an error message to the console.
 *
 * @param {string} message - The error message to log.
 * @param {Error} [error] - The optional error object to attach.
 */
function error(message, err = null) {
  console.error(`[${getTimestamp()}] [ERROR] ${message}`);
  if (err && err.stack) {
    console.error(err.stack);
  } else if (err) {
    console.error(err);
  }
}

/**
 * Formats a success message to the console.
 *
 * @param {string} message - The success message to log.
 */
function success(message) {
  console.log(`[${getTimestamp()}] [SUCCESS] ${message}`);
}

module.exports = {
  info,
  warn,
  error,
  success
};
