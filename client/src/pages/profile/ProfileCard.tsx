import styled from 'styled-components';
import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  IconButton,
  Button,
} from '@mui/material';
import { PhotoCamera, Save, Cancel } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Toaster, toast } from 'react-hot-toast';

import { useAppDispatch, useAppSelector } from '../../store/store';
import Avatar from '../../assets/avatar.png';
import Loading from '../../assets/loading.gif'
import { useDropzone, Accept } from 'react-dropzone';
import { uploadProfileImage } from '../../store/authReducer';
import { fileToBase64 } from '../../utils/fileToBase64';
import { useTranslation } from 'react-i18next';
import toastOptions from '../../utils/toastOptions';

const ProfileCard = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [uploadImg, setUploadImg] = useState<File | null>(null);
  const { authedUser, myCollections, profileUploadLoading } = useAppSelector((state) => state.auth);
  const [isPhotoHovered, setIsPhotoHovered] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(isPhotoHovered);
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [isPhotoHovered]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*' as unknown as Accept,
    onDrop: (acceptedFiles) => {
      setUploadImg(acceptedFiles[0] as File);
    },
  });

  return (
    <Card sx={{ height: '600px' }}>
      <Toaster />
      <CardContent
        sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
      >
        <Typography sx={{ fontSize: 32, alignSelf: 'center' }}>
          {authedUser?.firstName} {authedUser?.lastName}
        </Typography>
        <ImageContainer
          {...getRootProps()}
          onMouseOver={() => setIsPhotoHovered(true)}
          onMouseOut={() => setIsPhotoHovered(false)}
        >
          <input {...getInputProps()} type="file" className="d-none" />
          <img
            style={{ borderRadius: '50%' }}
            width={200}
            height={200}
            src={
              profileUploadLoading? Loading:
              uploadImg
                ? URL.createObjectURL(uploadImg)
                : authedUser?.profileImage || Avatar
            }
            alt=""
          />
          {showButton && (
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
              loading={profileUploadLoading}
              onClick={async () => {
                dispatch(
                  uploadProfileImage({
                    image: (await fileToBase64(uploadImg)) as string,
                    onSuccess: () => {
                      toast.success(t('image_upload_success'), toastOptions);
                    },
                  })
                );
                setUploadImg(null);
              }}
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
        <Divider />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Typography sx={{ color: 'gray' }}>Email:</Typography>{' '}
          <Typography>{authedUser?.email}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Typography sx={{ color: 'gray' }}>Role:</Typography>{' '}
          <Typography>
            {authedUser?.role === 'BASIC' ? 'User' : 'Admin'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Typography sx={{ color: 'gray' }}>Collections:</Typography>{' '}
          <Typography>{myCollections?.length} Collections</Typography>
        </Box>
      </CardContent>
    </Card>
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
export default ProfileCard;
