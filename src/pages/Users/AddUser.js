import React from 'react'
import Page from '../../components/Page';
import { useNavigate } from 'react-router-dom';
import { FormikProvider, useFormik, Form } from 'formik';
import { Box, Container, Paper, Stack, TextField, FormControlLabel, Switch, Button } from '@mui/material';
import * as Yup from 'yup';
import AutoCompleteField from '../../components/AutoCompleteField';
import usePassword from '../../hooks/usePassword';
import { useDispatch } from 'react-redux';
import { showToast } from '../../storage/slices/uiSlices';
import { toastType } from '../../components/Toaster';
import { addNewUser } from '../../storage/actions/userAction';

const UserSchema = Yup.object().shape({
    fullName: Yup.string().min(2).max(100).required("Please enter full name"),
    username: Yup.string().min(5).max(100).required("Please enter username."),
    email: Yup.string().email("Please enter valid email").required("Please enter user's email."),
    password: Yup.string().min(8).max(22).required("Choose a password for user."),
    role: Yup.string().required("user must have assigned a role."),
    isActive: Yup.bool()
})
const AddUser = () => {
    const navigate = useNavigate();
    const generatePassword = usePassword();
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            fullName: '',
            username: '',
            email: '',
            password: '',
            isActive: true,
            role: ''
        },
        validationSchema: UserSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            if (!values) return false;
            const { success, message } = await dispatch(addNewUser(values));
            if (success) {
                dispatch(showToast({ message: "User created successfully.", type: toastType.success }))
                resetForm();
                navigate('/user-mgt');
            } else {
                dispatch(showToast({ message, type: toastType.error }))
            }
            setSubmitting(false);
        }
    });
    // eslint-disable-next-line
    const { errors, touched, values, isSubmitting, setFieldValue, handleSubmit, getFieldProps } = formik;

    const handleGeneratePassword = () => {
        const newPassword = generatePassword(8, 15);
        setFieldValue('password', newPassword);
    }
    return (
        <Page
            title="Add New User | Merno"
            legend="New User"
            enableGoBack={true}
        >
            <FormikProvider value={formik}>
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
                    <Container maxWidth="sm">
                        <Paper variant="outlined" sx={{ p: 2 }}>
                            <Stack
                                spacing={2}
                            >
                                <TextField
                                    fullWidth
                                    type="text"
                                    label="Full Name"
                                    size="small"
                                    name="fullName"
                                    {...getFieldProps('fullName')}
                                    value={values?.fullName || ''}
                                    error={Boolean(touched.fullName && errors.fullName)}
                                    helperText={touched.fullName && errors.fullName}
                                />
                                <TextField
                                    fullWidth
                                    type="text"
                                    label="Username"
                                    autoComplete="off"
                                    size="small"
                                    name="username"
                                    value={values?.username || ''}
                                    {...getFieldProps('username')}
                                    error={Boolean(touched.username && errors.username)}
                                    helperText={touched.username && errors.username}
                                />
                                <TextField
                                    fullWidth
                                    type="text"
                                    label="Email"
                                    size="small"
                                    name="email"
                                    value={values?.email || ''}
                                    {...getFieldProps('email')}
                                    error={Boolean(touched.email && errors.email)}
                                    helperText={touched.email && errors.email}
                                />
                                <Stack direction="row" spacing={1}>
                                    <TextField
                                        fullWidth
                                        placeholder='Enter your password'
                                        autoComplete="off"
                                        type={'password'}
                                        label="Password"
                                        size='small'
                                        value={values?.password || ''}
                                        {...getFieldProps('password')}
                                        error={Boolean(touched.password && errors.password)}
                                        helperText={touched.password && errors.password}
                                    />
                                    <Box sx={{ flexGrow: 1 }} />
                                    <Button
                                        fullWidth
                                        onClick={handleGeneratePassword}
                                        size="small" variant='contained'
                                        color='inherit'>
                                        Generate
                                    </Button>
                                </Stack>
                                <AutoCompleteField
                                    {...getFieldProps('role')}
                                    fullWidth
                                    name="role"
                                    label="Role"
                                    options={[{ id: "User", label: 'User' }, { id: 'Admin', label: 'Admin' }]}
                                    size="small"
                                    onChange={(e, { id }) => {
                                        setFieldValue('role', id)
                                    }}
                                    error={Boolean(touched.role && errors.role)}
                                    helperText={touched.role && errors.role}
                                />
                                <FormControlLabel
                                    sx={{ width: '150px' }}
                                    control={<Switch color='secondary' checked={values.isActive} name="isActive" {...getFieldProps('isActive')} />}
                                    label="Is Active?"
                                    labelPlacement="start"
                                />
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
                                        color="secondary"
                                        onClick={() => { navigate(-1) }}
                                        disabled={isSubmitting}
                                    >
                                        Cancel
                                    </Button>
                                </Stack>
                            </Stack>
                        </Paper>
                    </Container>
                </Box>
            </FormikProvider>
        </Page>
    )
}

export default AddUser;