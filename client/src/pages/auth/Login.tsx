import { Divider, Typography, FormGroup } from '@mui/material';
import { LockClockRounded } from '@mui/icons-material';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useFormik } from 'formik';

import { AuthContainer, AuthForm, ErrorMessage, PropertyContainer } from './AuthStyles';
import FormButton from '../../components/FormButton/FormButton';
import LanguageDropDown from '../../components/LanguageDropDown/LanguageDropDown';
import StyledInput from '../../components/FormInput/FormInput'
import {
  loginValidationSchema,
  loginValues,
} from '../../formik-validation/login';
import ModeSwitch from '../../components/ModeSwitch/ModeSwitch';
import { useAppSelector } from '../../store/store';

const Login = () => {
  const {
    values,
    errors,
    dirty,
    handleSubmit,
    touched,
    handleChange,
    handleBlur,
  } = useFormik({
    initialValues: loginValues,
    validationSchema: loginValidationSchema,
    onSubmit: () => {
      console.log('submit');
    },
  });
  const {mode}=useAppSelector(state=>state.common);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const { t } = useTranslation();
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });
  const isBigScreen = useMediaQuery({ minWidth: 1824 });
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
  const isExtraSmallDevice = useMediaQuery({ maxWidth: 500 });
  return (
    <>
     
      <PropertyContainer>
      <ModeSwitch/>
      <LanguageDropDown
        open={isDropDownOpen}
        onOpen={() => setIsDropDownOpen(true)}
        onClose={() => setIsDropDownOpen(false)}
      />
      </PropertyContainer>
     
      <AuthContainer>
        <AuthForm
          isXS={isExtraSmallDevice}
          isX={isBigScreen}
          isMob={isTabletOrMobile}
          isD={isDesktopOrLaptop}
          mode={mode}
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
          <FormGroup sx={{ marginBottom: 2 }}>
            <StyledInput
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              error={!!(touched.email && errors.email)}
              name="email"
              placeholder="E-mail"
              type="email"
              mode={mode}
            />
            {touched.email && errors.email && (
              <ErrorMessage>{errors.email}</ErrorMessage>
            )}
          </FormGroup>
          <FormGroup sx={{ marginBottom: 2 }}>
            <StyledInput
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              error={!!(errors.password && touched.password)}
              name="password"
              placeholder="Password"
              type="password"
              mode={mode}
            />
            {touched.password && errors.password && (
              <ErrorMessage>{errors.password}</ErrorMessage>
            )}
          </FormGroup>
          <FormButton  type="submit" onSubmit={handleSubmit} disabled={!dirty || Object.values(errors).length>0} variant="contained" text="Sign In" />
          <Typography
            sx={{ alignSelf: 'center', my: '10px' }}
          >
            Not have an account?{' '}
            <Link to="/register">
              Sign Up
            </Link>
          </Typography>
        </AuthForm>
      </AuthContainer>
    </>
  );
};

export default Login;
