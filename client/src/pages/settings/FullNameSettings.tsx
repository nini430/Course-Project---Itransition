import { Box, Button, FormGroup } from '@mui/material';
import { Cancel, Save } from '@mui/icons-material';
import { useFormik } from 'formik';

import { useAppSelector } from '../../store/store';
import FormInput from '../../components/FormInput/FormInput';
import {
  initialValues,
  validationSchema,
} from '../../formik-validation/fullNameSettings';
import { ErrorMessage } from '../../components/shared/styles/FormStyles';

const FullNameSettings = () => {
  const { dirty, errors, values, handleChange, handleBlur, touched } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values) => {
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
        mode={mode}
        onBlur={handleBlur}
        name="firstName"
        onChange={handleChange}
        value={values.firstName}
        error={!!(errors.firstName && touched.firstName)}
        type="text"
        placeholder={auth.firstName}
      />
      {errors.firstName && touched.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage> }
    </FormGroup>
      <FormGroup sx={{mb:2}}>
      <FormInput
        mode={mode}
        onBlur={handleBlur}
        error={!!(errors.lastName && touched.lastName)}
        onChange={handleChange}
        value={values.lastName}
        name="lastName"
        type="text"
        placeholder={auth.lastName}
      />
      {errors.lastName && touched.lastName && <ErrorMessage> {errors.lastName}</ErrorMessage>}
      </FormGroup>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <Button disabled={!dirty || Object.values(errors).length>0} startIcon={<Save />}>Save</Button>
        <Button startIcon={<Cancel />}>Cancel</Button>
      </Box>
    </>
  );
};



export default FullNameSettings;
