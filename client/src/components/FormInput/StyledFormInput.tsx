import {TextField} from '@mui/material'
import styled from 'styled-components'

const StyledInput=styled(({isX,isMob,isD,...props}:any)=>(<TextField {...props}/>))`
    width:'100%'
`

export default StyledInput;