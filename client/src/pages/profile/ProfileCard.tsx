import styled from 'styled-components';
import { useDropzone, Accept } from 'react-dropzone';
import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
import { Toaster, toast } from 'react-hot-toast';

import { useAppDispatch, useAppSelector } from '../../store/store';
import ImageUpload from '../../components/shared/ImageUpload';
import Avatar from '../../assets/avatar.png';
import { uploadProfileImage } from '../../store/authReducer';
import { fileToBase64 } from '../../utils/fileToBase64';
import toastOptions from '../../utils/toastOptions';
import Loading from '../../components/Loading/Loading';
import { getUserById } from '../../store/userReducer';
import { useParams } from 'react-router-dom';

const ProfileCard = () => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*' as unknown as Accept,
    onDrop: (acceptedFiles) => {
      setUploadImg(acceptedFiles[0] as File);
    },
  });
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const [uploadImg, setUploadImg] = useState<File | any>(null);
  const { authedUser, profileUploadLoading } = useAppSelector(
    (state) => state.auth
  );
  const authId =
    authedUser?.id || JSON.parse(localStorage.getItem('authed_user') as string);
  const { myCollections } = useAppSelector((state) => state.collection);
  const { currentProfile, profileLoading } = useAppSelector(
    (state) => state.user
  );
  useEffect(() => {
    dispatch(getUserById(userId as string));
  }, [userId, dispatch]);
  if (profileLoading || !currentProfile) {
    return <Loading />;
  }
  return (
    <Card sx={{ height: '600px' }}>
      <Toaster />
      <CardContent
        sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
      >
        <Typography sx={{ fontSize: 32, alignSelf: 'center' }}>
          {currentProfile?.firstName} {currentProfile?.lastName}
        </Typography>

        <ImageUpload
          getRootProps={authId === currentProfile.id ? getRootProps : null}
          getInputProps={authId === currentProfile.id ? getInputProps : null}
          isAllowedUpload={authId === currentProfile.id}
          uploadImage={async () => {
            dispatch(
              uploadProfileImage({
                image: (await fileToBase64(uploadImg)) as string,
                onSuccess: () => {
                  toast.success('image_upload_success', toastOptions);
                  setUploadImg(null);
                },
              })
            );
          }}
          uploadImg={uploadImg}
          photoUploadLoading={profileUploadLoading}
          setUploadImg={setUploadImg}
          mainImage={currentProfile?.profileImage}
          fallBackImage={Avatar}
        />
        <Divider />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Typography sx={{ color: 'gray' }}>Email:</Typography>{' '}
          <Typography>{currentProfile.email}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Typography sx={{ color: 'gray' }}>Role:</Typography>{' '}
          <Typography>
            {currentProfile?.role === 'BASIC' ? 'User' : 'Admin'}
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

export default ProfileCard;
