import { Box, Grid, Stack, Paper, TextField, FormControlLabel, Switch, Button } from '@mui/material';
import { FormikProvider, useFormik, Form } from 'formik'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import * as Yup from 'yup';
import Page from '../../components/Page';
import { useDispatch, useSelector } from 'react-redux';
import { selectCombos } from '../../storage/slices/comboSlice';
import { getCombos } from '../../storage/actions/comboAction';
import AutoCompleteField from '../../components/AutoCompleteField';
import FileUploader from '../../components/FileUploader';
import { useNavigate } from 'react-router-dom';
import { addNewProduct } from '../../storage/actions/productAction';
import Toaster, { toastType } from '../../components/Toaster';

const CHAR_LIMIT = 200;

const ProductSchema = Yup.object().shape({
    productName: Yup.string().min(5).max(50).required("Please enter product name"),
    description: Yup.string().min(2).max(CHAR_LIMIT).required("Please enter product description."),
    sku: Yup.string().max(50).required("Enter product SKU"),
    upc: Yup.string().max(50).required("Enter product UPC"),
    vendor: Yup.string().required("Select product vendor"),
    brand: Yup.string().required("Select product brand"),
    productCategory: Yup.string().required("Select product category"),
    packageType: Yup.string().required("Select product package type"),
    stock: Yup.number().min(1).required("Enter the product in stock"),
    unit: Yup.string().required("Select Unit for measurement"),
    currency: Yup.string().required("Select currency"),
    salePrice: Yup.number().min(1).required("Enter the sale price of product."),
    regularPrice: Yup.number().min(1).required("Enter the regular/vendor price of product."),
    isActive: Yup.bool(),
    image: Yup.mixed().required('Product Image is mandatory.')
});

