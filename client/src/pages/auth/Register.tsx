import { useEffect, useState } from 'react';
import {
  Divider,
  Typography,
  FormGroup,
  Button,
} from '@mui/material';
import {  Home, PersonPin, Settings } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Toaster, toast } from 'react-hot-toast';
import PhoneInput from 'react-phone-input-2';

import {
  AuthContainer,
  AuthForm,
  ErrorMessage,
  TwoGridContainer,
} from './AuthStyles';
import StyledInput from '../../components/FormInput/FormInput';
import FormButton from '../../components/FormButton/FormButton';
import {
  registerValidationSchema,
  registerValues,
} from '../../formik-validation/register';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { registerUser } from '../../store/authReducer';
import toastOptions from '../../utils/toastOptions';
import BreadCrumb from '../../components/shared/BreadCrumb';
import { getUserById } from '../../store/userReducer';
import { addUser, editUser } from '../../store/adminReducer';
import GoogleImg from '../../assets/google.webp'
import { SERVER_BASE_URL } from '../../utils/constants';
import useResponsive from '../../hooks/useResponsive';
import SocialButton from '../../components/shared/SocialButton';

interface IRegisterProps {
  admin?: boolean;
  edit?: boolean;
}

const Register = ({ admin, edit }: IRegisterProps) => {
  const { userId } = useParams();
  const { currentProfile } = useAppSelector((state) => state.user);
  const [showPasswordArea, setShowPasswordArea] = useState(false);
  const [passType, setPassType] = useState<'text' | 'password'>('password');
  const [confirmPassType, setConfirmPassType] = useState<'text' | 'password'>(
    'password'
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (admin && edit && userId) {
      dispatch(getUserById(userId as string));
    }
  }, [dispatch, admin, edit, userId]);
  const {
    values,
    errors,
    handleBlur,
    handleSubmit,
    dirty,
    touched,
    setFieldValue,
    setFieldTouched,
  } = useFormik({
    initialValues:
      {
        firstName: currentProfile?.firstName as string,
        lastName: currentProfile?.lastName as string,
        email: currentProfile?.email as string,
        phoneNumber: currentProfile?.phoneNumber as string,
        phoneCountryCode: currentProfile?.phoneCountryCode as string,
        password: '',
        confirmPassword: '',
      } || registerValues,
    validationSchema: registerValidationSchema(!!(admin && edit)),
    onSubmit: (values) => {
      const onSuccess = () => {
        toast.success(
          admin && edit
            ? 'user_edited'
            : admin
            ? 'user_created'
            : 'register_success',
          toastOptions
        );
        setTimeout(() => {
          navigate(admin ? '/admin' : '/login');
        }, 2000);
      };
      admin && edit && userId
        ? dispatch(editUser({ userId, inputs: values, onSuccess }))
        : admin
        ? dispatch(addUser({ input: values, onSuccess }))
        : dispatch(
            registerUser({
              input: values,
              onSuccess,
            })
          );
    },
    enableReinitialize: true,
  }); 
  const { t } = useTranslation();
  const { mode } = useAppSelector((state) => state.common);
  const { authedUser } = useAppSelector((state) => state.auth);
  const userExists = authedUser || localStorage.getItem('authed_user');
  const { registerLoading } = useAppSelector((state) => state.auth);
  const {lg,sm,xl,xs}=useResponsive();

  useEffect(() => {
    if (userExists && !admin) {
      navigate('/');
    }
  }, [userExists, navigate, dispatch, admin]);

  return (
    <>
      <AuthContainer>
        <BreadCrumb
          paths={[
            { icon: Home, path: '/', title: t('breadcrumb.home') },
            { icon: PersonPin, path: '/register', title: t('auth.register') },
          ]}
        />
        <Toaster />
        <AuthForm
          isXS={xs}
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
            {admin && edit
              ? 'Edit User'
              : admin
              ? 'Add User'
              : t('auth.register')}
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
          <TwoGridContainer>
            <FormGroup sx={{ marginBottom: 2 }}>
              <StyledInput
                name="firstName"
                placeholder={t('auth.firstName') as string}
                type="text"
                value={values.firstName}
                onChange={(value) => setFieldValue('firstName', value)}
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
                onChange={(value) => setFieldValue('lastName', value)}
                onBlur={handleBlur}
                error={!!(errors.lastName && touched.lastName)}
                mode={mode}
              />
              {errors.lastName && touched.lastName && (
                <ErrorMessage>{t(`auth.${errors.lastName}`)}</ErrorMessage>
              )}
            </FormGroup>
          </TwoGridContainer>

          <FormGroup sx={{ marginBottom: 2 }}>
            <StyledInput
              name="email"
              placeholder={t('auth.email') as string}
              type="email"
              value={values.email}
              onChange={(value) => setFieldValue('email', value)}
              onBlur={handleBlur}
              error={!!(errors.email && touched.email)}
              mode={mode}
            />
            {errors.email && touched.email && (
              <ErrorMessage>{t(`auth.${errors.email}`)}</ErrorMessage>
            )}
          </FormGroup>
          <FormGroup sx={{ marginBottom: 2 }}>
            <PhoneInput
              inputStyle={{ width: '100%' }}
              onBlur={() => setFieldTouched('phoneNumber', true)}
              value={values.phoneNumber}
              onChange={(value: string, country: { countryCode: string }) => {
                setFieldValue('phoneNumber', value);
                setFieldValue('phoneCountryCode',country.countryCode.toUpperCase())
              }}
              isValid={!(touched.phoneNumber && errors.phoneNumber)}
            />
            {touched.phoneNumber && errors.phoneNumber && (
              <ErrorMessage>{errors.phoneNumber}</ErrorMessage>
            )}
          </FormGroup>
          {!(admin && edit && !showPasswordArea) ? (
            <>
              <TwoGridContainer>
                <FormGroup sx={{ marginBottom: 2 }}>
                  <StyledInput
                    name="password"
                    placeholder={t('auth.password') as string}
                    type={passType}
                    toggleType={() =>
                      setPassType(passType === 'password' ? 'text' : 'password')
                    }
                    value={values.password}
                    onChange={(value) => setFieldValue('password', value)}
                    onBlur={handleBlur}
                    error={!!(errors.password && touched.password)}
                    mode={mode}
                  />
                  {errors.password && touched.password && (
                    <ErrorMessage dangerouslySetInnerHTML={{__html:errors.password}}/>
                  )}
                </FormGroup>
                <FormGroup sx={{ marginBottom: 2 }}>
                  <StyledInput
                    name="confirmPassword"
                    placeholder={t('auth.confirm_password') as string}
                    type={confirmPassType}
                    toggleType={() =>
                      setConfirmPassType(
                        confirmPassType === 'password' ? 'text' : 'password'
                      )
                    }
                    value={values.confirmPassword}
                    onChange={(value) =>
                      setFieldValue('confirmPassword', value)
                    }
                    onBlur={handleBlur}
                    error={
                      !!(errors.confirmPassword && touched.confirmPassword)
                    }
                    mode={mode}
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <ErrorMessage>
                      {t(`auth.${errors.confirmPassword}`)}
                    </ErrorMessage>
                  )}
                </FormGroup>
              </TwoGridContainer>
            </>
          ) : (
            <Button
              onClick={() => setShowPasswordArea(true)}
              sx={{ border: '1px solid gray', margin: '5px 0' }}
              startIcon={<Settings />}
            >
              Change Password
            </Button>
          )}

          <FormButton
            loading={registerLoading}
            type="submit"
            disabled={!dirty || Object.values(errors).length > 0}
            variant="contained"
            text={
              admin && edit
                ? 'Edit User'
                : admin
                ? 'Add User'
                : t('auth.register')
            }
          />
          {!admin && (
            <SocialButton src={GoogleImg} social='google' form='register' onClick={()=>{
              window.open(`${SERVER_BASE_URL}/auth/google`,'_self');
            }}/>
          )}
          {!admin && (
            <Typography sx={{ alignSelf: 'center', my: '10px' }}>
              {t('auth.already_member')}{' '}
              <Link to="/login">{t('auth.login')}</Link>
            </Typography>
          )}
        </AuthForm>
      </AuthContainer>
    </>
  );
};

export default Register;
