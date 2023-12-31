import styled from 'styled-components';
import { Typography } from '@mui/material';
import { useFormik } from 'formik';

import { AuthForm } from './AuthStyles';
import { useAppDispatch, useAppSelector } from '../../store/store';
import FormInput from '../../components/FormInput/FormInput';
import { LoadingButton } from '@mui/lab';
import {
  forgetPasswordValidationSchema,
  forgetPasswordValues,
} from '../../formik-validation/forgotPassword';
import { forgotPassword } from '../../store/authReducer';
import { toast, Toaster} from 'react-hot-toast';
import toastOptions from '../../utils/toastOptions';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate=useNavigate();
  const dispatch=useAppDispatch();
  const {forgetPasswordLoading}=useAppSelector(state=>state.auth);
  const { mode } = useAppSelector((state) => state.common);
  const { dirty, values, errors, setFieldValue, handleBlur, touched, handleSubmit } =
    useFormik({
      initialValues: forgetPasswordValues,
      validationSchema: forgetPasswordValidationSchema,
      onSubmit: (values) => {
        dispatch(forgotPassword({email:values.email,onSuccess:(message:string)=>{
            toast.success(message,toastOptions);
            setTimeout(()=>{
              navigate('/login');
            },2000);    
        }}))
      },
    });
  return (
    <Container>
      <Toaster/>
      <AuthForm onSubmit={(e:SubmitEvent)=>{
         e.preventDefault();
         handleSubmit();
      }} mode={mode}>
        <Typography sx={{ textAlign: 'center', fontSize: 20, mb: 2 }}>
          Forgot Password
        </Typography>
        <FormInput
          value={values.email}
          name="email"
          onBlur={handleBlur}
          onChange={(value) => setFieldValue('email', value)}
          type="email"
          error={!(errors.email && touched.email)}
          placeholder="JohnDoe@gmail.com"
          mode={mode}
          errorMessage={errors.email as string}
          touched={touched.email as boolean}
        />
        <LoadingButton
          loading={forgetPasswordLoading}
          disabled={!dirty || Object.keys(errors).length > 0}
          type="submit"
          sx={{ border: '1px solid gray', mt: 2 }}
        >
          Submit
        </LoadingButton>
      </AuthForm>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  min-height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default ForgotPassword;
