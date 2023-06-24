import { Box, Button, FormGroup } from '@mui/material';
import { Cancel, Save } from '@mui/icons-material';
import { useFormik } from 'formik';

import { useAppSelector } from '../../store/store';
import FormInput from '../../components/FormInput/FormInput';
import {
  initialValues,
  validationSchema,
} from '../../formik-validation/emailSettings';
import { ErrorMessage } from '../../components/shared/styles/FormStyles';

const EmailSettings = () => {
  const { dirty, errors, values, handleChange, handleBlur, touched } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: () => {
        console.log('submit');
      },
    });
  const { authedUser } = useAppSelector((state) => state.auth);
  const auth =
    authedUser || JSON.parse(localStorage.getItem('authed_user') as string);
  const { mode } = useAppSelector((state) => state.common);
  return (
    <>
    <FormGroup sx={{mb:2}}>
    <FormInput
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.email}
        name="email"
        type="email"
        error={!!(touched.email && errors.email)}
        mode={mode}
        placeholder={auth.email}
      />
      {errors.email && touched.email && <ErrorMessage>{errors.email}</ErrorMessage>}
    </FormGroup>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <Button
          disabled={!dirty || Object.values(errors).length > 0}
          startIcon={<Save />}
        >
          Save
        </Button>
        <Button startIcon={<Cancel />}>Cancel</Button>
      </Box>
    </>
  );
};

export default EmailSettings;
