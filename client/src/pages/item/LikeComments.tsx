import styled from 'styled-components'
import {Card, Divider, Typography} from '@mui/material'
import Comment from '../../components/Comment/Comment'
import AddComment from '../../components/Comment/AddComment'

const LikeComments = () => {
  return (
    <Wrapper>
        <Typography sx={{mb:2}}>34 Comments</Typography>
            <LikeCommentContainer>
        
       
        <Comment/>
        <Divider sx={{color:'gray'}}/>
        <Comment/>
        <Divider sx={{color:'gray'}}/>
        <Comment/>
        <Divider sx={{color:'gray'}}/>
        <Comment/>
        <Divider sx={{color:'gray'}}/>
        <Comment/>
        <Divider sx={{color:'gray'}}/>
        <Comment/>
        <Divider sx={{color:'gray'}}/>
        <Comment/>
        <Divider sx={{color:'gray'}}/>
        
    </LikeCommentContainer>
    <AddComment/>
    </Wrapper>

  )
}

const Wrapper=styled(Card)`
        min-width:80%;
        height:450px;
        padding:20px;
`
const LikeCommentContainer=styled.div`
        max-height:300px;
        overflow-y:auto !important;
        
`


export default LikeComments