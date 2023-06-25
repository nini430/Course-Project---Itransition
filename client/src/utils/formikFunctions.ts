import { object, string, number, date, boolean, array } from 'yup';

const generateItemValidationSchema = (formikFields: any) => {
  let validationSchema = object().shape({
    name: string().required('name_required'),
    tags: array()
      .of(string().required('field_required'))
      .required()
      .test({
        name: 'not Empty',
        test: (value) => value.length > 0,
        message: 'must_not_be_empty',
      }),
  }) as any;

  if (formikFields['integer']) {
    formikFields['integer'].map((item: any) => {
      validationSchema = validationSchema.shape({
        [item.name]: object().shape({
          type: string().required(),
          value: string().required('field_required'),
        }),
      });
    });
  }
  if (formikFields['string']) {
    formikFields['string'].map((item: any) => {
      validationSchema = validationSchema.shape({
        [item.name]: object().shape({
          type: string().required(),
          value: string().required('field_required'),
        }),
      });
    });
  }
  if (formikFields['multiline']) {
    formikFields['multiline'].map((item: any) => {
      validationSchema = validationSchema.shape({
        [item.name]: object().shape({
            type:string().required(),
            value: string().required('field_required')
        }),
      });
    });
  }
  if (formikFields['date']) {
    formikFields['date'].map((item: any) => {
      validationSchema = validationSchema.shape({
        [item.name]: object().shape({
            type:string().required(),
            value: date().required('field_required')
        })
      });
    });
  }
  if (formikFields['boolean']) {
    formikFields['boolean'].map((item: any) => {
      validationSchema = validationSchema.shape({
        [item.name]: object().shape({
            type:string().required(),
            value: boolean().required('field_required')
        }),
      });
    });
  }

  return validationSchema;
};

export default generateItemValidationSchema;
