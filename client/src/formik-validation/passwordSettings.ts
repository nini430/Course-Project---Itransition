import { ObjectSchema, object, ref, string } from 'yup';
import { PasswordSettings } from '../types/settings';

const initialValues: PasswordSettings = {
  oldPassword:'',
  password:'',
  confirmPassword:''
};

const validationSchema: ObjectSchema<PasswordSettings> = object({
  oldPassword: string().required('old_password_required'),
  password: string().required('password_required'),
  confirmPassword: string().required('confirm_password_required').oneOf([ref('password')],'password_must_match')
});

export { initialValues, validationSchema };
