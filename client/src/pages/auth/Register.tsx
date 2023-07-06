import { useEffect, useState } from 'react';
import {
  Divider,
  Typography,
  FormGroup,
  Button,
  ButtonGroup,
} from '@mui/material';
import { GitHub, Google, Home, PersonPin, Settings } from '@mui/icons-material';
import { useMediaQuery } from 'react-responsive';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
import { registerUser, setAuthedUser } from '../../store/authReducer';
import toastOptions from '../../utils/toastOptions';
import BreadCrumb from '../../components/shared/BreadCrumb';
import { getUserById } from '../../store/userReducer';
import { addUser, editUser } from '../../store/adminReducer';
import { LoadingButton } from '@mui/lab';
import Loading from '../../components/Loading/Loading';

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
  } = useFormik({
    initialValues:
      {
        firstName: currentProfile?.firstName as string,
        lastName: currentProfile?.lastName as string,
        email: currentProfile?.email as string,
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
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });
  const isBigScreen = useMediaQuery({ minWidth: 1824 });
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
  const isExtraSmallDevice = useMediaQuery({ maxWidth: 500 });

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
          {!(admin && edit && !showPasswordArea) ? (
            <>
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
                  <ErrorMessage>{t(`auth.${errors.password}`)}</ErrorMessage>
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
                  onChange={(value) => setFieldValue('confirmPassword', value)}
                  onBlur={handleBlur}
                  error={!!(errors.confirmPassword && touched.confirmPassword)}
                  mode={mode}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <ErrorMessage>
                    {t(`auth.${errors.confirmPassword}`)}
                  </ErrorMessage>
                )}
              </FormGroup>
              {admin && edit && (
                <ButtonGroup sx={{ mb: '5px' }}>
                  <Button size="small" sx={{ border: '1px solid gray' }}>
                    Save password changes
                  </Button>
                  <Button
                    onClick={() => setShowPasswordArea(false)}
                    size="small"
                    sx={{ border: '1px solid gray' }}
                  >
                    Cancel
                  </Button>
                </ButtonGroup>
              )}
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
          {!admin && <LoadingButton sx={{border:'1px solid gray'}} startIcon={<Google/>}>Sign Up With Google</LoadingButton>}
          {!admin && <LoadingButton  sx={{border:'1px solid gray'}} startIcon={<GitHub/>}>Sign Up with Github</LoadingButton>}
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
