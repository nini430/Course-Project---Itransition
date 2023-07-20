import { ObjectSchema, object, string, ref } from 'yup';

interface ResetPasswordValues {
  newPassword: string;
  confirmNewPassword: string;
}

const resetPasswordValues: ResetPasswordValues = {
  newPassword: '',
  confirmNewPassword: '',
};

const resetPasswordValidationSchema: ObjectSchema<ResetPasswordValues> = object(
  {
    newPassword: string().required('field_required'),
    confirmNewPassword: string()
      .required('field_required')
      .oneOf([ref('newPassword')], 'password_must_match'),
  }
);

export { resetPasswordValidationSchema, resetPasswordValues };
