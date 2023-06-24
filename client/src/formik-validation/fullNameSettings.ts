import { ObjectSchema, object, string } from 'yup';
import { FullNameSettings } from '../types/settings';

const initialValues: FullNameSettings = {
  firstName: '',
  lastName: '',
};

const validationSchema: ObjectSchema<FullNameSettings> = object({
  firstName: string().required('firstName_required'),
  lastName: string().required('lastName_required'),
});

export { initialValues, validationSchema };
