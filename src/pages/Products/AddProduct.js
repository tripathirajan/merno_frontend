import { Box, Grid, Stack, Paper, TextField, FormControlLabel, Switch, Typography, Button } from '@mui/material';
import { FormikProvider, useFormik, Form } from 'formik'
import React, { useCallback, useEffect, useRef } from 'react'
import * as Yup from 'yup';
import Page from '../../components/Page';
import { useDispatch, useSelector } from 'react-redux';
import { selectCombos } from '../../storage/slices/comboSlice';
import { getCombos } from '../../storage/actions/comboAction';
import AutoCompleteField from '../../components/AutoCompleteField';
import FileUploader from '../../components/FileUploader';
import { useNavigate } from 'react-router-dom';

const ProductSchema = Yup.object().shape({
    productName: Yup.string().min(5).max(50).required("Please enter product name"),
    description: Yup.string().min(2).max(200).required("Please enter product description."),
    isActive: Yup.bool()
});

const combos = [
    { type: 'brand' },
    { type: 'vendor' },
    { type: 'packageType' },
    { type: 'productCategory' },
    { type: 'currency' },
    { type: 'unit' }
]
const AddProduct = () => {
    const { productCategory, brand, packageType, unit, currency, vendor } = useSelector(selectCombos);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const uploaderRef = useRef(null);

    const productForm = useFormik({
        initialValues: {
            productName: '',
            description: '',
            isActive: false
        },
        validationSchema: ProductSchema,
        onSubmit: async (values, { setSubmitting }) => {

        }
    })
    // eslint-disable-next-line
    const { errors, touched, values, isSubmitting, setFieldValue, handleSubmit, getFieldProps } = productForm;

    const loadCombos = useCallback(() => {
        dispatch(getCombos(combos))
    }, [dispatch]);

    const handleGoBack = () => {
        navigate('/product');
    }

    useEffect(() => {
        loadCombos();
    }, [loadCombos]);

    return (
        <Page
            title="Products | Merno"
            legend={`New Product`}
            onBackClick={handleGoBack}
        >
            <Paper sx={{ p: 2 }}>
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
                            <Grid item xs={12} md={5} lg={5}>
                                <Stack
                                    spacing={2}
                                >
                                    <FormControlLabel
                                        control={<Switch color='secondary' checked={values.isActive} name="isActive" {...getFieldProps('isActive')} />}
                                        label="Is Active?"
                                        labelPlacement="start"
                                    />
                                    <FileUploader
                                        ref={uploaderRef}
                                        name="image"
                                        handleOnChangeFile={(files) => {
                                            setFieldValue("image", files && files[0]);
                                        }}
                                    />
                                    {
                                        Boolean(touched.image && errors.image) ? <Typography variant="body2" color="error">{touched.image && errors.image}</Typography> : null
                                    }
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={7} lg={7}>
                                <Stack

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
                                    <TextField
                                        fullWidth
                                        label="Description"
                                        multiline
                                        rows={5}
                                        {...getFieldProps('description')}
                                        error={Boolean(touched.description && errors.description)}
                                        helperText={touched.description && errors.description}
                                    />
                                    <AutoCompleteField name="vendor" label="Vendor" options={vendor} size="small" isDefaultRenderer={false} {...getFieldProps('vendor')} />
                                    <AutoCompleteField name="productCategory" label="Product Category" options={productCategory} size="small" {...getFieldProps('productCategory')} />
                                    <AutoCompleteField name="packageType" label="PackageType" options={packageType} size="small" {...getFieldProps('packageType')} />
                                    <AutoCompleteField name="brand" label="Brand" options={brand} size="small" {...getFieldProps('brand')} />
                                    <AutoCompleteField name="unit" label="Unit" options={unit} size="small" {...getFieldProps('unit')} />
                                    <AutoCompleteField name="currency" label="Currency" options={currency} size="small" {...getFieldProps('currency')} />
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                    >
                                        <TextField
                                            fullWidth
                                            label="Stock"
                                            name="stock"
                                            size="small"
                                            {...getFieldProps('stock')}
                                            error={Boolean(touched.stock && errors.stock)}
                                            helperText={touched.stock && errors.stock}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Stock"
                                            name="stock"
                                            size="small"
                                            {...getFieldProps('stock')}
                                            error={Boolean(touched.stock && errors.stock)}
                                            helperText={touched.stock && errors.stock}
                                        />
                                    </Stack>
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                    >
                                        <TextField
                                            fullWidth
                                            label="Regular price"
                                            name="regularPrice"
                                            size="small"
                                            {...getFieldProps('regularPrice')}
                                            error={Boolean(touched.regularPrice && errors.regularPrice)}
                                            helperText={touched.regularPrice && errors.regularPrice}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Sale price"
                                            name="salePrice"
                                            size="small"
                                            {...getFieldProps('salePrice')}
                                            error={Boolean(touched.salePrice && errors.salePrice)}
                                            helperText={touched.salePrice && errors.salePrice}
                                        />
                                    </Stack>
                                </Stack>
                                <Stack
                                    sx={{ mt: 3 }}
                                    direction="row-reverse"
                                    justifyContent="space-around"
                                    alignItems="center"
                                    spacing={2}
                                >
                                    <Button
                                        fullWidth
                                        size="medium"
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                        disabled={isSubmitting}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        fullWidth
                                        size="medium"
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
                    </Box>
                </FormikProvider>
            </Paper>
        </Page>
    )
}

export default AddProduct