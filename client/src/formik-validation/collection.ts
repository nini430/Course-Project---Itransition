import { string, object } from 'yup';
import { CollectionValues } from '../types/collection';

const collectionValues: CollectionValues = {
  name: '',
  description: '',
  topic: '',
};

const collectionValidationSchema = (topics: string[]) =>
  object({
    name: string().required('field_required'),
    description: string().required('field_required'),
    topic: string()
      .required('field_required')
      .oneOf(topics, 'only_those_values'),
  });

export { collectionValidationSchema, collectionValues };
