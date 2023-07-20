import { string, object, ref } from 'yup';

import { RegisterValues } from '../types/register';

const registerValues: RegisterValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const registerValidationSchema = (isEditVersion: boolean) => {
  return object().shape({
    firstName: string().required('field_required'),
    lastName: string().required('field_required'),
    email: string()
      .required('field_required')
      .matches(/^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'valid_email'),
    password: isEditVersion
      ? string()
      : string()
          .required('field_required')
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            'pass_val'
          ),
    confirmPassword: isEditVersion
      ? string()
      : string()
          .required('field_required')
          .oneOf([ref('password')], 'password_must_match'),
  });
};

export { registerValues, registerValidationSchema };
