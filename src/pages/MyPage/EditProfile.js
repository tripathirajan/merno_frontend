import { Box, Button, Stack, TextField, Typography, styled, Avatar } from '@mui/material';
import { FormikProvider, useFormik, Form } from 'formik';
import * as Yup from 'yup';

const ProfilePicPreview = styled(Avatar)(({ theme }) => ({
    width: '64px',
    height: '64px',
    border: `2px solid ${theme.palette.primary.main}`,
    padding: theme.spacing(1)
}))


const EditProfile = () => {
    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            image: '',
        },
        validationSchema: Yup.object().shape({
            fullName: Yup.string().min(2).max(200).required("Full name cann't be empty"),
            email: Yup.string().email("Please enter valid email"),
            image: Yup.mixed().required()
        }),
        onSubmit: async (values, { setSubmitting, resetForm }) => { }
    });
    const { errors, values, touched, isSubmitting, handleSubmit, getFieldProps } = formik;
    return (
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
                <Stack spacing={2} sx={{ mt: 3 }}>
                    <Stack
                        direction={'row'}
                        alignItems={'center'}
                        spacing={2}
                    >
                        <ProfilePicPreview
                            src={'e'}
                        />
                        <Stack
                            direction='column'
                            spacing={1}
                        >
                            <Stack direction="row" spacing={1}>
                                <Button variant='outlined' size="small" component="label">Change
                                    <input hidden accept="image/*" type="file" />
                                </Button>
                                <Button varient='text' size="small" color="inherit">Remove</Button>
                            </Stack>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>Recommended dimensions: 200x200, maximum file size: 5MB</Typography>
                        </Stack>
                    </Stack>
                    <TextField
                        fullWidth
                        placeholder='Enter your full name'
                        autoComplete="name"
                        type={'text'}
                        label="Full Name"
                        size='small'
                        value={values.fullNames || ''}
                        {...getFieldProps('fullName')}
                        error={Boolean(touched.fullName && errors.fullName)}
                        helperText={touched.fullName && errors.fullName}
                    />
                    <TextField
                        fullWidth
                        placeholder='Enter your email'
                        autoComplete="email"
                        type={'email'}
                        label="Work Email"
                        size='small'
                        {...getFieldProps('email')}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                    />
                    <Stack direction={'row'}>
                        <Button type="submit" variant='contained' color="secondary" disabled={isSubmitting}>Save Changes</Button>
                    </Stack>
                </Stack>
            </Box>
        </FormikProvider >
    )
}

export default EditProfile;