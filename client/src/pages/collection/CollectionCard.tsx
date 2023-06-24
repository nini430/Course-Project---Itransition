import styled from 'styled-components';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardActions, CardContent, Divider, Icon, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import {useDropzone, Accept} from 'react-dropzone'

import { ExtendedCollection } from '../../types/collection';
import ImageUpload from '../../components/shared/ImageUpload';
import NoImage from '../../assets/no-image.png';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { removeCollection, uploadCollectionImage } from '../../store/collectionReducer';
import { fileToBase64 } from '../../utils/fileToBase64';
import toastOptions from '../../utils/toastOptions';
import Avatar from '../../components/Avatar/Avatar';
import AvatarImage from '../../assets/avatar.png'
import { Delete, Edit } from '@mui/icons-material';
import ConfirmDialog from '../../components/shared/ConfirmDialog';

interface ICollectionCardProps {
  currentCollection: ExtendedCollection | null;
}

const CollectionCard = ({ currentCollection }: ICollectionCardProps) => {
  const navigate=useNavigate();
  const [isConfirmModalOpen,setIsCOnfirmModalOpen]=useState(false)
  const {authedUser}=useAppSelector(state=>state.auth);
  const auth= authedUser || JSON.parse(localStorage.getItem('authed_user') as string);
  const dispatch = useAppDispatch();
  const [uploadImg, setUploadImg] = useState<File | any>(null);
  const { uploadCollectionImageLoading, removeCollectionLoading } = useAppSelector(
    (state) => state.collection
  );

  const {getRootProps,getInputProps}=useDropzone({
    accept:'image/*' as unknown as Accept,
    onDrop:(acceptedFiles)=>{
      setUploadImg(acceptedFiles[0])
    }
  })
  
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
          getRootProps={currentCollection?.author.id===auth.id? getRootProps:null}
          getInputProps={currentCollection?.author.id==auth.id? getInputProps:null}
         isAllowedUpload={currentCollection?.author.id===auth.id}
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
                src={auth.profileImage as string ||AvatarImage}
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
        {auth.id === currentCollection?.author.id && (
          <ActionsContainer>
          <IconButton><Edit/></IconButton>
          <IconButton onClick={()=>setIsCOnfirmModalOpen(true)}><Delete/></IconButton>
          </ActionsContainer>
        )}
      </CardContent>
          <ConfirmDialog loading={removeCollectionLoading}  onOk={()=>{
            dispatch(removeCollection({collectionId:currentCollection?.id as string,onSuccess:()=>{
              toast('collection_remove_success',toastOptions)
              setIsCOnfirmModalOpen(false);
              setTimeout(()=>{
                navigate('/');
              },2000)
            }}))
          }} open={isConfirmModalOpen} onClose={()=>setIsCOnfirmModalOpen(false)}/>
    </CardContainer>
  );
};

const CardContainer = styled(Card)`
  margin: 10px;
  height:600px;
`;
const ActionsContainer= styled.div`
  align-self:end;
`

export default CollectionCard;