import styled from 'styled-components'
import { Box, Card, Typography } from '@mui/material'


import { useAppSelector } from '../../store/store'
import Avatar from '../../components/Avatar/Avatar';
import NoPhoto from '../../assets/no-image.png'
import AvatarImg from '../../assets/avatar.png'
import Loading from '../../components/Loading/Loading';



const ItemCard = () => {
  const {currentItem}=useAppSelector(state=>state.item);
  return (
    <StyledCard>
        <Typography sx={{textAlign:'center'}}>{currentItem?.name}</Typography>
        <Box sx={{display:'flex',alignItems:'center',gap:'10px'}}>
          <Typography sx={{color:'gray'}}>Tags:</Typography>
         <Typography>{currentItem?.tags.split(',').map(item=>`#${item}`)}</Typography>
      </Box>
        <Box sx={{display:'flex',alignItems:'center',gap:'10px'}}>
          <Typography sx={{color:'gray'}}>Collection:</Typography>
          <Box sx={{display:'flex',alignItems:'center',gap:'10px'}}>
            <Avatar width={40} height={40} src={currentItem?.collection.image || NoPhoto }/>
          <Typography>{currentItem?.collection.name}</Typography>
         
      </Box>
      
      </Box>
      <Box sx={{display:'flex',alignItems:'center',gap:'10px'}}>
          <Typography sx={{color:'gray'}}>Author:</Typography>
          <Box sx={{display:'flex',alignItems:'center',gap:'10px'}}>
            <Avatar width={40} height={40} src={currentItem?.collection.author.profileImage || AvatarImg }/>
          <Typography>{currentItem?.collection.author.firstName} {currentItem?.collection.author.lastName}</Typography>
         
      </Box>
      
      </Box>
      <CustomFieldsContainer>
        <Typography sx={{color:'gray'}}>Custom Fields:</Typography>
        {currentItem?.customFieldValues ? (
            Object.entries(currentItem?.customFieldValues)?.map(([key,value])=>(
              <Box key={key} sx={{display:'flex',alignItems:'center',gap:'10px'}}>
              <Typography sx={{color:'gray'}}>{key}:</Typography>
             <Typography>{value as string}</Typography>
          </Box>
             ))
        ): <Loading/>}
         
      </CustomFieldsContainer>
      
    </StyledCard>
  )
}

const StyledCard=styled(Card)`
    width: 400px;
    display:flex;
    flex-direction: column;
    gap:15px;
    padding:20px;

`

const CustomFieldsContainer=styled.div`
  display:flex;
  flex-direction: column;
  gap:20px;
`

export default ItemCard;