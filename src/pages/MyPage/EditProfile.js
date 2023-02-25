import { Box, Button, Stack, TextField, Typography, styled, Avatar } from '@mui/material';
import { FormikProvider, useFormik, Form } from 'formik';
import { useCallback, useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';
import { IMAGE_ACTION_NONE, IMAGE_ACTION_RESET, IMAGE_ACTION_UPDATE } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserProfile } from '../../storage/slices/userSlice';
import { updateUserProfile } from '../../storage/actions/userAction';
import Toaster, { toastType } from '../../components/Toaster';

const ProfilePicPreview = styled(Avatar)(({ theme }) => ({
    width: '72px',
    height: '72px'
}))

const alertInititialValue = { show: false, message: '', type: toastType.default }

const EditProfile = () => {
    const userInfo = useSelector(selectUserProfile);
    const dispatch = useDispatch();
    const [appAlert, setAppAlert] = useState(alertInititialValue);

    const initialValues = useMemo(() => {
        return {
            fullName: userInfo?.fullName,
            email: userInfo?.email,
            image: null,
            imageAction: 'none'
        }
    }, [userInfo]);
    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object().shape({
            fullName: Yup.string().min(2).max(200).required("Full name cann't be empty"),
            email: Yup.string().email("Please enter valid email"),
            image: Yup.mixed(),
            imageAction: Yup.string().oneOf([IMAGE_ACTION_NONE, IMAGE_ACTION_RESET, IMAGE_ACTION_UPDATE])
        }),
        onSubmit: async (values, { setSubmitting }) => {
            const { success } = await dispatch(updateUserProfile(values));
            setSubmitting(false);
            if (!success) {
                setAppAlert({ show: true, message: 'Profile not updated', type: toastType.error })
                return;
            };
            setAppAlert({ show: true, message: 'Profile updated successfully!', type: toastType.success })
        }
    });
    const { errors, values, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

    const handleImageChange = useCallback((event) => {
        if (!event) return;
        const { target: { files = [] } } = event;
        let uploadedFile = files[0];
        if (!uploadedFile) return;
        uploadedFile = Object.assign(uploadedFile, {
            preview: URL.createObjectURL(uploadedFile)
        });
        setFieldValue("image", uploadedFile);
        setFieldValue("imageAction", IMAGE_ACTION_UPDATE);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setFieldValue("imageAction", IMAGE_ACTION_NONE);
        // eslint-disable-next-line
    }, [])
    let imageURL = useMemo(() => {
        return values?.imageAction === IMAGE_ACTION_RESET ? '' : (values?.image?.preview || userInfo?.image);
    }, [values, userInfo]);

    const handleAlertClose = () => {
        setAppAlert(alertInititialValue)
    }
    const handleRemoveImage = () => {
        imageURL = '';
        setFieldValue("image", null);
        setFieldValue("imageAction", IMAGE_ACTION_RESET);
        console.log('reset image')
        console.log(imageURL);
    }

    return (
        <FormikProvider value={formik}>
            <Toaster open={appAlert.show} horizontal="right" message={appAlert.message} type={appAlert.type} handleClose={handleAlertClose} />
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
                        sx={{ mb: 2 }}
                    >
                        <ProfilePicPreview
                            src={imageURL}
                        />
                        <Stack
                            direction='column'
                            spacing={1}
                        >
                            <Stack direction="row" spacing={1}>
                                <Button variant='outlined' size="small" component="label">Change
                                    <input hidden accept="image/*" type="file" onChange={handleImageChange} />
                                </Button>
                                <Button varient='text' size="small" color="inherit" onClick={handleRemoveImage}>Remove</Button>
                                <input type='text' name='imageAction' value={values?.imageAction} hidden  {...getFieldProps('imageAction')} />
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
                        value={values?.fullName || ''}
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