import styled from 'styled-components';
import { IconButton, Input } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const SearchInput = () => {
  const [searchValue, setSearchValue] = useState('');
  const { t } = useTranslation();
  return (
    <InputWrapper>
    <StyledInput
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      placeholder={t('nav.search') as string}
    />
   <IconButton>
    <Search/>
   </IconButton>
    </InputWrapper>
  );
};

const InputWrapper=styled.div`
  width:40%;
  display:flex;
  gap:10px;
  align-items:center;
`
const StyledInput = styled(Input)`
  width:100%;
`;
export default SearchInput;
