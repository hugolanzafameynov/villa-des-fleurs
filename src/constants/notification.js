/**
 * Constants representing types of notification.
 *
 * @typedef {Object} NotificationTypeConstants
 * @property {string} SUCCESS - Success notification.
 * @property {string} ERROR - Error notification.
 * @property {string} INFO - Information notification.
 * @property {string} WARNING - Warning notification.
 */

/**
 * Object containing constants representing types of notifications.
 *
 * @type {NotificationTypeConstants}
 * @readonly
 */
const NOTIFICATION_TYPES = {
    /**
     * Represents a success notification.
     * @type {string}
     */
    SUCCESS: "success",

    /**
     * Represents an error notification.
     * @type {string}
     */
    ERROR: "error",

    /**
     * Represents an information notification.
     * @type {string}
     */
    INFO: "info",

    /**
     * Represents a warning notification.
     * @type {string}
     */
    WARNING: "warning",
};

export {NOTIFICATION_TYPES};
