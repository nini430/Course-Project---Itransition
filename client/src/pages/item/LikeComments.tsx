import styled from 'styled-components'
import {Card, Divider, Typography} from '@mui/material'
import Comment from '../../components/Comment/Comment'
import AddComment from '../../components/Comment/AddComment'
import { useAppSelector } from '../../store/store'
import Loading from '../../components/Loading/Loading'
import Empty from '../../components/Empty/Empty'

const LikeComments = () => {
  const {getSingleItemLoading,currentItem}=useAppSelector(state=>state.item);
  if(!currentItem || getSingleItemLoading) {
    return (
      <Loading/>
    )
  }
  return (
    <Wrapper>
        <Typography sx={{mb:2}}>{currentItem.comments.length} Comments</Typography>
            <LikeCommentContainer>
        
       {currentItem.comments.length===0? (
        <Empty message='No Comments'/>
       ):(
        currentItem.comments.map(comment=>(
            <>
             <Comment comment={comment}/>
        <Divider sx={{color:'gray'}}/>
            </>
        ))
       )}
       
        
        
    </LikeCommentContainer>
    <AddComment/>
    </Wrapper>

  )
}

const Wrapper=styled(Card)`
        min-width:80%;
        padding:20px;
`
const LikeCommentContainer=styled.div`
        max-height:300px;
        height:300px;
        overflow-y:auto !important;
        
`


export default LikeComments