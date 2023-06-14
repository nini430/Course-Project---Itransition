import styled from 'styled-components'
import {Switch,IconButton} from '@mui/material'
import {LightMode,DarkMode,LightModeOutlined,DarkModeOutlined} from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { changeTheme } from '../../store/commonReducer'

const ModeSwitch = () => {
  const dispatch=useAppDispatch();
  const {mode}=useAppSelector(state=>state.common);
  return (
    <SwitchContainer>
       {mode==='light'? <LightMode/> : <LightModeOutlined/>}
     <StyledSwitch checked={mode==='dark'} onChange={()=>dispatch(changeTheme())}/>
     {mode==='dark'? <DarkMode/> : <DarkModeOutlined/>}
    </SwitchContainer>
  )
}

const SwitchContainer=styled.div`
    display:flex;
    align-items:center;
`

const StyledSwitch=styled(Switch)`
        padding:6px !important;
`

export default ModeSwitch;