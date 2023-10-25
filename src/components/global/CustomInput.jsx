import React from 'react';
import {Grid, TextField} from "@mui/material";
import '../../styles/globalStyle.scss';
import '../../styles/loginStyle.scss';
import PropTypes from "prop-types";

/**
 * Custom input component used in form.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The label text for the input.
 * @param {string} props.type - The type of the input.
 * @param {string} props.name - The name of the input.
 * @param {string} props.value - The value of the input.
 * @param {function} props.onChange - The function to handle input value change.
 *
 * @returns {JSX.Element} The CustomInput component.
 */
const CustomInput = ({label, type, name, value, onChange}) => {
    return (
        <Grid item>
            <TextField
                className="custom-form__field custom-form__input"
                label={label}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
            />
        </Grid>
    );
};
CustomInput.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default CustomInput;