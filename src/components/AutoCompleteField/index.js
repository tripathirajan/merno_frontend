import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Autocomplete, TextField, Box, Typography, Stack, Avatar } from '@mui/material'

const AutoCompleteField = forwardRef(({ name, label, options, isDefaultRenderer = true, value, error = false, helperText = '', ...rest }, ref) => {
    if (name === 'vendor') {
        //console.log('onchange', rest.onChange)
    }

    if (isDefaultRenderer) {
        return (<Autocomplete
            ref={ref}
            disablePortal={false}
            options={options}
            renderInput={(params) => <TextField name={name} {...params} label={label} error={error}
                helperText={helperText} />}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            {...rest}
        />)
    }
    return (
        <Autocomplete
            ref={ref}
            options={options}
            getOptionLabel={(option) => option.label}
            disablePortal={false}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
                <TextField
                    name={name}
                    {...params}
                    label={label || `Select ${name}...`}
                    error={error}
                    helperText={helperText}
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'combo',
                        name
                    }}
                />
            )}
            renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <Stack
                        direction="row"
                        spacing={1}
                    >
                        <Avatar
                            loading="lazy"
                            width="20"
                            src={option.image}
                            alt={option.label}
                            srcSet={`${option.image} 2x`}
                        />
                        <Stack
                            direction="column"
                        >
                            <Typography variant='body2'>{option.label}</Typography>
                            <Typography variant='caption'>{option.caption}</Typography>
                        </Stack>
                    </Stack>
                </Box>
            )}
            {...rest}
        />
    )
})

AutoCompleteField.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired
}

export default React.memo(AutoCompleteField);