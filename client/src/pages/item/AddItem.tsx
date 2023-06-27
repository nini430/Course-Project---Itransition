import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import { LoadingButton } from '@mui/lab';
import {
  Autocomplete,
  Checkbox,
  CircularProgress,
  FormGroup,
  TextField,
  Typography,
  FormLabel,
} from '@mui/material';
import moment from 'moment'
import { createFilterOptions } from '@mui/material/Autocomplete';
import { DatePicker } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useFormik } from 'formik';
import { toast, Toaster } from 'react-hot-toast';

import { Form } from '../commonStyles';
import { useAppDispatch, useAppSelector } from '../../store/store';
import FormInput from '../../components/FormInput/FormInput';
import { AddCircle, Edit } from '@mui/icons-material';
import Loading from '../../components/Loading/Loading';
import { useEffect, useRef } from 'react';
import {
  addItem,
  editItem,
  getItemTags,
  getSingleItem,
  initializeItemConfig,
} from '../../store/itemReducer';
import generateItemValidationSchema from '../../utils/formikFunctions';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toastOptions from '../../utils/toastOptions';

const filter = createFilterOptions();

const AddItem = () => {
  const dispatch = useAppDispatch();
  const validationSchema = useRef<any>(null);
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });
  const isBigScreen = useMediaQuery({ minWidth: 1824 });
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
  const isExtraSmallDevice = useMediaQuery({ maxWidth: 500 });
  const { mode } = useAppSelector((state) => state.common);
  const {
    initializeFormLoading,
    formCustomFields,
    addItemLoading,
    getItemTagsLoading,
    itemTags,
    getSingleItemLoading,
    currentItem
  } = useAppSelector((state) => state.item);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {itemId}=useParams();
  const {
    validateForm,
    resetForm,
    values,
    setValues,
    touched,
    errors,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    dirty,
    handleSubmit,
  } = useFormik({
    initialValues: {} as any,
    validationSchema: validationSchema.current,
    enableReinitialize: true,
    onSubmit: (values) => {
      const { name, tags, ...rest } = values;
      if(itemId) {
        dispatch(editItem({
          input:{name,tags:tags.join(','),customFieldValues:rest},
          onSuccess:()=>{
            toast.success('item_updated',toastOptions);
          },
          itemId
        }))
      }else{
        dispatch(
          addItem({
            input: { name, tags: tags.join(','), customFieldValues: rest },
            collectionId: '082403da-da9e-49f0-84b1-73026c30c80b',
            onSuccess: () => {
              toast.success(t('item_created'), toastOptions);
              setTimeout(() => {
                navigate('/');
              }, 2000);
            },
          })
        );
      }
      
    },
  });
  useEffect(() => {
    dispatch(initializeItemConfig('082403da-da9e-49f0-84b1-73026c30c80b'));
    dispatch(getItemTags());
    if(itemId) {
      dispatch(getSingleItem(itemId))
    }
  }, [dispatch,itemId]);
  useEffect(() => {
    if (formCustomFields) {
      if(!itemId) {
        const formValues = {} as any;

      Object.values(formCustomFields)
        .flat()
        .map((item: any) => {
          formValues[item.name as string] =
            item.type === 'boolean' ? false : '';
        });
      console.log(formValues);
      validationSchema.current = generateItemValidationSchema(formCustomFields);
      setValues({ ...formValues, name: '', tags: [] });
      }else{
        setValues({name:currentItem?.name,tags:currentItem?.tags.split(','),...currentItem?.customFieldValues})
      }
      
    }
  }, [formCustomFields, resetForm, validateForm, setValues,currentItem,itemId]);

  if(!currentItem || getSingleItemLoading || initializeFormLoading) {
    return (
      <Loading/>
    )
  }
  return (
    <Container>
      <Toaster />
      <Typography sx={{ fontSize: 40 }}>{itemId?'Update Item':'Add Item'}</Typography>
      <Form
        isXS={isExtraSmallDevice}
        isX={isBigScreen}
        isMob={isTabletOrMobile}
        isD={isDesktopOrLaptop}
        mode={mode}
        onSubmit={(e: SubmitEvent) => {
          e.preventDefault();
          if (Object.values(values).filter(item=>item==='').length==0) {  
            handleSubmit();
          }
        }}
      >
        <FormGroup sx={{ mb: 2 }}>
          <FormInput
            name="name"
            value={values.name}
            onBlur={handleBlur}
            onChange={(value)=>setFieldValue('name',value)}
            error={!!(touched.name && errors.name)}
            type="text"
            placeholder="Name"
            mode={mode}
          />
          {touched.name && errors.name && (
            <ErrorMessage>{errors.name as string}</ErrorMessage>
          )}
        </FormGroup>
        <FormGroup sx={{ mb: 2 }}>
          <Autocomplete
            value={values.tags}
            loading={getItemTagsLoading}
            onBlur={() => setFieldTouched('tags')}
            freeSolo
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            filterOptions={(options, params: any) => {
              const filtered = filter(options, params);

              const exists = options.some((opt) => opt === params.inputValue);
              if (!exists && params.inputValue !== '') {
                filtered.push(params.inputValue);
              }

              return filtered as any[];
            }}
            defaultValue={currentItem.tags.split(',')}
            multiple
            options={itemTags}
            onChange={(e, newValue) => setFieldValue('tags', newValue)}
            renderInput={(props) => (
              <TextField  name="tags" placeholder="Tags" {...props} />
            )}
          />
          {touched.tags && errors.tags && (
            <ErrorMessage>{errors.tags as string}</ErrorMessage>
          )}
        </FormGroup>
        <Typography>Custom Fields</Typography>
        {!formCustomFields || initializeFormLoading ? (
          <LoadingContainer>
            <CircularProgress size={75} />
          </LoadingContainer>
        ) : (
          <CustomFieldContainer>
            {formCustomFields['integer'] &&
              formCustomFields['integer'].map((item: any) => (
                <FormGroup sx={{ mb: 1 }} key={item.id}>
                  <Typography sx={{ mb: 1 }}>{item.name}</Typography>
                  <FormInput
                    value={values[item.name]?.value}
                    error={!!(touched[item.name] && errors[item.name])}
                    name={item.name}
                    onChange={(value)=>setFieldValue(item.name,{type:'integer',value})}
                    onBlur={handleBlur}
                    type="number"
                    mode={mode}
                  />
                  {touched[item.name] && (errors[item.name] as any)?.value && (
                    <ErrorMessage>{((errors[item.name] as any)?.value)}</ErrorMessage>
                  )}
                </FormGroup>
              ))}
            {formCustomFields['string'] &&
              formCustomFields['string'].map((item: any) => (
                <FormGroup sx={{ mb: 1 }} key={item.id}>
                  <Typography sx={{ mb: 1 }}>{item.name}</Typography>
                  <FormInput
                    name={item.name}
                    onChange={(value)=>setFieldValue(item.name,{type:'string',value})}
                    onBlur={handleBlur}
                    error={!!(touched[item.name] && errors[item.name])}
                    value={values[item.name]?.value}
                    type="text"
                    mode={mode}
                  />
                  {touched[item.name] && (errors[item.name] as any)?.value && (
                    <ErrorMessage>{(errors[item.name] as any)?.value}</ErrorMessage>
                  )}
                </FormGroup>
              ))}
            {formCustomFields['multiline'] &&
              formCustomFields['multiline'].map((item: any) => (
                <FormGroup sx={{ mb: 1 }} key={item.id}>
                  <Typography sx={{ mb: 1 }}>{item.name}</Typography>
                  <FormInput
                    name={item.name}
                    onChange={(value)=>setFieldValue(item.name,{type:'multiline',value})}
                    onBlur={handleBlur}
                    value={values[item.name]?.value}
                    error={!!(errors[item.name] && touched[item.name])}
                    multiline={true}
                    type="text"
                    mode={mode}
                  />
                  {(errors[item.name] as any)?.value && touched[item.name] && (
                    <ErrorMessage>{(errors[item.name]as any)?.value as string}</ErrorMessage>
                  )}
                </FormGroup>
              ))}
            {formCustomFields['date'] &&
              formCustomFields['date'].map((item: any) => (
                <FormGroup sx={{ mb: 1 }} key={item.id}>
                  <Typography sx={{ mb: 1 }}>{item.name}</Typography>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      value={moment(values[item.name]?.value) || undefined}
                      onClose={() => {
                        setFieldTouched(item.name);
                      }}
                      onChange={(e: any) =>
                        setFieldValue(item.name, {type:'date',value:new Date(e._d)})
                      }
                    />
                  </DemoContainer>
                  {(errors[item.name] as any)?.value &&
                    touched[item.name] &&
                    !values?.[item.name]?.value && (
                      <ErrorMessage>{(errors[item.name] as any).value}</ErrorMessage>
                    )}
                </FormGroup>
              ))}
            {formCustomFields['boolean'] &&
              formCustomFields['boolean'].map((item: any) => (
                <FormGroup sx={{ mb: 1 }} key={item.id}>
                  <Typography sx={{ mb: 1 }}>{item.name}</Typography>
                  <FormGroup
                    sx={{
                      display: 'flex !important',
                      flexDirection: 'row !important',
                    }}
                  >
                    <FormLabel sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>Yes</Typography>{' '}
                      <Checkbox
                        checked={values[item.name]?.value === true}
                        onChange={() => setFieldValue(item.name, {type:'boolean',value:true})}
                        onBlur={handleBlur}
                        value={values[item.name]?.value}
                        name={item.name}
                      />
                    </FormLabel>

                    <FormLabel sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>No</Typography>{' '}
                      <Checkbox
                        checked={values[item.name]?.value === false}
                        onChange={() => setFieldValue(item.name, {type:'boolean',value:false})}
                        onBlur={handleBlur}
                        value={values[item.name]?.value}
                        name={item.name}
                      />
                    </FormLabel>
                  </FormGroup>
                </FormGroup>
              ))}
          </CustomFieldContainer>
        )}
        <LoadingButton
          disabled={!dirty}
          loading={addItemLoading}
          sx={{ border: '1px solid gray' }}
          fullWidth
          startIcon={itemId? <Edit/>: <AddCircle/>}
          type="submit"
        >
          {itemId? 'Update Item':"Add Item"}
        </LoadingButton>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  min-height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;

const CustomFieldContainer = styled.div`
  width: 100%;
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 10px;
`;

export default AddItem;
