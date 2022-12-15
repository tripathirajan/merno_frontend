import React from 'react'
import PropTypes from 'prop-types'
import { usePlacesWidget } from 'react-google-autocomplete';
import { GOOGLE_MAPS_API_KEY } from '../../constants';
import { TextField } from '@mui/material';

const AddressAutoComplete = props => {
    const { onPlaceSelected, ...rest } = props;
    const { ref } = usePlacesWidget({
        apiKey: GOOGLE_MAPS_API_KEY,
        onPlaceSelected: onPlaceSelected
    })
    return (
        <TextField
            inputProps={
                {
                    ref: ref
                }
            }
            fullWidth
            type="text"
            {...rest}
        />
    )
}

AddressAutoComplete.propTypes = {
    onPlaceSelected: PropTypes.func.isRequired
}

export default AddressAutoComplete;