import { Box, Button, FormGroup } from '@mui/material';
import { Cancel, Save } from '@mui/icons-material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import {LoadingButton} from '@mui/lab'

import { useAppDispatch, useAppSelector } from '../../store/store';
import FormInput from '../../components/FormInput/FormInput';
import {
  initialValues,
  validationSchema,
} from '../../formik-validation/passwordSettings';
import { ErrorMessage } from '../../components/shared/styles/FormStyles';
import { PassType } from '../../types/common';
import { updateUserInfo } from '../../store/authReducer';
import toastOptions from '../../utils/toastOptions';

const PasswordSettings = () => {
  const dispatch = useAppDispatch();
  const [oldPassType, setOldPasstype] = useState<PassType>('password');
  const [passType, setPassType] = useState<PassType>('password');
  const [newPassType, setNewPassType] = useState<PassType>('password');
  const {
    dirty,
    errors,
    values,
    handleChange,
    handleBlur,
    touched,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(
        updateUserInfo({
          input: {password:values.oldPassword,newPassword:values.password},
          update: 'password',
          onSuccess: (param: string) => {
            toast.success(`${param}_updated`, toastOptions);
            
          },
        })
      );
    },
  });
  const { mode } = useAppSelector((state) => state.common);
  const { authedUser, updateProfileLoading } = useAppSelector((state) => state.auth);
  const auth =
    authedUser || JSON.parse(localStorage.getItem('authed_user') as string);
  return (
    <>
    <Toaster/>
      <form onSubmit={(e)=>{
        e.preventDefault();
        handleSubmit();
      }}>
          <FormInput
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.oldPassword}
            mode={mode}
            name="oldPassword"
            error={!!(errors.oldPassword && touched.oldPassword)}
            type={oldPassType}
            toggleType={() =>
              setOldPasstype(oldPassType === 'password' ? 'text' : 'password')
            }
            errorMessage={errors.oldPassword as string}
            touched={touched.oldPassword as boolean}
          />
          <FormInput
            mode={mode}
            onBlur={handleBlur}
            error={!!(errors.password && touched.password)}
            onChange={handleChange}
            value={values.password}
            type={passType}
            toggleType={() =>
              setPassType(passType === 'password' ? 'text' : 'password')
            }
            name="password"
            errorMessage={errors.password as string}
            touched={touched.password as boolean}
          />
          <FormInput
            mode={mode}
            onBlur={handleBlur}
            error={!!(errors.confirmPassword && touched.password)}
            onChange={handleChange}
            value={values.confirmPassword}
            type={newPassType}
            toggleType={() =>
              setNewPassType(newPassType === 'password' ? 'text' : 'password')
            }
            name="confirmPassword"
            errorMessage={errors.confirmPassword as string}
            touched={touched.confirmPassword as boolean}
          />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <LoadingButton
            disabled={!dirty || Object.values(errors).length > 0 || updateProfileLoading}
            startIcon={<Save />}
            loading={updateProfileLoading}
            type='submit'
          >
            Save
          </LoadingButton>
          <Button startIcon={<Cancel />}>Cancel</Button>
        </Box>
      </form>
    </>
  );
};

export default PasswordSettings;