const combos = [
    { type: 'brand' },
    { type: 'vendor' },
    { type: 'packageType' },
    { type: 'productCategory' },
    { type: 'currency' },
    { type: 'unit' }
]
const alertInititialValue = { show: false, message: '', type: toastType.default };
const AddProduct = () => {
    const { productCategory = [], brand = [], packageType = [], unit = [], currency = [], vendor = [] } = useSelector(selectCombos);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const uploaderRef = useRef(null);
    const [descCounter, setDescCounter] = useState(CHAR_LIMIT);
    const [appAlert, setAppAlert] = useState(alertInititialValue)

    const productForm = useFormik({
        initialValues: {
            productName: '',
            description: '',
            sku: '',
            upc: '',
            vendor: '',
            brand: '',
            productCategory: '',
            packageType: '',
            stock: 1,
            unit: '',
            currency: '',
            salePrice: 1,
            regularPrice: 1,
            isActive: true
        },
        validationSchema: ProductSchema,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            if (!values) return false;

            const { success, message } = await dispatch(addNewProduct(values));
            if (success) {
                setAppAlert({ show: true, message: "Product created successfully.", type: toastType.success })
                resetForm();
                setFieldValue("image", null);
                uploaderRef?.current?.resetImages();
            } else {
                setAppAlert({ show: true, message, type: toastType.error });
            }
            setSubmitting(false);
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

    const handleAlertClose = () => {
        setAppAlert(alertInititialValue)
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
            <Toaster open={appAlert.show} horizontal="right" message={appAlert.message} type={appAlert.type} handleClose={handleAlertClose} />
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
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper sx={{ p: 2 }}>
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
                                        error={Boolean(errors.image)}
                                        helperText={errors.image}
                                        handleOnChangeFile={(files) => {
                                            setFieldValue("image", files && files[0]);
                                        }}
                                    />
                                </Stack>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={8} lg={8}>
                            <Paper sx={{ p: 2 }}>
                                <Stack
                                    spacing={2}
                                >
                                    <TextField
                                        fullWidth
                                        type="text"
                                        label="Product Name"
                                        size="small"
                                        name="productName"
                                        {...getFieldProps('productName')}
                                        error={Boolean(touched.productName && errors.productName)}
                                        helperText={touched.productName && errors.productName}
                                    />
                                    <Stack
                                        direction={{ xs: 'column', sm: 'column', md: 'row', lg: 'row' }}
                                        spacing={{ xs: 2, sm: 2, md: 1, lg: 1 }}
                                    >
                                        <TextField
                                            fullWidth
                                            type="text"
                                            label="SKU"
                                            size="small"
                                            name="sku"
                                            {...getFieldProps('sku')}
                                            error={Boolean(touched.sku && errors.sku)}
                                            helperText={touched.sku && errors.sku}
                                        />
                                        <TextField
                                            fullWidth
                                            type="text"
                                            label="UPC"
                                            size="small"
                                            name='upc'
                                            {...getFieldProps('upc')}
                                            error={Boolean(touched.upc && errors.upc)}
                                            helperText={touched.upc && errors.upc}
                                        />
                                    </Stack>
                                    <Stack
                                        direction={{ xs: 'column', sm: 'column', md: 'row', lg: 'row' }}
                                        spacing={{ xs: 2, sm: 2, md: 1, lg: 1 }}
                                    >
                                        <AutoCompleteField
                                            {...getFieldProps('vendor')}
                                            fullWidth
                                            name="vendor"
                                            label="Vendor"
                                            options={vendor}
                                            size="small"
                                            isDefaultRenderer={false}
                                            onChange={(e, { id }) => {
                                                setFieldValue('vendor', id)
                                            }}
                                            error={Boolean(touched.vendor && errors.vendor)}
                                            helperText={touched.vendor && errors.vendor}

                                        />
                                        <AutoCompleteField
                                            fullWidth
                                            name="brand"
                                            label="Brand"
                                            options={brand}
                                            size="small"
                                            {...getFieldProps('brand')}
                                            onChange={(e, { id }) => {
                                                setFieldValue('brand', id)
                                            }}
                                            error={Boolean(touched.brand && errors.brand)}
                                            helperText={touched.brand && errors.brand}
                                        />
                                    </Stack>
                                    <Stack
                                        direction={{ xs: 'column', sm: 'column', md: 'row', lg: 'row' }}
                                        spacing={{ xs: 2, sm: 2, md: 1, lg: 1 }}
                                    >
                                        <AutoCompleteField
                                            fullWidth
                                            name="productCategory"
                                            label="Product Category"
                                            options={productCategory}
                                            size="small"
                                            {...getFieldProps('productCategory')}
                                            onChange={(e, { id }) => {
                                                setFieldValue('productCategory', id)
                                            }}
                                            error={Boolean(touched.productCategory && errors.productCategory)}
                                            helperText={touched.productCategory && errors.productCategory}
                                        />
                                        <AutoCompleteField
                                            fullWidth
                                            name="packageType"
                                            label="Package Type"
                                            options={packageType}
                                            size="small"
                                            {...getFieldProps('packageType')}
                                            onChange={(e, { id }) => {
                                                setFieldValue('packageType', id)
                                            }}
                                            error={Boolean(touched.packageType && errors.packageType)}
                                            helperText={touched.packageType && errors.packageType}
                                        />
                                    </Stack>
                                    <Stack
                                        direction={{ xs: 'column', sm: 'column', md: 'row', lg: 'row' }}
                                        spacing={{ xs: 2, sm: 2, md: 1, lg: 1 }}
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
                                        <AutoCompleteField
                                            fullWidth
                                            name="unit"
                                            label="Unit"
                                            options={unit}
                                            size="small"
                                            {...getFieldProps('unit')}
                                            onChange={(e, { id }) => {
                                                setFieldValue('unit', id)
                                            }}
                                            error={Boolean(touched.unit && errors.unit)}
                                            helperText={touched.unit && errors.unit}
                                        />

                                    </Stack>
                                    <Stack
                                        direction={{ xs: 'column', sm: 'column', md: 'row', lg: 'row' }}
                                        spacing={{ xs: 2, sm: 2, md: 1, lg: 1 }}
                                    >
                                        <AutoCompleteField
                                            fullWidth
                                            name="currency"
                                            label="Currency"
                                            options={currency}
                                            size="small"
                                            {...getFieldProps('currency')}
                                            onChange={(e, { id }) => {
                                                setFieldValue('currency', id)
                                            }}
                                            error={Boolean(touched.currency && errors.currency)}
                                            helperText={touched.currency && errors.currency}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Regular Price"
                                            name="regularPrice"
                                            size="small"
                                            {...getFieldProps('regularPrice')}
                                            error={Boolean(touched.regularPrice && errors.regularPrice)}
                                            helperText={touched.regularPrice && errors.regularPrice}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Sale Price"
                                            name="salePrice"
                                            size="small"
                                            {...getFieldProps('salePrice')}
                                            error={Boolean(touched.salePrice && errors.salePrice)}
                                            helperText={touched.salePrice && errors.salePrice}
                                        />
                                    </Stack>
                                    <TextField
                                        fullWidth
                                        label="Description"
                                        multiline
                                        rows={5}
                                        name="description"
                                        {...getFieldProps('description')}
                                        onChange={(e) => {
                                            const { value } = e?.target;
                                            setFieldValue('description', value);
                                            const descLen = CHAR_LIMIT - (value?.length || 0);
                                            setDescCounter(descLen);
                                        }}
                                        error={Boolean(touched.description && errors.description)}
                                        helperText={(touched.description && errors.description) || `Character allowed ${descCounter}`}
                                    />
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
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                        disabled={isSubmitting}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        fullWidth
                                        type="button"
                                        variant="text"
                                        onClick={handleGoBack}
                                        disabled={isSubmitting}
                                    >
                                        Cancel
                                    </Button>
                                </Stack>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </FormikProvider>
        </Page>
    )
}

export default AddProduct