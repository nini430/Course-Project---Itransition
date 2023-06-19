import styled from 'styled-components'
import {Card, CardContent, Typography,CardActions, Button} from '@mui/material'

import Avatar from '../../assets/avatar.png'
import { Item as ItemType } from '../../types/item'

interface IItemProps {
  item:any
}

const Item = ({item}:IItemProps) => {
  return (
    <ItemContainer>
        <CardContent sx={{flexDirection:'column',alignItems:'center',display:'flex',gap:'5px'}}>
        <Typography variant='h6'>{item.name}</Typography>
        <Typography sx={{color:'gray'}}>Collection: {item.collection.name}</Typography>
        <AuthorContainer>
        <Typography sx={{color:'gray'}}>Author:</Typography>
        <AvatarContainer>
      
        <AvatarImg  src={Avatar} alt="" />
        <Typography>{item.collection.author.firstName} {item.collection.author.lastName}</Typography>
        </AvatarContainer>
        </AuthorContainer>

        </CardContent>
        <CardActions>
          <Button sx={{border:'1px solid gray'}}>View more</Button>
        </CardActions>
    </ItemContainer>
  )
}

const ItemContainer=styled(Card)`
    width:300px;
    display:flex;
    flex-direction: column;
    gap:5px;
    align-items:center;
    cursor:pointer;
    transition:all 0.3s ease !important;

    &:hover {
        transform:scale(1.05);
    }
`

const AuthorContainer=styled.div`
  display:flex;
  gap:5px;
`

const AvatarContainer=styled.div`
  display:flex;
  align-items:center;
  gap:3px;
`
const AvatarImg=styled.img`
  width:25px;
  height:auto;
  border-radius:50%;
`

export default Item;