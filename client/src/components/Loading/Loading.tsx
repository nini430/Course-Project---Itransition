import {CircularProgress} from '@mui/material'
import styled from 'styled-components'

const Loading = () => {
  return (
    <LoadingContainer>
        <CircularProgress size={75}/>
    </LoadingContainer>
  )
}

const LoadingContainer=styled.div`
    width:100vw;
    height:100vh;
    display:flex;
    justify-content: center;
    align-items: center;
`

export default Loading;