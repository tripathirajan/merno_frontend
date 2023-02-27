import { Box, TextField, Stack, Button } from '@mui/material';
import { FormikProvider, useFormik, Form } from 'formik'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { resetPassword } from '../../storage/actions/userAction';
import Toaster, { toastType } from '../../components/Toaster';

const alertInititialValue = { show: false, message: '', type: toastType.default }

const ProfileResetPassword = () => {
  const dispatch = useDispatch();
  const [appAlert, setAppAlert] = useState(alertInititialValue);
  const changePasswordForm = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    validationSchema: Yup.object().shape({
      currentPassword: Yup.string().min(8).max(22).required("Enter your current password."),
      newPassword: Yup.string().notOneOf([Yup.ref('currentPassword'), null], "New password can't be same as current password.").min(8).max(22).required("Enter new password."),
      confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords not matching.')
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const { success, message } = await dispatch(resetPassword(values));
      setSubmitting(false);
      resetForm();
      if (!success) {
        setAppAlert({ show: true, message, type: toastType.error })
        return;
      };
      setAppAlert({ show: true, message: 'Profile updated successfully!', type: toastType.success })
    }
  });
  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = changePasswordForm;

  const handleAlertClose = () => {
    setAppAlert(alertInititialValue)
  }
  return (
    <FormikProvider value={changePasswordForm}>
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
        <Stack spacing={2}>
          <TextField
            fullWidth
            placeholder='Enter your current password'
            autoComplete="current-password"
            type={'password'}
            label="Current Password"
            size='small'
            {...getFieldProps('currentPassword')}
            error={Boolean(touched.currentPassword && errors.currentPassword)}
            helperText={touched.currentPassword && errors.currentPassword}
          />
          <TextField
            fullWidth
            placeholder='Enter your new password'
            autoComplete="new-password"
            type={'password'}
            label="New Password"
            size='small'
            {...getFieldProps('newPassword')}
            error={Boolean(touched.newPassword && errors.newPassword)}
            helperText={touched.newPassword && errors.newPassword}
          />
          <TextField
            fullWidth
            placeholder='Enter to confirm your new password'
            autoComplete="confirm-password"
            type={'password'}
            label="Confirm new password"
            size='small'
            {...getFieldProps('confirmNewPassword')}
            error={Boolean(touched.confirmNewPassword && errors.confirmNewPassword)}
            helperText={touched.confirmNewPassword && errors.confirmNewPassword}
          />
          <Stack direction="row">
            <Button type="submit" variant='contained' color="secondary" disabled={isSubmitting}>Change Password</Button>
          </Stack>
        </Stack>
      </Box>
    </FormikProvider>
  )
}

export default ProfileResetPassword