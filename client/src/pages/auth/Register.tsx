import { Divider, Typography, FormGroup } from '@mui/material';
import { PersonPin } from '@mui/icons-material';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useFormik } from 'formik';

import { AuthContainer, AuthForm, ErrorMessage } from './AuthStyles';
import StyledInput from '../../components/FormInput/FormInput';
import FormButton from '../../components/FormButton/FormButton';
import LanguageDropDown from '../../components/LanguageDropDown/LanguageDropDown';
import {
  registerValidationSchema,
  registerValues,
} from '../../formik-validation/register';

const Register = () => {
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
    onSubmit: () => {
      console.log('submit');
    },
  });
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const { t } = useTranslation();
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });
  const isBigScreen = useMediaQuery({ minWidth: 1824 });
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
  const isExtraSmallDevice = useMediaQuery({ maxWidth: 500 });
  return (
    <>
      <LanguageDropDown
        open={isDropDownOpen}
        onOpen={() => setIsDropDownOpen(true)}
        onClose={() => setIsDropDownOpen(false)}
      />
      <AuthContainer>
        <AuthForm
          isXS={isExtraSmallDevice}
          isX={isBigScreen}
          isMob={isTabletOrMobile}
          isD={isDesktopOrLaptop}
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
              placeholder="First Name"
              type="text"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!(errors.firstName && touched.firstName)}
            />
          {errors.firstName && touched.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage> }  
          </FormGroup>
          <FormGroup sx={{ marginBottom: 2 }}>
            <StyledInput
              name="lastName"
              placeholder="Last Name"
              type="text"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!(errors.lastName && touched.lastName)}
            />
             {errors.lastName && touched.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage> }
          </FormGroup>
          <FormGroup sx={{ marginBottom: 2 }}>
            <StyledInput
              name="email"
              placeholder="E-mail"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!(errors.email && touched.email)}
            />
             {errors.email && touched.email && <ErrorMessage>{errors.email}</ErrorMessage> }
          </FormGroup>
          <FormGroup sx={{ marginBottom: 2 }}>
            <StyledInput
              name="password"
              placeholder="Password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!(errors.password && touched.password)}
            />
             {errors.password && touched.password && <ErrorMessage>{errors.password}</ErrorMessage> }
          </FormGroup>
          <FormGroup sx={{ marginBottom: 2 }}>
            <StyledInput
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!(errors.confirmPassword && touched.confirmPassword)}
            />
             {errors.confirmPassword && touched.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage> }
          </FormGroup>
          <FormButton onSubmit={handleSubmit} type="submit" disabled={!dirty || Object.values(errors).length>0 } variant="contained" text="Sign Up" />
          <Typography
            sx={{ alignSelf: 'center', my: '10px', color: 'primary.main' }}
          >
            Already A member?{' '}
            <Link to="/login">
              <span>Sign In</span>
            </Link>
          </Typography>
        </AuthForm>
      </AuthContainer>
    </>
  );
};

export default Register;
