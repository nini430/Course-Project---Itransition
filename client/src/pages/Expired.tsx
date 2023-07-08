import styled from 'styled-components'
import { Button, Typography } from '@mui/material'
import {SentimentVeryDissatisfied, ArrowBack} from '@mui/icons-material'
import { Link } from 'react-router-dom'

import ExpiredLink from '../assets/expired-link.jpg'


const Expired = () => {
  return (
    <Container>
      <Typography sx={{fontSize:30,fontStyle:'italic'}}> <SentimentVeryDissatisfied/> Link you followed is expired!</Typography>
      <ExpiredLinkImg src={ExpiredLink} alt=''/>
      <Link style={{textDecoration:'none'}} to='/'>
      <Button sx={{border:'1px solid gray'}} startIcon={<ArrowBack/>}>Go Back</Button>
      </Link>
    </Container>
  )
}

const Container=styled.div`
  min-height:calc(100vh - 80px);
  display:flex;
  flex-direction: column;
  align-items:center;
  justify-content: center;
  gap:20px;
`

const ExpiredLinkImg=styled.img`
    width:500px;
    border-radius:20px;
`

export default Expired