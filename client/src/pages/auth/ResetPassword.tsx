import styled from 'styled-components';
import { LoadingButton } from '@mui/lab';
import { FormGroup, Typography } from '@mui/material';
import { useFormik } from 'formik';

import { AuthForm } from './AuthStyles';
import { useAppSelector } from '../../store/store';
import FormInput from '../../components/FormInput/FormInput';
import {
  resetPasswordValidationSchema,
  resetPasswordValues,
} from '../../formik-validation/resetPassword';
import { ErrorMessage } from '../../components/shared/styles/FormStyles';

const ResetPassword = () => {
  const { mode } = useAppSelector((state) => state.common);
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
      console.log('submit');
    },
  });
  return (
    <Container>
      <AuthForm onSubmit={(e:SubmitEvent)=>{
        e.preventDefault();
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
