import { useDropzone, Accept } from 'react-dropzone';
import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import { Toaster, toast } from 'react-hot-toast';

import { useAppDispatch, useAppSelector } from '../../store/store';
import ImageUpload from '../../components/shared/ImageUpload';
import Avatar from '../../assets/avatar.png';
import { uploadProfileImage } from '../../store/authReducer';
import { fileToBase64 } from '../../utils/fileToBase64';
import toastOptions from '../../utils/toastOptions';
import Loading from '../../components/Loading/Loading';
import { getUserById, toggleFollow } from '../../store/userReducer';
import { useParams } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import FollowModal from '../../components/shared/FollowModal';

const ProfileCard = () => {
  const dispatch = useAppDispatch();
  const [followModal,setFollowModal]=useState<any[]|null>(null);
  const {t}=useTranslation();
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*' as unknown as Accept,
    onDrop: (acceptedFiles) => {
      setUploadImg(acceptedFiles[0] as File);
    },
  });
  const { userId } = useParams();
  const [uploadImg, setUploadImg] = useState<File | any>(null);
  const { authedUser, profileUploadLoading, myFollowers, myFollowings } = useAppSelector(
    (state) => state.auth
  );
  const { myCollections } = useAppSelector((state) => state.collection);
  const { currentProfile, profileLoading,  currentFollowers, currentFollowings, toggleFollowLoading } = useAppSelector(
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
          getRootProps={authedUser?.id === currentProfile.id ? getRootProps : null}
          getInputProps={authedUser?.id === currentProfile.id ? getInputProps : null}
          isAllowedUpload={authedUser?.id === currentProfile.id}
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
        {authedUser && authedUser.id !== userId && (
          <LoadingButton
            loading={toggleFollowLoading}
            onClick={() =>
              dispatch(toggleFollow({ followerId: authedUser.id, followedId: userId as string }))
            }
            startIcon={<Add />}
            sx={{ border: '1px solid gray' }}
          >
            {currentFollowers.find((item:any)=>item.followerId===authedUser.id)
              ? t('common.unfollow')
              : t('common.follow')}
          </LoadingButton>
        )}
        <Divider />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Typography sx={{ color: 'gray' }}>{t('auth.email')}:</Typography>{' '}
          <Typography>{currentProfile.email}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Typography sx={{ color: 'gray' }}>{t('auth.role')}:</Typography>{' '}
          <Typography>
            {currentProfile?.role === 'BASIC' ? 'User' : 'Admin'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Typography sx={{ color: 'gray' }}>{t('collection.collections')}:</Typography>{' '}
          <Typography>{myCollections?.length} {t('collection.collections')}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Typography sx={{ color: 'gray' }}>Followers:</Typography>{' '}
          <Typography onClick={()=>setFollowModal(currentFollowers.map((item:any)=>({...item.followed})))} sx={{textDecoration:'underline',cursor:'pointer'}}>{currentProfile.id===authedUser?.id ? myFollowers.length:currentFollowers.length}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Typography sx={{ color: 'gray' }}>Followings:</Typography>{' '}
          <Typography onClick={()=>setFollowModal(currentFollowings.map((item:any)=>({...item.follower})))} sx={{textDecoration:'underline',cursor:'pointer'}}>{currentProfile.id===authedUser?.id ? myFollowings.length:currentFollowings.length}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Typography sx={{ color: 'gray' }}>Account Status:</Typography>{' '}
          <Typography onClick={()=>setFollowModal(currentFollowings.map((item:any)=>({...item.follower})))}>{currentProfile.accountStatus==='PRIVATE'?'Private':'Public'}</Typography>
        </Box>
      </CardContent>
      <FollowModal open={followModal} onClose={()=>setFollowModal(null)}/>
    </Card>
  );
};

export default ProfileCard;
