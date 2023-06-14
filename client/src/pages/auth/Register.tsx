import { Divider, Typography, FormGroup } from '@mui/material';
import { PersonPin } from '@mui/icons-material';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useFormik } from 'formik';

import { AuthContainer, AuthForm, ErrorMessage, PropertyContainer } from './AuthStyles';
import StyledInput from '../../components/FormInput/FormInput';
import FormButton from '../../components/FormButton/FormButton';
import LanguageDropDown from '../../components/LanguageDropDown/LanguageDropDown';
import {
  registerValidationSchema,
  registerValues,
} from '../../formik-validation/register';
import ModeSwitch from '../../components/ModeSwitch/ModeSwitch';
import { useAppSelector } from '../../store/store';

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
  const {mode}=useAppSelector(state=>state.common);
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
          {errors.firstName && touched.firstName && <ErrorMessage>{t(`auth.${errors.firstName}`)}</ErrorMessage> }  
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
             {errors.lastName && touched.lastName && <ErrorMessage>{t(`auth.${errors.lastName}`)}</ErrorMessage> }
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
             {errors.email && touched.email && <ErrorMessage>{t(`auth.${errors.email}`)}</ErrorMessage> }
          </FormGroup>
          <FormGroup sx={{ marginBottom: 2 }}>
            <StyledInput
              name="password"
              placeholder={t('auth.password') as string}
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!(errors.password && touched.password)}
              mode={mode}
            />
             {errors.password && touched.password && <ErrorMessage>{t(`auth.${errors.password}`)}</ErrorMessage> }
          </FormGroup>
          <FormGroup sx={{ marginBottom: 2 }}>
            <StyledInput
              name="confirmPassword"
              placeholder={t('auth.confirm_password') as string}
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!(errors.confirmPassword && touched.confirmPassword)}
              mode={mode}
            />
             {errors.confirmPassword && touched.confirmPassword && <ErrorMessage>{t(`auth.${errors.confirmPassword}`)}</ErrorMessage> }
          </FormGroup>
          <FormButton onSubmit={handleSubmit} type="submit" disabled={!dirty || Object.values(errors).length>0 } variant="contained" text={t('auth.register')} />
          <Typography
            sx={{ alignSelf: 'center', my: '10px' }}
          >
         {t('auth.already_member')}{' '}
            <Link to="/login">
              {t('auth.login')}
            </Link>
          </Typography>
        </AuthForm>
      </AuthContainer>
    </>
  );
};

export default Register;
