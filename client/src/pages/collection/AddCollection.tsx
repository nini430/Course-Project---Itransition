import styled from 'styled-components';
import { toast, Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { useMediaQuery } from 'react-responsive';
import {
  FormGroup,
  Typography,
  Autocomplete,
  TextField,
} from '@mui/material';
import { AddCircle, CloudUpload, Close } from '@mui/icons-material';
import { useFormik } from 'formik';
import { Accept, useDropzone } from 'react-dropzone';

import { useAppDispatch, useAppSelector } from '../../store/store';
import FormInput from '../../components/FormInput/FormInput';
import {
  addCollection,
  getCollectionExtended,
  getCollectionTopics,
  removeCollectionPic,
  removeDraftCollection,
  updateCollection,
} from '../../store/collectionReducer';
import { LoadingButton } from '@mui/lab';
import CollectionDialog from './CollectionDialog';
import {
  collectionValidationSchema,
  collectionValues,
} from '../../formik-validation/collection';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toastOptions from '../../utils/toastOptions';
import { fileToBase64 } from '../../utils/fileToBase64';
import { Form } from '../commonStyles';

const AddCollection = () => {
  const { collectionTopics, topicsLoading, addCollectionLoading, draftCollection, updateCollectionLoading } =
  useAppSelector((state) => state.collection);
  const dispatch=useAppDispatch();
  const {collectionId}=useParams();
  const [accordionValues,setAccordionValues]=useState({});
  const [uploadImg, setUploadImg] = useState<File | null>(null);
  const {
    dirty,
    handleSubmit,
    handleBlur,
    touched,
    errors,
    values,
    setFieldValue,
    setFieldTouched,
  } = useFormik({
    initialValues:  draftCollection?.collection || collectionValues,
    validationSchema: collectionValidationSchema(collectionTopics),
    onSubmit: async (values) => {
      let imgToUpload = null;
      if (uploadImg) {
        imgToUpload = await fileToBase64(uploadImg as File);
      }
      if(collectionId) {
        dispatch(updateCollection({
          input:{...values,image:imgToUpload as string},
          configs:accordionValues,
          collectionId:collectionId as string,
          onSuccess:(message:string)=>{
            toast.success(t(`messages.${message||'success'}`),toastOptions); 
            setTimeout(()=>{
              navigate(-1);
            },2000)
          }
        }))
      }else{
        dispatch(
          addCollection({
            input: { ...values, image: imgToUpload as string },
            configs:accordionValues,
            onSuccess: () => {
              toast.success(t('collection_created', toastOptions));
              setTimeout(() => {
                navigate('/');
              }, 2000);
            },
          })
        );
      }
      
    },
    enableReinitialize:true
  });
  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    accept: 'image/*' as unknown as Accept,
    onDrop: (acceptedFiles) => {
      setUploadImg(acceptedFiles[0]);
    },
  });
  const navigate = useNavigate();
  const { t } = useTranslation();

  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });
  const isBigScreen = useMediaQuery({ minWidth: 1824 });
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
  const isExtraSmallDevice = useMediaQuery({ maxWidth: 500 });
  const { mode } = useAppSelector((state) => state.common);
  useEffect(()=>{
    if(!collectionId) {
      dispatch(removeDraftCollection())
      setAccordionValues({})
    }
  },[collectionId,dispatch])
  useEffect(() => {
    dispatch(getCollectionTopics());
  }, [dispatch]);
  useEffect(()=>{
    if(collectionId) {
      dispatch(getCollectionExtended({collectionId:collectionId as string}))
    }
  },[collectionId,dispatch])
  return (
    <Container>
      <Toaster />
      <Typography sx={{ fontSize: 40 }}>{collectionId?'Update':'Add'} Collection</Typography>
      <Form
        isXS={isExtraSmallDevice}
        isX={isBigScreen}
        isMob={isTabletOrMobile}
        isD={isDesktopOrLaptop}
        mode={mode}
        onSubmit={(e: any) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <FormGroup sx={{ mb: 2 }}>
          <FormInput
            onChange={(value)=>setFieldValue('name',value)}
            onBlur={handleBlur}
            error={!!errors.name}
            value={values.name}
            name="name"
            placeholder="Name"
            type="text"
            mode={mode}
          />
          {touched.name && errors.name && (
            <ErrorMessage>{(errors as any).name}</ErrorMessage>
          )}
        </FormGroup>
        <FormGroup sx={{ mb: 2 }}>
          <Typography>Description</Typography>
          <ReactQuill
            value={values.description}
            onChange={(text) => {
              setFieldValue('description', text);
            }}
            onBlur={() => setFieldTouched('description')}
            className={`theme-quill theme-quill-${mode}`}
          />
          {touched.description && errors.description && (
            <ErrorMessage>{(errors as any).description}</ErrorMessage>
          )}
        </FormGroup>
        <FormGroup sx={{ mb: 2 }}>
          <Autocomplete
            freeSolo
            onBlur={() => setFieldTouched('topic')}
            onSelect={(event: any) =>
              setFieldValue('topic', event.target.value)
            }
            value={values.topic}
            loading={topicsLoading}
            fullWidth
            renderInput={(props) => (
              <TextField {...props} placeholder="Topic" type="text" />
            )}
            options={collectionTopics}
          />
          {touched.topic && errors.topic && (
            <ErrorMessage>{(errors as any).topic}</ErrorMessage>
          )}
        </FormGroup>
        <FormGroup sx={{ mb: 2 }}>
          <Typography>Image (optional)</Typography>
          <ImageUploadContainer isDragActive={isDragActive} {...getRootProps()} mode={mode}>
            {(uploadImg || draftCollection?.collection?.image) ? (
              <ImageContainer>
                <img
                  width={150}
                  height={200}
                  style={{objectFit:'cover'}}
                  src={draftCollection?.collection?.image || URL.createObjectURL(uploadImg as File)}
                  alt=""
                />
                <DeleteCircle
                  onClick={(e) => {
                    e.stopPropagation();
                    if(uploadImg) {
                      setUploadImg(null);
                    }else if(draftCollection?.collection?.image) {
                      dispatch(removeCollectionPic({otherParams:values}));
                    }
                    

                  }}
                >
                  <Close />
                </DeleteCircle>
              </ImageContainer>
            ) : (
              <>
                <CloudUpload />
                <Typography>Upload or Drop the Image</Typography>
              </>
            )}

            <input type="file" className="none" {...getInputProps()} />
          </ImageUploadContainer>
        </FormGroup>
        <Typography
        >
          Configure Item Fields
        </Typography>
        <Typography sx={{ fontSize: 12, marginTop: 0.5, mb:1 }}>
          if not, it will be set as default (id,name,tags)
        </Typography>
        <CollectionDialog
        accordionValues={accordionValues}
        setAccordionValues={setAccordionValues}
        collectionId={collectionId}
      />
              <LoadingButton
          loading={addCollectionLoading || updateCollectionLoading}
          disabled={(Object.values(errors).length > 0) }
          type="submit"
          startIcon={<AddCircle />}
          sx={{ border: '1px solid gray', marginTop: 1 }}
          fullWidth
        >
          {collectionId?'Update':'Add'} Collection
        </LoadingButton>
      </Form>
     
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;



const ImageUploadContainer = styled(({ mode, isDragActive, ...props }: any) => (
  <div {...props} />
))`
  width: 100%;
  background-color: ${({ mode, isDragActive }) =>
    mode === 'dark'
      ? isDragActive
        ? '#606060'
        : 'rgb(31, 28, 28)'
      : isDragActive
      ? 'rgba(166, 154, 154, 0.1)'
      : 'white'};
  height: 250px;
  border: 1px dashed gray;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 4px;
`;

const ImageContainer = styled.div`
  position: relative;
`;

const DeleteCircle = styled.div`
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 50%;
  border: 1px solid gray;
`;

export default AddCollection;
