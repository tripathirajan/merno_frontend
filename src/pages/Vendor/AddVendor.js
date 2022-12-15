import React from 'react'
import { Box, Grid, Paper, Stack, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Page from '../../components/Page';
import { FormikProvider, useFormik, Form } from 'formik'
import * as Yup from 'yup';
import AddressAutoComplete from '../../components/AddressAutoComplete';

const vendorSchema = Yup.object().shape({
    name: Yup.string().min(2).max(100).required("Please enter vendor name"),
    email: Yup.string().email().required("Enter vendor email."),
    address: Yup.string().min(2).max(50).required("Enter vendor address."),
    contactNo: Yup.string().min(10).max(10).required("Enter vendor contact number."),
    contactPersonName: Yup.string().min(2).max(50).required("Enter contact person name"),
    contactPersonMobile: Yup.string().min(10).max(10).required("Enter contact person mobile number."),
    contactPersonEmail: Yup.string().email().required("Enter contact person email."),
    isActive: Yup.bool()
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
            isActive: false
        },
        validationSchema: vendorSchema,
        onSubmit: async (values, { setSubmitting }) => {

        }
    })

    const { errors, touched, values, isSubmitting, setFieldValue, handleSubmit, getFieldProps } = vendorFormik;

    return (
        <Page
            title="Add Vendor | Merno"
            legend={`Add Vendor`}
            onBackClick={() => {
                navigate('/vendor');
            }}
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
                                dropzone
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
                                        {...getFieldProps('name')}
                                        error={Boolean(touched.name && errors.name)}
                                        helperText={touched.name && errors.name}
                                    />
                                    <TextField
                                        name="email"
                                        fullWidth
                                        type="email"
                                        label="Vendor Email"
                                        {...getFieldProps('email')}
                                        error={Boolean(touched.email && errors.email)}
                                        helperText={touched.email && errors.email}
                                    />
                                    <AddressAutoComplete
                                        name="address"
                                        fullWidth
                                        label="Vendor Address"
                                        onPlaceSelected={({ formatted_address: formattedAddress, ...rest }) => {
                                            console.log('address', rest);
                                            setFieldValue('address', formattedAddress)
                                        }}
                                        {...getFieldProps('address')}
                                        error={Boolean(touched.address && errors.address)}
                                        helperText={touched.address && errors.address}
                                    />
                                    <TextField
                                        name="contactNo"
                                        fullWidth
                                        type="text"
                                        label="Vendor Contact No."
                                        {...getFieldProps('contactNo')}
                                        error={Boolean(touched.contactNo && errors.contactNo)}
                                        helperText={touched.contactNo && errors.contactNo}
                                    />
                                    <TextField
                                        name="contactPersonName"
                                        fullWidth
                                        type="text"
                                        label="Contact Person Name"
                                        {...getFieldProps('contactPersonName')}
                                        error={Boolean(touched.contactPersonName && errors.contactPersonName)}
                                        helperText={touched.contactPersonName && errors.contactPersonName}
                                    />
                                    <TextField
                                        name="contactPersonMobile"
                                        fullWidth
                                        type="text"
                                        label="Contact Person Mobile No."
                                        {...getFieldProps('contactPersonMobile')}
                                        error={Boolean(touched.contactPersonMobile && errors.contactPersonMobile)}
                                        helperText={touched.contactPersonMobile && errors.contactPersonMobile}
                                    />
                                    <TextField
                                        name="contactPersonEmail"
                                        fullWidth
                                        type="text"
                                        label="Contact Person Email"
                                        {...getFieldProps('contactPersonEmail')}
                                        error={Boolean(touched.contactPersonEmail && errors.contactPersonEmail)}
                                        helperText={touched.contactPersonEmail && errors.contactPersonEmail}
                                    />
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