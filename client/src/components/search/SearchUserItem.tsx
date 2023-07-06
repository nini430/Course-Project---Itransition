import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import Avatar from '../Avatar/Avatar'
import AvatarImg from '../../assets/avatar.png'
import { styled } from 'styled-components'

const SearchUserItem = () => {
  return (
    <Container>
        <Card sx={{minWidth:300}}>
        <CardContent sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
            <Avatar src={AvatarImg}  width={30} height={30}/>
            <Typography>Nino Gogatishvili</Typography>
            <Typography>36 Collections</Typography>
        </CardContent>
        <CardActions sx={{display:'flex',justifyContent:'center'}}>
            <Button sx={{border:'1px solid gray'}}>View More</Button>
        </CardActions>
    </Card>
    </Container>
    
  )
}

const Container=styled.div`
    padding:10px;
    border:1px solid gray;
`

export default SearchUserItem