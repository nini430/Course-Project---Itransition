import {Menu} from '@mui/material';
import styled from 'styled-components'


const StyledMenu=styled(Menu)`
    .MuiMenu-paper {
        position:absolute !important;
     width:148px !important;
     top:142.5px !important;
     left:calc(100vw - 100px - 148px) !important;
    }
`

export default StyledMenu;

