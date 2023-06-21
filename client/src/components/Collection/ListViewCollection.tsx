import {} from '@mui/icons-material'
import styled from 'styled-components'
import {Box, Button, Card, CardActions, CardContent, Typography} from '@mui/material'
import { Collection as CollectionType } from "../../types/collection";
import NoImage from '../../assets/no-image.png'

interface IListViewCollectionProps {
    collection:CollectionType
}

const ListViewCollection = ({collection}:IListViewCollectionProps) => {
  return (
    <StyledCard sx={{minHeight:'330px'}}>
       <CardContent sx={{display:'grid',gridTemplateColumns:'1fr 2fr'}}>
        <LeftContent>
        <Typography sx={{fontSize:20}}>{collection.name}</Typography>
        <CollectionImg src={collection.image || NoImage } alt=''/>
        </LeftContent>
        <RightContent>
            <Box sx={{display:'flex',gap:'10px'}}>
             <Typography sx={{color:'gray'}}>Topic: </Typography>
             <Typography>{collection.topic}</Typography>
            </Box>
            <Box sx={{display:'flex',gap:'10px'}}>
             <Typography sx={{color:'gray'}}>Description: </Typography>
             <Typography dangerouslySetInnerHTML={{__html:collection.description.slice(0,800)}} />
            </Box>
        </RightContent>
        </CardContent> 
        <CardActions>
        <Button fullWidth sx={{border:'1px solid gray'}}>View More</Button>
        </CardActions>
       
    </StyledCard>
  )
}

const StyledCard=styled(Card)`
    min-height:330px !important;
`

const CollectionImg=styled.img`
    width:200px;
    height:200px;
    object-fit:cover;
`
const LeftContent=styled.div`
    display:flex;
    flex-direction:column;
    gap:10px;
`

const RightContent=styled.div`
    display:flex;
    flex-direction:column;
    gap:10px;
`

export default ListViewCollection;