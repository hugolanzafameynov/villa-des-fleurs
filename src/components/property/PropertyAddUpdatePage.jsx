import React, {useState} from 'react';
import {Box, Typography} from '@mui/material';
import PropTypes from "prop-types";
import {useNavigate} from 'react-router-dom';
import {useLanguage} from '../../contexts/LanguageProvider';
import {addProperty} from '../../services/api/firebase/properties';
import {PATHS} from '../../constants/routing';
import CustomInput from "../custom/CustomInput";
import CustomSelect from "../custom/CustomSelect";
import CustomBreadcrumb from "../custom/CustomBreadcrumb";

/**
 * Constants representing different property types.
 *
 * @type {Object}
 * @readonly
 * @property {string} APARTMENT - Apartment type.
 * @property {string} BUILDING - Building type.
 *
 * @note
 * Please add translations for these property types in 'translations.json'.
 */
const PROPERTY_TYPES = {
    /**
     * Represents an apartment property type.
     * @type {string}
     * @value apartment
     */
    APARTMENT: 'apartment',

    /**
     * Represents a building property type.
     * @type {string}
     * @value building
     */
    BUILDING: 'building',
}

/**
 * Component for the Building Creation/Edition page.
 *
 * @param {object} props - The component's props.
 * @param {string} props.id - The ID of the property.
 * @returns {JSX.Element} The PropertyAddUpdatePage component.
 */
function PropertyAddUpdatePage({id}) {
    const [type, setType] = useState(PROPERTY_TYPES.APARTMENT);
    const [name, setName] = useState('');
    const {translate} = useLanguage();
    const navigate = useNavigate();

    const breadcrumbLinks = [
        {label: translate({section: "BREADCRUMB", key: "HOME"}), to: PATHS.HOME},
        {label: translate({section: "BREADCRUMB", key: "MANAGEMENT"}), to: PATHS.MANAGEMENT},
        {label: translate({section: "BREADCRUMB", key: "PROPERTIES"}), to: PATHS.PROPERTIES},
        {label: translate({section: "BREADCRUMB", key: "CREATION"}), to: PATHS.PROPERTIES_CREATION},
    ];

    /**
     * Handles the change event of the property name input.
     *
     * @param {Object} e - The change event.
     */
    const handleChange = (e) => {
        switch (e.target.name) {
            case 'type':
                setType(e.target.value);
                break;
            case 'name':
                setName(e.target.value);
                break;
            default:
                break;
        }
    };

    /**
     * Handles the form submission.
     *
     * @param {Object} e - The form submission event.
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        switch (type) {
            case PROPERTY_TYPES.APARTMENT:
                addProperty(name)
                    .then((buildingId) => {
                        navigate(`${PATHS.PROPERTIES_GESTION}?id=${buildingId}`);
                    })
                    .catch(error => {
                        console.error('Error adding building: ', error);
                    });
                break;
            case PROPERTY_TYPES.BUILDING:
                setName(e.target.value);
                break;
            default:
                break;
        }
    };

    /**
     * Generates property type options for the Select component.
     *
     * @type {Array} An array of property type options.
     */
    const propertyTypeOptions = Object.keys(PROPERTY_TYPES).map((key) => ({
        value: PROPERTY_TYPES[key],
        label: translate({section: "PROPERTY_ADD_UPDATE_PAGE", key: "PROPERTY_TYPE_" + key}),
    }));

    const fieldArray = [
        <CustomSelect
            label="Type de propriété"
            name="type"
            value={type}
            onChange={handleChange}
            options={propertyTypeOptions}/>,
        <CustomInput
            label="Nom de la propriété"
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
        />
    ]

    return (
        <Box className='property-add-update-page'>
            <CustomBreadcrumb links={breadcrumbLinks}/>
            <Typography className="page-title">Building List</Typography>
            {fieldArray}
        </Box>
    );
}

PropertyAddUpdatePage.propTypes = {
    id: PropTypes.string,
};

export default PropertyAddUpdatePage;