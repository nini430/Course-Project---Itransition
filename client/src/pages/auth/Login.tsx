import { useEffect, useState } from 'react';
import { Divider, Typography, FormGroup } from '@mui/material';
import { Home, LockClockRounded } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import {Toaster} from 'react-hot-toast'

import { AuthContainer, AuthForm, ErrorMessage } from './AuthStyles';
import FormButton from '../../components/FormButton/FormButton';
import StyledInput from '../../components/FormInput/FormInput';
import {
  loginValidationSchema,
  loginValues,
} from '../../formik-validation/login';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { loginUser } from '../../store/authReducer';
import BreadCrumb from '../../components/shared/BreadCrumb';
import GoogleImg from '../../assets/google.webp'
import { SERVER_BASE_URL } from '../../utils/constants';
import useResponsive from '../../hooks/useResponsive';
import SocialButton from '../../components/shared/SocialButton';

const Login = () => {
  const [passType,setPassType]=useState<'text'|'password'>('password')
  const { authedUser } = useAppSelector((state) => state.auth);
  const userExists = authedUser || localStorage.getItem('authed_user');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (userExists) {
      navigate('/');
    }
  }, [userExists, navigate,dispatch]);
  const {
    values,
    errors,
    dirty,
    handleSubmit,
    touched,
    handleChange,
    handleBlur,
    setFieldValue
  } = useFormik({
    initialValues: loginValues,
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      dispatch(
        loginUser({
          input: values,
          onSuccess: () => {
            navigate('/');
          },
        })
      );
    },
  });
  const { mode } = useAppSelector((state) => state.common);
  const { loginLoading } = useAppSelector((state) => state.auth);
  const { t } = useTranslation();
  const {xs,sm,xl,lg}=useResponsive();

  return (
    <>
   
      <AuthContainer>
      <BreadCrumb paths={[{path:'/',title:t('breadcrumb.home'),icon:Home},{path:'/login',title:t('auth.login'),icon:LockClockRounded}]}/>
        <Toaster/>
        <AuthForm
          S={xs}
          isX={xl}
          isMob={sm}
          isD={lg}
          mode={mode}
          onSubmit={(e: SubmitEvent) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Typography sx={{ alignSelf: 'center', fontSize: 20 }}>
            {t('auth.login')}
          </Typography>
          <LockClockRounded
            sx={{
              alignSelf: 'center',
              width: 40,
              height: 40,
              color: 'primary.main',
            }}
          />
          <Divider sx={{ my: '20px' }} />
            <StyledInput
              value={values.email}
              onBlur={handleBlur}
              onChange={(value)=>setFieldValue('email',value)}
              error={!!(touched.email && errors.email)}
              name="email"
              placeholder={t('auth.email') as string}
              type="email"
              mode={mode}
              errorMessage={errors.email as string}
              touched={touched.email as boolean}
            />
            <StyledInput
              value={values.password}
              onBlur={handleBlur}
              onChange={(value)=>setFieldValue('password',value)}
              error={!!(errors.password && touched.password)}
              name="password"
              placeholder={t('auth.password') as string}
              type={passType}
              toggleType={()=>setPassType(passType==='password'?'text':'password')}
              mode={mode}
              errorMessage={errors.password as string}
              touched={touched.password as boolean}
            />
          <SocialButton onClick={()=>window.open(`${SERVER_BASE_URL}/auth/google`,'_self')} form='login' social='google' src={GoogleImg} />
          <FormButton
            loading={loginLoading}
            type="submit"
            disabled={!dirty || Object.values(errors).length > 0}
            variant="contained"
            text={t('auth.login')}
          />
          <Link style={{alignSelf:'center'}} to='/forgot-password'>
          <Typography style={{textDecoration:'underline'}} >Forgot Password?</Typography></Link>
          
          <Typography sx={{ alignSelf: 'center', my: '10px' }}>
            {t('auth.not_account')}{' '}
            <Link to="/register">{t('auth.register')}</Link>
          </Typography>
        </AuthForm>
      </AuthContainer>
    </>
  );
};

export default Login;
