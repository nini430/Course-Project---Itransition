import { Box, Button, FormGroup } from '@mui/material';
import { Cancel, Save } from '@mui/icons-material';
import { useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';

import { useAppDispatch, useAppSelector } from '../../store/store';
import FormInput from '../../components/FormInput/FormInput';
import {
  initialValues,
  validationSchema,
} from '../../formik-validation/fullNameSettings';
import { ErrorMessage } from '../../components/shared/styles/FormStyles';
import { updateUserInfo } from '../../store/authReducer';
import { Toaster, toast } from 'react-hot-toast';
import toastOptions from '../../utils/toastOptions';

const FullNameSettings = () => {
  const dispatch = useAppDispatch();
  const { dirty, errors, values, handleChange, handleBlur, touched, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values) => {
        dispatch(
          updateUserInfo({
            input: values,
            update: 'fullName',
            onSuccess: (param: string) => {
              toast.success(`${param}_updated`, toastOptions);
            },
          })
        );
      },
    });
  const { authedUser, updateProfileLoading } = useAppSelector((state) => state.auth);
  const auth =
    authedUser || JSON.parse(localStorage.getItem('authed_user') as string);
  const { mode } = useAppSelector((state) => state.common);
  return (
    <>
      <Toaster />
      <form onSubmit={e=>{
        e.preventDefault();
        handleSubmit();
        
      }}>
        <FormInput
          mode={mode}
          onBlur={handleBlur}
          name="firstName"
          onChange={handleChange}
          value={values.firstName}
          error={!!(errors.firstName && touched.firstName)}
          type="text"
          placeholder={auth.firstName}
          errorMessage={errors.firstName as string}
          touched={touched.firstName as boolean}
        />
        <FormInput
          mode={mode}
          onBlur={handleBlur}
          error={!!(errors.lastName && touched.lastName)}
          onChange={handleChange}
          value={values.lastName}
          name="lastName"
          type="text"
          placeholder={auth.lastName}
          errorMessage={errors.lastName as string}
          touched={touched.lastName as boolean}
        />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <LoadingButton
          disabled={!dirty || Object.values(errors).length > 0 || updateProfileLoading}
          startIcon={<Save />}
          loading={updateProfileLoading}
          type='submit'
        >
          Save
        </LoadingButton>
        <Button startIcon={<Cancel />}>Cancel</Button>
      </Box>
      </form>
      
    </>
  );
};

export default FullNameSettings;
