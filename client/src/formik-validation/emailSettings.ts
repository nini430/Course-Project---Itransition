import { ObjectSchema, object, string } from 'yup';
import { EmailSettings } from '../types/settings';

const initialValues: EmailSettings = {
  email:''
};

const validationSchema: ObjectSchema<EmailSettings> = object({
  email:string().required('email_required').matches(/^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'valid_email')
});

export { initialValues, validationSchema };

