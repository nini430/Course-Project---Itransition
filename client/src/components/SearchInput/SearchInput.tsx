import styled from 'styled-components';
import {Link} from 'react-router-dom'
import { IconButton, Input } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useAppDispatch } from '../../store/store';
import { getFullTextSearch } from '../../store/searchReducer';

const SearchInput = () => {
  const dispatch=useAppDispatch();
  const [searchValue, setSearchValue] = useState('');
  const { t } = useTranslation();
  return (
    <InputWrapper>
    <StyledInput
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      placeholder={t('nav.search') as string}
    />
    <Link to='/search'>
    <IconButton onClick={()=>{
    dispatch(getFullTextSearch({searchQuery:searchValue}))
   }}>
    <Search/>
   </IconButton></Link>
   
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
