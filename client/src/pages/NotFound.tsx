import { Box, Button, Typography } from '@mui/material'
import { Home } from '@mui/icons-material'
import styled from 'styled-components'
import NotFoundImage from '../assets/not-found.jpg'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <Container>
    <StyledBox>
        <Typography sx={{fontSize:40,fontWeight:'bold'}}>Page Not Found</Typography>
        <NotFoundImg src={NotFoundImage} alt='not-found'/>
       <Link style={{textDecoration:'none'}} to='/'>
       <Button fullWidth sx={{border:'1px solid gray'}} startIcon={<Home/>}>Home</Button>
       </Link> 
    </StyledBox>
    </Container>
  )
}

const Container=styled.div`
    min-height:calc(100vh - 80px);  
    display:flex;
    justify-content: center;
    align-items: center;
`

const NotFoundImg=styled.img`
    width:600px;
    height:370px;
    object-fit: cover;

`

const StyledBox=styled(Box)`
    padding:20px;
    display:flex;
    flex-direction: column;
    gap:20px;
    align-items:center;
`

export default NotFound