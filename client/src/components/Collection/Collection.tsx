import styled from 'styled-components'
import {Button, Card,CardActions,CardContent, Typography} from '@mui/material'

const Collection = () => {
  return (
    <StyledCard>
        <CardContent>
            <Typography variant='h6'>Books</Typography>
            <CollectionImg width={250} src="https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg" alt="" />
            <Typography sx={{color:'gray'}}>Topic: Books</Typography>
        </CardContent>
        <CardActions sx={{flexDirection:'column'}}>
            <Typography sx={{wordWrap:'break-word'}}>{'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem magni reprehenderit saepe quos, possimus explicabo, veritatis quibusdam, omnis non placeat fugit dicta voluptas'.slice(0,100)}...</Typography>
            <Button sx={{border:'1px solid gray'}} fullWidth>View More</Button>
        </CardActions>
    </StyledCard>
  )
}

const StyledCard=styled(Card)`
    width:300px;
    display:flex;
    flex-direction:column;
    gap:5px;
    cursor:pointer;
    transition:all 0.3s ease !important;
    
    &:hover {
        transform:scale(1.05);
    }
`

const CollectionImg=styled.img`
    
`

export default Collection