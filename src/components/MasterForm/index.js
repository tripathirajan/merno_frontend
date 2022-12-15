import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, FormikProvider, useFormik } from 'formik'
import * as Yup from 'yup';
import { Box, TextField, Stack, Button, FormControlLabel, Switch } from '@mui/material';
import AppModal from '../AppModal';
import { useDispatch } from 'react-redux';
import AppAlert from '../Alert';
import { ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS } from '../../constants';

const alertInititialValue = { body: '', severity: ALERT_TYPE_ERROR };

const MasterForm = ({ open, title, formSaveAction, onFormClose, data }) => {
    const { id, ...editData } = data || {};

    const dispatch = useDispatch();
    const [appAlert, setAppAlert] = useState(alertInititialValue)

    const formSchema = {
        name: Yup.string().min(2).max(100).required('Please enter the name.'),
        description: Yup.string().min(10).max(200).required('Please enter the description.'),
        isActive: Yup.bool()
    };
    const initialValues = {
        name: editData?.name || '',
        description: editData?.description || '',
        isActive: editData?.isActive || false
    };
    const validateSchema = Yup.object().shape({ ...formSchema });
    const masterFormik = useFormik({
        initialValues: initialValues,
        validationSchema: validateSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            const { name, description, isActive } = values;
            if (!name || !description) {
                return null;
            }
            if (!formSaveAction) {
                setSubmitting(false);
                return null;
            }
            let payload = { name, description, isActive };
            if (id) {
                payload = { id, ...payload };
            }
            const { success, message } = await dispatch(formSaveAction(payload));
            if (success) {
                setAppAlert({ body: message, severity: ALERT_TYPE_SUCCESS });
                resetForm();
            } else {
                setAppAlert({ body: message, severity: ALERT_TYPE_ERROR });
            }
            setSubmitting(false);
            setTimeout(() => {
                setAppAlert(alertInititialValue);
                if (success) {
                    onFormClose(true)
                }
            }, 2000);
        }
    })

    const { errors, values, touched, isSubmitting, handleSubmit, getFieldProps } = masterFormik;

    return (
        <AppModal title={title} open={open} handleClose={() => onFormClose(false)}>
            <FormikProvider value={masterFormik}>
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
                    <Stack spacing={2}>
                        {
                            appAlert && appAlert.body && <AppAlert body={appAlert?.body} severity={appAlert.severity} />
                        }
                        <TextField
                            fullWidth
                            name="name"
                            type="text"
                            label="Name"
                            size="small"
                            {...getFieldProps('name')}
                            error={Boolean(touched.name && errors.name)}
                            helperText={touched.name && errors.name}
                        />
                        <TextField
                            fullWidth
                            name="description"
                            label="Description"
                            size='small'
                            {...getFieldProps('description')}
                            error={Boolean(touched.description && errors.description)}
                            helperText={touched.description && errors.description}
                        />
                        <FormControlLabel
                            label="Is Active?"
                            labelPlacement="start"
                            control={
                                <Switch color='secondary' checked={values.isActive} name="isActive" {...getFieldProps('isActive')} />
                            }
                        />
                        <Stack
                            direction={'row-reverse'}
                            spacing={2}
                        >
                            <Button
                                fullWidth
                                size="normal"
                                type="submit"
                                variant="contained"
                                color="secondary"
                                disabled={isSubmitting}
                            >
                                Save
                            </Button>
                            <Button
                                fullWidth
                                size="normal"
                                type="button"
                                variant="text"
                                onClick={() => {
                                    onFormClose()
                                }}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </FormikProvider>
        </AppModal>
    )
}

MasterForm.prototype = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    formSaveAction: PropTypes.func.isRequired,
    onFormClose: PropTypes.func.isRequired,
    data: PropTypes.object
}
export default MasterForm;