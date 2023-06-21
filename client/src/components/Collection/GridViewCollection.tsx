import styled from 'styled-components'
import {Button, Card,CardActions,CardContent, Typography} from '@mui/material'
import { Collection as CollectionType } from '../../types/collection'
import NoImage from '../../assets/no-image.png'

interface ICollectionProps {
    collection:CollectionType
}

const Collection = ({collection}:ICollectionProps) => {
  return (
    <StyledCard>
        <CardContent>
            <Typography variant='h6'>{collection.name}</Typography>
            <CollectionImg  src={collection.image||NoImage} alt="" />
            <Typography sx={{color:'gray'}}>Topic: {collection.topic}</Typography>
        </CardContent>
        <CardActions sx={{flexDirection:'column'}}>
            <Typography  dangerouslySetInnerHTML={{__html:collection.description.slice(0,25)}}  sx={{wordWrap:'break-word'}}></Typography>
            <Button  sx={{border:'1px solid gray',justifySelf:'flex-end !important'}}>View More</Button>
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
    width:250px;
    height:250px;
    object-fit:cover;
`

export default Collection