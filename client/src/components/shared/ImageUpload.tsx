import styled from 'styled-components';
import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { IconButton, Button } from '@mui/material';
import { PhotoCamera, Save, Cancel } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { DropzoneRootProps, DropzoneInputProps } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import Loading from '../../assets/loading.gif';
import Avatar from '../Avatar/Avatar';

interface IImageUploadProps {
  uploadImg: File | null;
  setUploadImg: Dispatch<SetStateAction<File | null>>;
  photoUploadLoading: boolean;
  mainImage: string | undefined;
  fallBackImage: any;
  uploadImage: any;
  isAllowedUpload: boolean;
  getRootProps: any;
  getInputProps: any;
}

const ImageUpload = ({
  uploadImg,
  setUploadImg,
  photoUploadLoading,
  mainImage,
  fallBackImage,
  uploadImage,
  isAllowedUpload,
  getRootProps,
  getInputProps,
}: IImageUploadProps) => {
  const [isPhotoHovered, setIsPhotoHovered] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(isPhotoHovered);
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [isPhotoHovered]);

  return (
    <>
      <ImageContainer
        {...(getRootProps ? { ...getRootProps() } : {})}
        onMouseOver={() => setIsPhotoHovered(true)}
        onMouseOut={() => setIsPhotoHovered(false)}
      >
        <input
          {...(getInputProps ? { ...getInputProps() } : {})}
          type="file"
          className="d-none"
        />
        <Avatar
          width={200}
          height={200}
          src={
            photoUploadLoading
              ? Loading
              : uploadImg
              ? URL.createObjectURL(uploadImg as File)
              : mainImage || fallBackImage
          }
        />
        {showButton && isAllowedUpload && (
          <IconButton
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              color: 'gray',
            }}
          >
            <PhotoCamera sx={{ background: 'gray', fontSize: '28px' }} />
          </IconButton>
        )}
      </ImageContainer>
      {uploadImg && (
        <SaveContainer>
          <LoadingButton
            loading={photoUploadLoading}
            onClick={uploadImage}
            sx={{ border: '1px solid gray' }}
            startIcon={<Save />}
          >
            Save
          </LoadingButton>
          <Button
            onClick={() => setUploadImg(null)}
            sx={{ border: '1px solid gray' }}
            startIcon={<Cancel />}
          >
            Cancel
          </Button>
        </SaveContainer>
      )}
    </>
  );
};

const ImageContainer = styled.div`
  position: relative;
  align-self: center;
  cursor: pointer;
`;

const SaveContainer = styled.div`
  display: flex;
  gap: 8px;
  align-self: center;
`;

export default ImageUpload;
