// DATABASE
/**
 * Constants representing database-related information.
 *
 * @typedef {Object} DatabaseConstants
 * @property {PropertyConstants} PROPERTIES - Constants for the 'properties' table.
 * @property {TenantConstants} TENANTS - Constants for the 'tenants' table.
 * @property {RentalConstants} RENTALS - Constants for the 'rentals' table.
 */

/**
 * Constants representing 'properties' database structure.
 *
 * @typedef {Object} PropertyConstants
 * @property {string} TABLE - The name of the 'properties' table.
 * @property {string} COLUMN_NAME - The column name for property names.
 * @property {string} COLUMN_TYPE - The column name for property types.
 * @property {string} COLUMN_TENANTS - The column name for property tenants.
 */

/**
 * Represents a property entity.
 *
 * @typedef {Object} Property
 * @property {string} id - The unique identifier of the property.
 * @property {string} name - The name of the property.
 * @property {string} type - The type of the property (e.g., "apartment").
 * @property {number[]} [tenants] - An array of tenant IDs associated with the property.
 */

/**
 * A filter objects that contain name ad type filter values.
 *
 * @typedef {Object} PropertyFilterValues
 * @property {string} filterByName - The property name to use for sorting.
 * @property {string} filterByType - The property type to use for sorting.
 */

/**
 * Constants representing 'tenants' database structure.
 *
 * @typedef {Object} TenantConstants
 * @property {string} TABLE - The name of the 'tenants' table.
 * @property {string} COLUMN_NAME - The column name for tenant names.
 * @property {string} COLUMN_PHONE - The column name for tenant phone numbers.
 * @property {string} COLUMN_EMAIL - The column name for tenant email addresses.
 */

/**
 * Constants representing 'rentals' database structure.
 *
 * @typedef {Object} RentalConstants
 * @property {string} TABLE - The name of the 'rentals' table.
 * @property {string} COLUMN_START_DATE - The column name for rental start dates.
 * @property {string} COLUMN_END_DATE - The column name for rental end dates.
 * @property {string} COLUMN_TENANT_IDS - The column name for tenant IDs in rentals.
 * @property {string} COLUMN_PROPERTY_IDS - The column name for property IDs in rentals.
 */

// ROUTING
/**
 * Constants representing database-related information.
 *
 * @typedef {Object} PathConstants
 * @property {string} LOGIN - Login path.
 * @property {string} HOME - Home path.
 * @property {string} MANAGEMENT - Management path.
 * @property {string} PROPERTIES - Properties list path.
 * @property {string} PROPERTIES_CREATION - Properties creation path.
 * @property {string} PROPERTIES_EDITION - Properties edition path.
 * @property {string} TENANTS - Tenants list path.
 * @property {string} TENANTS_CREATION - Tenants creation path.
 * @property {string} TENANTS_EDITION - Tenants edition path.
 * @property {string} RENTALS - Rentals list path.
 * @property {string} RENTALS_CREATION - Rentals creation path.
 * @property {string} RENTALS_EDITION - Rentals edition path.
 * @property {string} TOOLS - Tools path.
 * @property {string} QUITTANCES - Quittances list path.
 * @property {string} QUITTANCES_CREATION - Quittances creation path.
 * @property {string} QUITTANCES_EDITION - Quittances edition path.
 * @property {string} ACCOUNT - Account path.
 * @property {string} UNKNOWN - Unknown path.
 */

// LOGIN
/**
 * Constants representing types of login forms.
 *
 * @typedef {Object} LoginFormTypeConstants
 * @property {string} LOGIN - Standard login form.
 * @property {string} FORGOT - Password recovery form.
 */

/**
 * Constants representing possible error codes related to the login form.
 *
 * @typedef {Object} LoginFormErrorsConstants
 * @property {string} INVALID_EMAIL - Invalid email address.
 * @property {string} WRONG_PASSWORD - Incorrect password.
 * @property {string} USER_NOT_FOUND - User not found for the provided email.
 * @property {string} MISSING_EMAIL - Email is required.
 * @property {string} MISSING_PASSWORD - Password is required.
 * @property {string} TOO_MANY_REQUEST - Too many login attempts. Try again later.
 * @property {string} NETWORK_REQUEST_FAILED - Network error. Check your connection.
 * @property {string} USER_DISABLED - User account disabled by an admin.
 * @property {string} WEAK_PASSWORD - Weak password. Choose a stronger one.
 */

// PAGE
/**
 * Represents a link in the breadcrumb navigation.
 *
 * @typedef {Object} BreadcrumbLink
 * @property {string} label - The label of the link.
 * @property {string} to - The destination URL of the link.
 */

// TABLE
/**
 * Filter objects for custom table filtering.
 *
 * @typedef {Object} TableFilter
 * @property {string} key - The unique key for the filter.
 * @property {string} label - The translation key for the filter label.
 * @property {boolean} [select] - Indicates if the filter is a select dropdown.
 * @property {TableFilterOption[]} [options] - The options for a select dropdown.
 */

/**
 * Option objects to customize the table filter component.
 *
 * @typedef {Object} TableFilterOption
 * @property {string} value - The value of the option.
 * @property {string} label - The label of the option.
 */

/**
 * Column object for custom table.
 *
 * @typedef {Object} TableColumn
 * @property {string} key - The unique key for the column.
 * @property {string} label - The translation key for the column label.
 */

/**
 * Popup content object.
 *
 * @typedef {Object} PopupContent
 * @property {string} title - The title of the popup.
 * @property {string} content - The content for the popup.
 */
