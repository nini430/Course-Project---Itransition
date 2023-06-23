import styled from 'styled-components';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import { ExtendedCollection } from '../../types/collection';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

import ImageUpload from '../../components/shared/ImageUpload';
import NoImage from '../../assets/no-image.png';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { uploadCollectionImage } from '../../store/collectionReducer';
import { fileToBase64 } from '../../utils/fileToBase64';
import toastOptions from '../../utils/toastOptions';
import Avatar from '../../components/Avatar/Avatar';

interface ICollectionCardProps {
  currentCollection: ExtendedCollection | null;
}

const CollectionCard = ({ currentCollection }: ICollectionCardProps) => {
  const dispatch = useAppDispatch();
  const [uploadImg, setUploadImg] = useState<File | any>(null);
  const { uploadCollectionImageLoading } = useAppSelector(
    (state) => state.collection
  );

  return (
    <CardContainer>
      <Toaster />
      <CardContent
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          display: 'flex',
          gap: '10px',
        }}
      >
        <Typography sx={{ fontSize: 30 }}>{currentCollection?.name}</Typography>
        <ImageUpload
          uploadImage={async () => {
            dispatch(
              uploadCollectionImage({
                collectionId: currentCollection?.id as string,
                image: (await fileToBase64(uploadImg)) as string,
                onSuccess: () => {
                  toast.success('image_upload_success', toastOptions);
                },
              })
            );
            setUploadImg(null);
          }}
          photoUploadLoading={uploadCollectionImageLoading}
          setUploadImg={setUploadImg}
          uploadImg={uploadImg}
          mainImage={currentCollection?.image}
          fallBackImage={NoImage}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            alignSelf: 'flex-start',
          }}
        >
          <Typography sx={{ color: 'gray' }}>Description:</Typography>
          <Typography
            dangerouslySetInnerHTML={{
              __html: currentCollection?.description as string,
            }}
          />
        </Box>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            alignSelf: 'flex-start',
          }}
        >
          <Typography sx={{ color: 'gray' }}>Topic:</Typography>
          <Typography>#{currentCollection?.topic}</Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            alignSelf: 'flex-start',
          }}
        >
          <Typography sx={{ color: 'gray' }}>Number of items:</Typography>
          <Typography>{currentCollection?.items?.length}</Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            alignSelf: 'flex-start',
          }}
        >
          <Typography sx={{ color: 'gray' }}>Author:</Typography>
          <Link
            style={{ textDecoration: 'none' }}
            to={`/profile/${currentCollection?.author.id}`}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Avatar
                width={30}
                height={30}
                src={currentCollection?.image as string}
              />
              <Typography>
                {currentCollection?.author.firstName}{' '}
                {currentCollection?.author.lastName}
              </Typography>
            </Box>
          </Link>
        </Box>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            alignSelf: 'flex-start',
          }}
        >
          <Typography sx={{ color: 'gray' }}>Created At:</Typography>
          <Typography>
            {moment(currentCollection?.createdAt as string).format('L')}
          </Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            alignSelf: 'flex-start',
          }}
        >
          <Typography sx={{ color: 'gray' }}>Updated At:</Typography>
          <Typography>
            {moment(currentCollection?.updatedAt as string).format('L')}
          </Typography>
        </Box>
      </CardContent>
    </CardContainer>
  );
};

const CardContainer = styled(Card)`
  margin: 10px;
`;

export default CollectionCard;
