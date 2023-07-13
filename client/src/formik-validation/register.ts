import { string, object, ref } from 'yup';
import { CountryCode, format, isValidNumber } from 'libphonenumber-js';

import { RegisterValues } from '../types/register';

const registerValues: RegisterValues = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
  phoneCountryCode:'GE'
};

const validatePhoneNumber = (value: string, country: string) => {
  const phoneNumber = value.replace(/\D/g, '');
  console.log(country);
  if (!isValidNumber(phoneNumber, country as CountryCode)) {
    return false;
  }
  return true;
};

const registerValidationSchema = (isEditVersion: boolean) => {
  return object().shape({
    firstName: string().required('first_name_required'),
    lastName: string().required('last_name_required'),
    phoneCountryCode: string().required(),
    email: string()
      .required('email_required')
      .matches(/^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'valid_email'),
    phoneNumber: string()
      .required('phone_required').test({name:'phone',message:'invalid_phone',test:(value,context)=>validatePhoneNumber(value,context.parent.phoneCountryCode)}),
    password: isEditVersion ? string() : string().required('password_required'),
    confirmPassword: isEditVersion
      ? string()
      : string()
          .required('confirm_password_required')
          .oneOf([ref('password')], 'passwords_must_match'),
        
  });
};

export { registerValues, registerValidationSchema };
