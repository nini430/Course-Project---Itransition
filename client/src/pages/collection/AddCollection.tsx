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
  Button,
} from '@mui/material';
import { AddCircle, CloudUpload, Close } from '@mui/icons-material';
import { useFormik } from 'formik';
import { Accept, useDropzone } from 'react-dropzone';

import { useAppDispatch, useAppSelector } from '../../store/store';
import FormInput from '../../components/FormInput/FormInput';
import {
  addCollection,
  getCollectionTopics,
} from '../../store/collectionReducer';
import { LoadingButton } from '@mui/lab';
import CollectionDialog from './CollectionDialog';
import {
  collectionValidationSchema,
  collectionValues,
} from '../../formik-validation/collection';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toastOptions from '../../utils/toastOptions';
import { fileToBase64 } from '../../utils/fileToBase64';

const AddCollection = () => {
  const [uploadImg, setUploadImg] = useState<File | null>(null);
  const { collectionTopics, topicsLoading, addCollectionLoading } =
    useAppSelector((state) => state.collection);
  const {
    dirty,
    handleSubmit,
    handleBlur,
    handleChange,
    touched,
    errors,
    values,
    setFieldValue,
    setFieldTouched,
  } = useFormik({
    initialValues: collectionValues,
    validationSchema: collectionValidationSchema(collectionTopics),
    onSubmit: async (values) => {
      let imgToUpload = null;
      if (uploadImg) {
        imgToUpload = await fileToBase64(uploadImg as File);
      }
      dispatch(
        addCollection({
          input: {...values,image:imgToUpload as string},
          onSuccess: () => {
            toast.success(t('collection_created', toastOptions));
            setTimeout(() => {
              navigate('/');
            }, 2000);
          },
        })
      );
    },
  });
  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    accept: 'image/*' as unknown as Accept,
    onDrop: (acceptedFiles) => {
      setUploadImg(acceptedFiles[0]);
    },
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isCollectionDialogOpen, setIsCollectionDialogOpen] = useState(false);

  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });
  const isBigScreen = useMediaQuery({ minWidth: 1824 });
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
  const isExtraSmallDevice = useMediaQuery({ maxWidth: 500 });
  const { mode } = useAppSelector((state) => state.common);
  useEffect(() => {
    dispatch(getCollectionTopics());
  }, [dispatch]);
  return (
    <Container>
      <Toaster />
      <Typography sx={{ fontSize: 40 }}>Add Collection</Typography>
      <CollectionForm
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
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.name}
            value={values.name}
            name="name"
            placeholder="Name"
            type="text"
            mode={mode}
          />
          {touched.name && errors.name && (
            <ErrorMessage>{errors.name}</ErrorMessage>
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
            <ErrorMessage>{errors.description}</ErrorMessage>
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
            <ErrorMessage>{errors.topic}</ErrorMessage>
          )}
        </FormGroup>
        <FormGroup sx={{ mb: 2 }}>
          <Typography>Image (optional)</Typography>
          <ImageUploadContainer {...getRootProps()} mode={mode}>
            {uploadImg ? (
              <ImageContainer>
                <img
                  width={150}
                  height="auto"
                  src={URL.createObjectURL(uploadImg as File)}
                  alt=""
                />
                <DeleteCircle
                  onClick={(e) => {
                    e.stopPropagation();
                    setFieldValue('image', null);
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
        <Button
          onClick={() => setIsCollectionDialogOpen(true)}
          sx={{ alignSelf: 'flex-start', border: '1px solid gray' }}
        >
          Configure Item Fields
        </Button>
        <Typography sx={{ fontSize: 12, marginTop: 0.5 }}>
          if not, it will be set as default (id,name,tags)
        </Typography>
        <LoadingButton
          loading={addCollectionLoading}
          disabled={!dirty || Object.values(errors).length > 0}
          type="submit"
          startIcon={<AddCircle />}
          sx={{ border: '1px solid gray', marginTop: 1 }}
          fullWidth
        >
          Add Collection
        </LoadingButton>
      </CollectionForm>
      <CollectionDialog
        open={isCollectionDialogOpen}
        onClose={() => setIsCollectionDialogOpen(false)}
      />
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

const CollectionForm = styled(({ mode, ...rest }: any) => <form {...rest} />)`
  background-color: ${({ mode }) => (mode === 'dark' ? '#252121' : 'white')};
  width: ${({ isX, isMob, isD, isXS }) =>
    isX ? '700px' : isMob ? '500px' : isXS ? '350px' : '400px'};
  padding: 20px;
  min-width: 300px;
  max-width: 600px;
  height: auto;
  border-radius: 10px;
`;

const ImageUploadContainer = styled(({ mode, ...props }: any) => (
  <div {...props} />
))`
  width: 100%;
  background-color: ${({ mode }) => (mode === 'dark' ? '#252121' : 'white')};
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
