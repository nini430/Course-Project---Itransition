import { useEffect, useState } from 'react';
import { Divider, Typography, FormGroup } from '@mui/material';
import { PersonPin } from '@mui/icons-material';
import { useMediaQuery } from 'react-responsive';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Toaster, toast } from 'react-hot-toast';

import { AuthContainer, AuthForm, ErrorMessage } from './AuthStyles';
import StyledInput from '../../components/FormInput/FormInput';
import FormButton from '../../components/FormButton/FormButton';
import {
  registerValidationSchema,
  registerValues,
} from '../../formik-validation/register';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { registerUser } from '../../store/authReducer';
import toastOptions from '../../utils/toastOptions';

const Register = () => {
  const [passType,setPassType]=useState<'text'|'password'>('password');
  const [confirmPassType,setConfirmPassType]=useState<'text'|'password'>('password');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    dirty,
    touched,
  } = useFormik({
    initialValues: registerValues,
    validationSchema: registerValidationSchema,
    onSubmit: (values) => {
      dispatch(
        registerUser({
          input: values,
          onSuccess: () => {
            toast.success(t('auth.register_success'), toastOptions);
            setTimeout(() => {
              navigate('/login');
            }, 2000);
          },
        })
      );
    },
  });
  const { t } = useTranslation();
  const { mode } = useAppSelector((state) => state.common);
  const { authedUser } = useAppSelector((state) => state.auth);
  const userExists = authedUser || localStorage.getItem('authed_user');
  const { registerLoading } = useAppSelector((state) => state.auth);
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });
  const isBigScreen = useMediaQuery({ minWidth: 1824 });
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
  const isExtraSmallDevice = useMediaQuery({ maxWidth: 500 });

  useEffect(()=>{
    if(userExists) {
      navigate('/');
    }
  },[userExists,navigate]);
  return (
    <>
      <AuthContainer>
        <Toaster />
        <AuthForm
          isXS={isExtraSmallDevice}
          isX={isBigScreen}
          isMob={isTabletOrMobile}
          isD={isDesktopOrLaptop}
          mode={mode}
          onSubmit={(e: SubmitEvent) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Typography sx={{ alignSelf: 'center', fontSize: 20 }}>
            {t('auth.register')}
          </Typography>
          <PersonPin
            sx={{
              alignSelf: 'center',
              width: 40,
              height: 40,
              color: 'primary.main',
            }}
          />
          <Divider sx={{ my: '20px' }} />
          <FormGroup sx={{ marginBottom: 2 }}>
            <StyledInput
              name="firstName"
              placeholder={t('auth.firstName') as string}
              type="text"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!(errors.firstName && touched.firstName)}
              mode={mode}
            />
            {errors.firstName && touched.firstName && (
              <ErrorMessage>{t(`auth.${errors.firstName}`)}</ErrorMessage>
            )}
          </FormGroup>
          <FormGroup sx={{ marginBottom: 2 }}>
            <StyledInput
              name="lastName"
              placeholder={t('auth.lastName') as string}
              type="text"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!(errors.lastName && touched.lastName)}
              mode={mode}
            />
            {errors.lastName && touched.lastName && (
              <ErrorMessage>{t(`auth.${errors.lastName}`)}</ErrorMessage>
            )}
          </FormGroup>
          <FormGroup sx={{ marginBottom: 2 }}>
            <StyledInput
              name="email"
              placeholder={t('auth.email') as string}
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!(errors.email && touched.email)}
              mode={mode}
            />
            {errors.email && touched.email && (
              <ErrorMessage>{t(`auth.${errors.email}`)}</ErrorMessage>
            )}
          </FormGroup>
          <FormGroup sx={{ marginBottom: 2 }}>
            <StyledInput
              name="password"
              placeholder={t('auth.password') as string}
              type={passType}
              toggleType={()=>setPassType(passType==='password'?'text':'password')}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!(errors.password && touched.password)}
              mode={mode}
            />
            {errors.password && touched.password && (
              <ErrorMessage>{t(`auth.${errors.password}`)}</ErrorMessage>
            )}
          </FormGroup>
          <FormGroup sx={{ marginBottom: 2 }}>
            <StyledInput
              name="confirmPassword"
              placeholder={t('auth.confirm_password') as string}
              type={confirmPassType}
              toggleType={()=>setConfirmPassType(confirmPassType==='password'?'text':'password')}
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!(errors.confirmPassword && touched.confirmPassword)}
              mode={mode}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <ErrorMessage>{t(`auth.${errors.confirmPassword}`)}</ErrorMessage>
            )}
          </FormGroup>
          <FormButton
            loading={registerLoading}
            type="submit"
            disabled={!dirty || Object.values(errors).length > 0}
            variant="contained"
            text={t('auth.register')}
          />
          <Typography sx={{ alignSelf: 'center', my: '10px' }}>
            {t('auth.already_member')}{' '}
            <Link to="/login">{t('auth.login')}</Link>
          </Typography>
        </AuthForm>
      </AuthContainer>
    </>
  );
};

export default Register;
