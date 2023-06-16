import styled from 'styled-components'
import {IconButton, Typography} from '@mui/material'
import {Settings, Logout} from '@mui/icons-material'

import ModeSwitch from '../ModeSwitch/ModeSwitch'
import { useAppSelector } from '../../store/store'
import LanguagePicker from '../LanguageDropDown/LanguagePicker';
import { useTranslation } from 'react-i18next'

const MobileNavDropDown = () => {
    const {mode}=useAppSelector(state=>state.common);
    const {t}=useTranslation();
  return (
    <Container mode={mode}>
        <ModeSwitch/>
        <LanguagePicker/>
        <IconButton>
         <Settings/>
         <Typography sx={{fontSize:14}}>{t('nav.parameters')}</Typography>
         
        </IconButton>
        <IconButton>
        <Logout/>
        <Typography sx={{fontSize:14}}>{t('nav.log_out')}</Typography>
        </IconButton>

    </Container>
  )
}

const Container=styled(({mode,...rest}:any)=><div {...rest} />)`
    width:100%;
    position:absolute;
   top:80px;
   left:0;
   display:flex;
   background: ${({mode})=>mode==='dark'?'#2a2929':'whitesmoke'};
   flex-direction :column ;
   align-items: center;
   border-bottom: 1px solid;
   border-color: gray;
   z-index:99;
   
`

export default MobileNavDropDown;