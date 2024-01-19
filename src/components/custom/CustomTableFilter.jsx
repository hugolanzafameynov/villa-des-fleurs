import React, {useState} from 'react';
import {Box, Button, TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import "../../styles/customStyle.scss";

/**
 * Component for the table filter.
 *
 * @param {TableFilter[]} filters - The array of filter objects.
 * @param {function} handleSearchClick - The callback function triggered on filter change.
 * @returns {JSX.Element} The CustomTableFilter component.
 */
function CustomTableFilter({filters, handleSearchClick}) {
    const [filterValues, setFilterValues] = useState([]);

    /**
     * Handles the change in filter values.
     *
     * @param {string} key - The key of the filter.
     * @param {string} value - The new value of the filter.
     */
    const handleFilterChange = (key, value) => {
        setFilterValues((prevValues) => ({...prevValues, [key]: value}));
    };

    return (
        <Box className="table-filter">
            <Box className="table-filter__field-container">
                {filters.map((filter) => (
                    <TextField
                        key={filter.key}
                        className="table-filter__field"
                        label={filter.label}
                        size="small"
                        onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                        {...(filter.select ? {
                            select: true,
                            SelectProps: {native: true},
                        } : {})}>
                        {filter.options && filter.options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                ))}
            </Box>
            <Box className="table-filter__button-container">
                <Button className="white-button"
                        onClick={() => handleSearchClick(filterValues)}>
                    <SearchIcon/>
                </Button>
            </Box>
        </Box>
    );
}

CustomTableFilter.propTypes = {
    filters: PropTypes.array.isRequired,
    handleSearchClick: PropTypes.func.isRequired,
};

export default CustomTableFilter;