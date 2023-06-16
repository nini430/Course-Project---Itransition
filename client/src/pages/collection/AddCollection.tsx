import styled from 'styled-components';
import ReactQuill from 'react-quill';
import {useMediaQuery} from 'react-responsive'
import { FormGroup, Typography, Autocomplete } from '@mui/material';

import { useAppSelector } from '../../store/store';
import FormInput from '../../components/FormInput/FormInput';

const AddCollection = () => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });
  const isBigScreen = useMediaQuery({ minWidth: 1824 });
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
  const isExtraSmallDevice = useMediaQuery({ maxWidth: 500 });
  const { mode } = useAppSelector((state) => state.common);
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
          <Autocomplete/>
        </FormGroup>
        <FormGroup sx={{ mb: 2 }}>
          <FormInput mode={mode} />
        </FormGroup>
        <FormGroup sx={{ mb: 2 }}>
          <FormInput mode={mode} />
        </FormGroup>
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

export default AddCollection;
