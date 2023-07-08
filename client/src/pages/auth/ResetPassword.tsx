import styled from 'styled-components';
import { LoadingButton } from '@mui/lab';
import { FormGroup, Typography } from '@mui/material';
import { useFormik } from 'formik';
import {Toaster,toast} from 'react-hot-toast'

import { AuthForm } from './AuthStyles';
import { useAppDispatch, useAppSelector } from '../../store/store';
import FormInput from '../../components/FormInput/FormInput';
import {
  resetPasswordValidationSchema,
  resetPasswordValues,
} from '../../formik-validation/resetPassword';
import { ErrorMessage } from '../../components/shared/styles/FormStyles';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { resetPassword, resetPasswordAction } from '../../store/authReducer';
import toastOptions from '../../utils/toastOptions';

const ResetPassword = () => {
  const {resetPasswordLoading}=useAppSelector(state=>state.auth);
  const { mode } = useAppSelector((state) => state.common);
  const {token}=useParams();
  const {search}=useLocation();
  const userId=search.split('=')[1];
  const dispatch=useAppDispatch();
  const navigate=useNavigate();
  const {
    dirty,
    errors,
    values,
    setFieldValue,
    handleBlur,
    handleSubmit,
    touched,
  } = useFormik({
    initialValues: resetPasswordValues,
    validationSchema: resetPasswordValidationSchema,
    onSubmit: () => {
      dispatch(resetPasswordAction({newPassword:values.newPassword,userId,onSuccess:(message)=>{
          toast.success(message,toastOptions);
          setTimeout(()=>{
            navigate('/login');
          },2000)
          
      }}))
    },
  });
  useEffect(()=>{
    dispatch(resetPassword({userId,token:token as string,onSuccess:(isExpired:boolean)=>{
        if(isExpired) {
          navigate('/expired')
        }
    }}))
  },[dispatch,navigate,token,userId,values.newPassword])
  return (
    <Container>
      <Toaster/>
      <AuthForm onSubmit={(e:SubmitEvent)=>{
        e.preventDefault();
        handleSubmit();
      }} mode={mode}>
        <Typography sx={{ fontSize: 20, textAlign: 'center' }}>
          Reset Password
        </Typography>
        <FormGroup sx={{ mb: 2 }}>
          <FormInput
            type="password"
            onChange={(value) => setFieldValue('newPassword', value)}
            value={values.newPassword}
            name="newPassword"
            error={!!(errors.newPassword && touched.newPassword)}
            onBlur={handleBlur}
            placeholder="new_password"
            mode={mode}
          />
          {errors.newPassword && touched.newPassword && (
            <ErrorMessage>{errors.newPassword}</ErrorMessage>
          )}
        </FormGroup>
        <FormGroup sx={{ mb: 2 }}>
          <FormInput
            error={!!(errors.confirmNewPassword && touched.confirmNewPassword)}
            onBlur={handleBlur}
            value={values.confirmNewPassword}
            onChange={(value) => setFieldValue('confirmNewPassword', value)}
            name="confirmNewPassword"
            type="password"
            placeholder="repeat_new_password"
            mode={mode}
          />
          {errors.confirmNewPassword && touched.confirmNewPassword && <ErrorMessage>{errors.confirmNewPassword}</ErrorMessage>}
        </FormGroup>
        <LoadingButton
        type='submit'
          loading={resetPasswordLoading}
          disabled={!dirty || Object.keys(errors).length > 0}
          sx={{ border: '1px solid gray' }}
        >
          Reset
        </LoadingButton>
      </AuthForm>
    </Container>
  );
};

const Container = styled.div`
  min-height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ResetPassword;
