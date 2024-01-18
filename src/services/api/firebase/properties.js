import app from './config';
import {getDatabase, push, ref, set, get, remove} from 'firebase/database';
import PropTypes from 'prop-types';
import {DATABASE} from "../../../constants/database";

const database = getDatabase(app);

/**
 * Add a new property in the properties.
 *
 * @param {string} propertyName - The name of the property.
 * @param {string} propertyType - The type of the property.
 * @returns {Promise<string>} A promise indicating the key of the property.
 * @throws {Error} If there is an error during the creation process.
 */
const addProperty = async ({propertyName, propertyType}) => {
    try {
        const propertyThenableRef = push(ref(database, DATABASE.PROPERTIES.TABLE));

        await set(propertyThenableRef, {
            [DATABASE.PROPERTIES.COLUMN_NAME]: propertyName,
            [DATABASE.PROPERTIES.COLUMN_TYPE]: propertyType,
        })

        return propertyThenableRef.key;
    } catch (error) {
        throw error;
    }
}
addProperty.propTypes = {
    propertyName: PropTypes.string.isRequired,
    propertyType: PropTypes.string.isRequired,
};

/**
 * A filter objects that contain name ad type filter values.
 *
 * @typedef {Object} PropertyFilter
 * @property {string} filterByName - The property name to use for sorting.
 * @property {string} filterByType - The property type to use for sorting.
 */

/**
 * Get properties and filter them.
 *
 * @param {PropertyFilter} filterValues - The filter values to use for sorting.
 * @returns {Promise<Array>} A promise that resolves to an array of properties.
 * @throws {Error} If there is an error during the getting process.
 */
const getPropertiesByFilters = async (filterValues) => {
    try {
        const filterByName = filterValues.filterByName;
        const filterByType = filterValues.filterByType;

        const propertyRef = ref(database, DATABASE.PROPERTIES.TABLE);
        let properties = [];

        const snapshot = await get(propertyRef);
        snapshot.forEach((childSnapshot) => {
            properties.push({
                id: childSnapshot.key,
                ...childSnapshot.val(),
            });
        });

        if (filterByName && filterByName !== '') {
            properties = properties.filter(property =>
                property.name.toLowerCase().includes(filterByName.toLowerCase())
            );
        }

        if (filterByType && filterByType !== '') {
            properties = properties.filter(property =>
                property.type === filterByType
            );
        }

        return properties;
    } catch (error) {
        throw error;
    }
};
getPropertiesByFilters.propTypes = {
    filterValues: PropTypes.array,
};

/**
 * Delete a property by its ID.
 *
 * @param {string} propertyId - The ID of the property to be deleted.
 * @returns {Promise<void>} A promise indicating the success or failure of the deletion.
 * @throws {Error} If there is an error during the deletion process.
 */
const deletePropertyById = async (propertyId) => {
    try {
        const propertyRef = ref(database, DATABASE.PROPERTIES.TABLE + "/" + propertyId);

        await remove(propertyRef);
    } catch (error) {
        throw error;
    }
};
deletePropertyById.propTypes = {
    propertyId: PropTypes.string.isRequired,
};

export {addProperty, getPropertiesByFilters, deletePropertyById}
