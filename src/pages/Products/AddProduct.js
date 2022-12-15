import { Box, Grid, Stack, Paper, TextField } from '@mui/material';
import { FormikProvider, useFormik, Form } from 'formik'
import React from 'react'
import * as Yup from 'yup';
import Page from '../../components/Page';

const ProductSchema = Yup.object().shape({
    productName: Yup.string().min(5).max(50).required("Please enter product name")
});

const AddProduct = () => {
    const productForm = useFormik({
        initialValues: {
            productName: ''
        },
        validationSchema: ProductSchema,
        onSubmit: async (values, { setSubmitting }) => {

        }
    })
    // eslint-disable-next-line
    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = productForm;

    return (
        <Page
            title="Products | Merno"
            legend={`New Product`}
        >
            <FormikProvider value={productForm}>
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

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8} lg={8}>
                            <Paper>
                                <Stack
                                    direction="column"
                                    spacing={2}
                                >
                                    <TextField
                                        fullWidth
                                        type="text"
                                        label="Product Name"
                                        size="small"
                                        {...getFieldProps('productName')}
                                        error={Boolean(touched.productName && errors.productName)}
                                        helperText={touched.productName && errors.productName}
                                    />
                                </Stack>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper>
                                helo
                            </Paper>
                        </Grid>
                    </Grid>

                </Box>
            </FormikProvider>
        </Page>
    )
}

export default AddProduct