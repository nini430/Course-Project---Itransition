import { ObjectSchema, object, string } from 'yup';

interface ForgetPasswordValues {
  email: string;
}

const forgetPasswordValues: ForgetPasswordValues = {
  email: '',
};

const forgetPasswordValidationSchema: ObjectSchema<ForgetPasswordValues> =
  object({
    email: string()
      .required('email_required')
      .matches(/^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'valid_email'),
  });

export { forgetPasswordValues, forgetPasswordValidationSchema };
