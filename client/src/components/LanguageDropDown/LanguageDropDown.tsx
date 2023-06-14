import {MenuItem,Button,Menu} from '@mui/material'
import {KeyboardArrowDown} from '@mui/icons-material'
import styled from 'styled-components'
import jsCookie from 'js-cookie';
import i18n from 'i18next'

import languages from '../../utils/langs'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'react-responsive'
import { LngInput } from '../../types/lng';
import Eng from '../../assets/uk.png'
import Geo from '../../assets/ge.png'

interface ILanguageDropDownProps {
    open:boolean;
    onClose:()=>void;
    onOpen:()=>void;
}

const LanguageDropDown: React.FC<ILanguageDropDownProps> = ({open,onClose,onOpen}) => {
    const {t}=useTranslation();
    const isExtraSmall=useMediaQuery({maxWidth: 500});
    const cookie=jsCookie.get('i18next');
    const selectedLang=languages.find((lang:LngInput)=>lang.abbr===cookie);
  return (
    <DropDownWrapper isXs={isExtraSmall}>
        <Button onClick={onOpen}  variant="contained" color="inherit" endIcon={<KeyboardArrowDown/>}>
        <div className="lngWrap">
        <img width={25} height="auto" src={cookie==='en'?Eng:Geo} alt="" />
      {!isExtraSmall && <span>{t(`lang.${selectedLang?.name}`)}</span> }
        </div>
    
    </Button>
    <Menu className='menu' elevation={0} transformOrigin={{vertical:"top",horizontal:'right'}} anchorOrigin={{horizontal:'right',vertical:'top'}}  onClose={onClose} open={open}>
       {languages.map(lang=>(
        <MenuItem onClick={()=>{
          i18n.changeLanguage(lang.abbr)
          onClose();

        }} sx={{display:'flex',alignItems:'center',gap:'10px'}}>
        <img width={25} height="auto" src={lang.abbr==='en'?Eng:Geo} alt="" />
        {t(`lang.${lang.name}`)}
        </MenuItem>
       ))}
    </Menu>
    
    
    </DropDownWrapper>
    
  )
}

const DropDownWrapper=styled(({isXs,...props}:any)=><div {...props}/>)`
    align-self:end;
    position:absolute;
    right:100px;
    margin-top:100px;
    .lngWrap {
        display:flex;
        align-items:center;
        gap:5px;
    }

    .menu {
        position: absolute !important;
    }

    
`

export default LanguageDropDown