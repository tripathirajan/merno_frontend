import { Box, TextField, Stack, Button } from '@mui/material';
import { FormikProvider, useFormik, Form } from 'formik'
import React from 'react'
import * as Yup from 'yup';

const ProfileResetPassword = () => {
  const changePasswordForm = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    validationSchema: Yup.object().shape({
      currentPassword: Yup.string().min(8).max(22).required("Enter your current password."),
      newPassword: Yup.string().min(8).max(22).required("Enter new password."),
      confirmNewPassword: Yup.string().min(8).max(22).required("Confirm your new password.")
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => { }
  });
  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = changePasswordForm;

  return (
    <FormikProvider value={changePasswordForm}>
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