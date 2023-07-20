import { Switch } from '@mui/material';
import styled from 'styled-components';
import i18n from 'i18next';

import Eng from '../../assets/uk.png';
import Geo from '../../assets/ge.png';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { changeLang } from '../../store/commonReducer';


const LanguagePicker = () => {
  const dispatch=useAppDispatch();
  const {lang}=useAppSelector(state=>state.common);
  return (
    <LanguageWrapper>
      <img width={30} height="auto" src={Eng} alt="" />
      <Switch onChange={()=>{
        i18n.changeLanguage(lang==='en'?'ka':'en');
        dispatch(changeLang());
        }} checked={lang==='ka'} />
      <img width={30} height="auto" src={Geo} alt="" />
    </LanguageWrapper>
  );
};

const LanguageWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export default LanguagePicker;
