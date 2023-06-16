import styled from 'styled-components';
import {useEffect} from 'react'
import ReactQuill from 'react-quill';
import {useMediaQuery} from 'react-responsive'
import { FormGroup, Typography, Autocomplete, TextField, Button } from '@mui/material';
import {AddCircle, CloudUpload} from '@mui/icons-material'

import { useAppDispatch, useAppSelector } from '../../store/store';
import FormInput from '../../components/FormInput/FormInput';
import { getCollectionTopics } from '../../store/collectionReducer';
import { LoadingButton } from '@mui/lab';

const AddCollection = () => {
  const dispatch=useAppDispatch();
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });
  const isBigScreen = useMediaQuery({ minWidth: 1824 });
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
  const isExtraSmallDevice = useMediaQuery({ maxWidth: 500 });
  const { mode } = useAppSelector((state) => state.common);
  const {collectionTopics,topicsLoading}=useAppSelector(state=>state.collection);
  useEffect(()=>{
   dispatch(getCollectionTopics());
  },[dispatch]);
  return (
    <Container>
      <Typography sx={{ fontSize: 40 }}>Add Collection</Typography>
      <CollectionForm
        isXS={isExtraSmallDevice}
        isX={isBigScreen}
        isMob={isTabletOrMobile}
        isD={isDesktopOrLaptop}
        mode={mode}
      >
        <FormGroup sx={{ mb: 2 }}>
          <FormInput name='name' placeholder='Name' type='text' mode={mode} />
        </FormGroup>
        <FormGroup sx={{ mb: 2 }}>
         <ReactQuill defaultValue='Description goes here...' className={`theme-quill theme-quill-${mode}`}/>
        </FormGroup>
        <FormGroup sx={{ mb: 2 }}>
          <Autocomplete loading={topicsLoading} fullWidth renderInput={(props)=><TextField {...props}  placeholder='Topic' type="text"/>} loading={topicsLoading} options={collectionTopics} />
        </FormGroup>
        <FormGroup sx={{ mb: 2 }}>
          <Typography>Image (optional)</Typography>
          <ImageUploadContainer
          mode={mode}
          >
            <CloudUpload/>
            <Typography>Upload or Drop the Image</Typography>

          </ImageUploadContainer>
          
        </FormGroup>
        <Button sx={{alignSelf:'flex-start',border:'1px solid gray'}}>Configure Item Fields</Button>
          <Typography sx={{fontSize:12,marginTop:0.5}}>if not, it will be set as default (id,name,tags)</Typography>
          <LoadingButton startIcon={<AddCircle/>} sx={{border:'1px solid gray',marginTop:1}} fullWidth>Add Collection</LoadingButton>
      </CollectionForm>
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

const ImageUploadContainer=styled(({mode,...props}:any)=><div {...props}/>)`
  width: 100%;
  background-color: ${({ mode }) => (mode === 'dark' ? '#252121' : 'white')};
  height:250px;
  border:1px dashed gray;
  display:flex;
  justify-content: center;
  flex-direction:column;
  align-items: center;

`

export default AddCollection;
