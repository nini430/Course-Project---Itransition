import { Delete, Edit } from '@mui/icons-material'
import {Dispatch, SetStateAction} from 'react'
import styled from 'styled-components'
import {Box, Button, Card, CardActions, CardContent, IconButton, Typography} from '@mui/material'
import { Collection as CollectionType } from "../../types/collection";
import NoImage from '../../assets/no-image.png'

interface IListViewCollectionProps {
    collection:CollectionType;
    isConfirmDialogOpen:boolean;
    setIsConfirmDialogOpen:Dispatch<SetStateAction<boolean>>
}

const ListViewCollection = ({collection,isConfirmDialogOpen,setIsConfirmDialogOpen}:IListViewCollectionProps) => {
  return (
    <StyledCard sx={{minHeight:'330px'}}>
       <CardContent sx={{display:'grid',gridTemplateColumns:'1fr 2fr auto auto',gridGap:'4px'}}>
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
            <CrudBtnContainer>
            <IconButton  sx={{alignItems:'flex-start',height:'40px'}}><Edit/></IconButton>
            <IconButton onClick={()=>{
                setIsConfirmDialogOpen(true);
            }}  sx={{alignItems:'flex-start',height:'40px'}}><Delete/></IconButton>
         
            </CrudBtnContainer>
           
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

const CrudBtnContainer=styled.div`
    display:flex;
    align-items:center;
`

const RightContent=styled.div`
    display:flex;
    flex-direction:column;
    gap:10px;
`

export default ListViewCollection;