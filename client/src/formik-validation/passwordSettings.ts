import { ObjectSchema, object, ref, string } from 'yup';
import { PasswordSettings } from '../types/settings';

const initialValues: PasswordSettings = {
  oldPassword:'',
  password:'',
  confirmPassword:''
};

const validationSchema: ObjectSchema<PasswordSettings> = object({
  oldPassword: string().required('field_required'),
  password: string().required('field_required'),
  confirmPassword: string().required('field_required').oneOf([ref('password')],'password_must_match')
});

export { initialValues, validationSchema };
