import React, { useState } from 'react'
import {
    Typography, Stack, Box,
    Checkbox,
    TextField,
    FormControlLabel,
    Button,
    Link,
} from '@mui/material';
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik'
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../../storage/actions/authAction';
import AppAlert from '../../components/Alert';

const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required')
});

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState('')
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
                navigate('/dashboard')
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
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={3}
        >
            <Typography variant='h4' component="h2" color="secondary">
                Merno | Login
            </Typography>
            <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                Enter your credentials to continue
            </Typography>
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

    )
}

export default Login