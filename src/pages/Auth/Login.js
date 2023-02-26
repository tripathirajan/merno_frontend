import React, { useState } from 'react'
import {
    Typography, Stack, Box,
    Checkbox,
    TextField,
    FormControlLabel,
    Button,
    Link,
} from '@mui/material';
import { NavLink as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik'
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../../storage/actions/authAction';
import AppAlert from '../../components/Alert';
import { PageWithTitle } from '../../components/Page';

const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required')
});

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState('')
    const location = useLocation();
    const { state } = location;
    const { redirectTo = '/dashboard' } = state || {};

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            remember: true
        },
        validationSchema: LoginSchema,
        onSubmit: async (values, { setSubmitting }) => {
            const { success, message } = await dispatch(login({ username: values.username, password: values.password }));
            // console.log('login-result', success, message);
            setSubmitting(false)
            if (success) {
                navigate(redirectTo);
            } else {
                setErrMsg(message);
                setTimeout(() => {
                    setErrMsg('')
                }, 5000)
            }
        }
    });
    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

    return (
        <PageWithTitle
            title="Login | Merno"
        >
            <Stack
                direction="column"
                spacing={3}
            >
                <Box>
                    <Typography variant='h4' color="secondary">
                        Welcome to MERNO
                    </Typography>
                    <Typography variant='caption' sx={{ color: 'text.secondary', mt: 1 }}>
                        Sign in to your account
                    </Typography>
                </Box>
                {
                    errMsg && <AppAlert body={errMsg} />
                }
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
                        <Stack spacing={3}>
                            <TextField
                                fullWidth
                                placeholder='Enter username or email'
                                autoComplete="username"
                                type="username"
                                label="Username"
                                size="small"
                                {...getFieldProps('username')}
                                error={Boolean(touched.username && errors.username)}
                                helperText={touched.username && errors.username}
                            />
                            <TextField
                                fullWidth
                                placeholder='Enter your password'
                                autoComplete="current-password"
                                type={'password'}
                                label="Password"
                                size='small'
                                {...getFieldProps('password')}
                                error={Boolean(touched.password && errors.password)}
                                helperText={touched.password && errors.password}
                            />
                        </Stack>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                            <FormControlLabel
                                control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
                                label="Remember me"
                            />

                            <Link component={RouterLink} variant="subtitle2" to="/forgotPassword">
                                Forgot password?
                            </Link>
                        </Stack>
                        <Button
                            fullWidth
                            size="normal"
                            type="submit"
                            variant="contained"
                            color="secondary"
                            disabled={isSubmitting}
                        >
                            Login
                        </Button>
                    </Box>
                </FormikProvider>
            </Stack>
        </PageWithTitle>
    )
}

export default Login