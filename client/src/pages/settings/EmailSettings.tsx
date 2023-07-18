import { Box, Button, FormGroup } from '@mui/material';
import { Cancel, Save } from '@mui/icons-material';
import { useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import { Toaster, toast } from 'react-hot-toast';

import { useAppDispatch, useAppSelector } from '../../store/store';
import FormInput from '../../components/FormInput/FormInput';
import {
  initialValues,
  validationSchema,
} from '../../formik-validation/emailSettings';
import { ErrorMessage } from '../../components/shared/styles/FormStyles';
import { updateUserInfo } from '../../store/authReducer';
import toastOptions from '../../utils/toastOptions';

const EmailSettings = () => {
  const dispatch = useAppDispatch();
  const {
    dirty,
    errors,
    values,
    handleChange,
    handleBlur,
    touched,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log('yes!')
      dispatch(
        updateUserInfo({
          input: values,
          update: 'email',
          onSuccess: (param: string) => {
            toast.success(`${param}_updated`, toastOptions);
          },
        })
      );
    },
  });
  const { authedUser, updateProfileLoading } = useAppSelector(
    (state) => state.auth
  );
  const auth =
    authedUser || JSON.parse(localStorage.getItem('authed_user') as string);
  const { mode } = useAppSelector((state) => state.common);
  return (
    <>
      <Toaster />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
          <FormInput
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
            name="email"
            type="email"
            error={!!(touched.email && errors.email)}
            mode={mode}
            placeholder={auth.email}
            errorMessage={errors.email as string}
            touched={touched.email as boolean}
          />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <LoadingButton
          disabled={
            !dirty || Object.values(errors).length > 0 || updateProfileLoading
          }
          startIcon={<Save />}
          loading={updateProfileLoading}
          type="submit"
        >
          Save
        </LoadingButton>
        <Button startIcon={<Cancel />}>Cancel</Button>
      </Box>
      </form>

      
    </>
  );
};

export default EmailSettings;
