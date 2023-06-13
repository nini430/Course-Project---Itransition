import {MenuItem,Button} from '@mui/material'
import {KeyboardArrowDown} from '@mui/icons-material'
import styled from 'styled-components'

import StyledMenu from "./StyledLanguageDropDown"
import languages from '../../utils/langs'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'react-responsive'


const LanguageDropDown = () => {
    const {t}=useTranslation();
    const isExtraSmall=useMediaQuery({maxWidth: 500})
  return (
    <DropDownWrapper isXs={isExtraSmall}>
    <Button variant="contained" color="inherit" endIcon={<KeyboardArrowDown/>}>
    Options
    </Button>
    <StyledMenu open={false}>
       {languages.map(lang=>(
        <MenuItem>
        {t(lang.name)}
        </MenuItem>
       ))}
    </StyledMenu>
    
    </DropDownWrapper>
    
  )
}

const DropDownWrapper=styled(({isXs,...props}:any)=><div {...props}/>)`
    position:absolute;
    top:20%;
    right:${({isXs})=>isXs?'10px':'20%'};
`

export default LanguageDropDown