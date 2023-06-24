import { Box, Button, FormGroup } from '@mui/material';
import { Cancel, ErrorOutline, Save } from '@mui/icons-material';
import { useFormik } from 'formik';

import { useAppSelector } from '../../store/store';
import FormInput from '../../components/FormInput/FormInput';
import {
  initialValues,
  validationSchema,
} from '../../formik-validation/passwordSettings';
import { ErrorMessage } from '../../components/shared/styles/FormStyles';

const PasswordSettings = () => {
  const { dirty, errors, values, handleChange, handleBlur, touched } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values) => {
        console.log('submit');
      },
    });
  const { mode } = useAppSelector((state) => state.common);
  const { authedUser } = useAppSelector((state) => state.auth);
  const auth =
    authedUser || JSON.parse(localStorage.getItem('authed_user') as string);
  return (
    <>
      <FormGroup sx={{ mb: 2 }}>
        <FormInput
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          mode={mode}
          name="oldPassword"
          error={!!(errors.oldPassword && touched.oldPassword)}
          type="password"
        />
        {touched.oldPassword && errors.oldPassword && (
          <ErrorMessage>{errors.oldPassword}</ErrorMessage>
        )}
      </FormGroup>
      <FormGroup sx={{ mb: 2 }}>
        <FormInput
          mode={mode}
          onBlur={handleBlur}
          error={!!(errors.password && touched.password)}
          onChange={handleChange}
          value={values.password}
          type="password"
          name="password"
        />
        {touched.password && errors.password && (
          <ErrorMessage>{errors.password}</ErrorMessage>
        )}
      </FormGroup>
      <FormGroup>
        <FormInput
          mode={mode}
          onBlur={handleBlur}
          error={!!(errors.confirmPassword && touched.password)}
          onChange={handleChange}
          value={values.confirmPassword}
          type="password"
          name="confirmPassword"
        />
        {touched.confirmPassword && errors.confirmPassword && (
          <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
        )}
      </FormGroup>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <Button disabled={!dirty || Object.values(errors).length>0} startIcon={<Save />}>Save</Button>
        <Button startIcon={<Cancel />}>Cancel</Button>
      </Box>
    </>
  );
};

export default PasswordSettings;
