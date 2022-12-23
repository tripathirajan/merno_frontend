import React from 'react'
import { Box, Button, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Page from '../../components/Page';
import { FormikProvider, useFormik, Form } from 'formik'
import * as Yup from 'yup';
import AddressAutoComplete from '../../components/AddressAutoComplete';
import FileUploaded from '../../components/FileUploader';

const vendorSchema = Yup.object().shape({
    name: Yup.string().min(2).max(100).required("Please enter vendor name"),
    email: Yup.string().email().required("Enter vendor email."),
    address: Yup.string().min(2).max(50).required("Enter vendor address."),
    contactNo: Yup.string().min(10).max(10).required("Enter vendor contact number."),
    contactPersonName: Yup.string().min(2).max(50).required("Enter contact person name"),
    contactPersonMobile: Yup.string().min(10, "Not a valid mobile number").max(10, "Not a valid mobile number").required("Enter contact person mobile number."),
    contactPersonEmail: Yup.string().email().required("Enter contact person email."),
    isActive: Yup.bool(),
    lat: Yup.number(),
    lng: Yup.number(),
    image: Yup.mixed()
});
const AddVendor = () => {
    const navigate = useNavigate();
    const vendorFormik = useFormik({
        initialValues: {
            name: '',
            email: '',
            address: '',
            contactNo: '',
            contactPersonName: '',
            contactPersonMobile: '',
            contactPersonEmail: '',
            isActive: false,
            lat: 0.00,
            lng: 0.00,
            image: null
        },
        validationSchema: vendorSchema,
        onSubmit: async (values, { setSubmitting }) => {
            console.log('onsubmit', values);
        }
    })

    const { errors, touched, values, isSubmitting, setFieldValue, handleSubmit, getFieldProps } = vendorFormik;

    const handleGoBack = () => {
        navigate('/vendor');
    }
    return (
        <Page
            title="Add Vendor | Merno"
            legend={`Add Vendor`}
            onBackClick={handleGoBack}
        >
            <FormikProvider value={vendorFormik}>
                <Box
                    component={Form}
                    onSubmit={handleSubmit}
                    autoComplete="off"
                    noValidate
                    sx={
                        {
                            width: '100%'
                        }
                    }
                >
                    <Paper
                        sx={{ p: 2 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item lg={4} xs={12}>
                                <FileUploaded
                                    name="image"
                                    handleOnChangeFile={(e) => {
                                        setFieldValue("image", e?.currentTarget?.files[0]);
                                    }}
                                />
                                {
                                    Boolean(touched.image && errors.image) ? <Typography variant="body2" color="error">{touched.image && errors.image}</Typography> : null
                                }
                            </Grid>
                            <Grid item lg={8} xs={12}>
                                <Stack
                                    direction="column"
                                    alignItems="center"
                                    justifyContent="center"
                                    spacing={3}
                                >
                                    <TextField
                                        name="name"
                                        fullWidth
                                        type="text"
                                        label="Vendor Name"
                                        size="small"
                                        {...getFieldProps('name')}
                                        error={Boolean(touched.name && errors.name)}
                                        helperText={touched.name && errors.name}
                                        autoFocus
                                    />
                                    <TextField
                                        name="email"
                                        fullWidth
                                        type="email"
                                        label="Vendor Email"
                                        size="small"
                                        {...getFieldProps('email')}
                                        error={Boolean(touched.email && errors.email)}
                                        helperText={touched.email && errors.email}
                                    />
                                    <Box sx={{ width: '100%' }}>
                                        <AddressAutoComplete
                                            name="address"
                                            fullWidth
                                            size="small"
                                            label="Vendor Address"
                                            onPlaceSelected={(address) => {
                                                const { formatted_address: formattedAddress, geometry: { location } } = address;
                                                console.log('address', address, location);
                                                setFieldValue('address', formattedAddress)
                                                setFieldValue('lat', location?.lat())
                                                setFieldValue('lng', location?.lng())
                                            }}
                                            {...getFieldProps('address')}
                                            error={Boolean(touched.address && errors.address)}
                                            helperText={touched.address && errors.address}
                                        />
                                        <input
                                            name="lat"
                                            type="hidden"
                                            {...getFieldProps('lat')}
                                        />
                                        <input
                                            name="lng"
                                            type="hidden"
                                            {...getFieldProps('lng')}
                                        />
                                    </Box>
                                    <TextField
                                        name="contactNo"
                                        fullWidth
                                        type="text"
                                        label="Vendor Contact No."
                                        size="small"
                                        {...getFieldProps('contactNo')}
                                        error={Boolean(touched.contactNo && errors.contactNo)}
                                        helperText={touched.contactNo && errors.contactNo}
                                    />
                                    <TextField
                                        name="contactPersonName"
                                        fullWidth
                                        type="text"
                                        size="small"
                                        label="Contact Person Name"
                                        {...getFieldProps('contactPersonName')}
                                        error={Boolean(touched.contactPersonName && errors.contactPersonName)}
                                        helperText={touched.contactPersonName && errors.contactPersonName}
                                    />
                                    <TextField
                                        name="contactPersonMobile"
                                        fullWidth
                                        type="text"
                                        size="small"
                                        label="Contact Person Mobile No."
                                        {...getFieldProps('contactPersonMobile')}
                                        error={Boolean(touched.contactPersonMobile && errors.contactPersonMobile)}
                                        helperText={touched.contactPersonMobile && errors.contactPersonMobile}
                                    />
                                    <TextField
                                        name="contactPersonEmail"
                                        fullWidth
                                        type="text"
                                        size="small"
                                        label="Contact Person Email"
                                        {...getFieldProps('contactPersonEmail')}
                                        error={Boolean(touched.contactPersonEmail && errors.contactPersonEmail)}
                                        helperText={touched.contactPersonEmail && errors.contactPersonEmail}
                                    />
                                </Stack>
                                <Stack
                                    sx={{ mt: 3 }}
                                    direction="row-reverse"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    spacing={2}
                                >
                                    <Button

                                        size="normal"
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                        disabled={isSubmitting}
                                    >
                                        Save
                                    </Button>
                                    <Button

                                        size="normal"
                                        type="button"
                                        variant="text"
                                        onClick={handleGoBack}
                                        disabled={isSubmitting}
                                    >
                                        Cancel
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </FormikProvider>
        </Page>
    )
}

export default AddVendor;