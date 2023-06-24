import { Delete, Edit } from '@mui/icons-material'
import {Dispatch, SetStateAction} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {Avatar, Box, Button, Card, CardActions, CardContent, IconButton, Typography} from '@mui/material'
import { Collection as CollectionType } from "../../types/collection";
import NoImage from '../../assets/no-image.png'
import AvatarComp from '../Avatar/Avatar'
import AvatarImg from '../../assets/avatar.png'

interface IListViewCollectionProps {
    collection:CollectionType;
    isConfirmDialogOpen:boolean;
    setIsConfirmDialogOpen:Dispatch<SetStateAction<boolean>>
}

const ListViewCollection = ({collection,isConfirmDialogOpen,setIsConfirmDialogOpen}:IListViewCollectionProps) => {
  return (
    <Link style={{textDecoration:'none'}} to={`/collections/${collection.id}`}>
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
            <Link to={`/profile/${collection.author.id}`} style={{textDecoration:'none'}}>
            <Box sx={{display:'flex',gap:'10px',alignItems:'center'}}>
             <Typography sx={{color:'gray'}}>Author: </Typography>
             <Box sx={{display:'flex',gap:'10px', alignItems:'center'}}>
                <AvatarComp   width={40} height={40} src={collection.author.profileImage || AvatarImg}/>
             <Typography sx={{color:'gray'}}>{collection.author.firstName} {collection.author.lastName} </Typography>
             
            </Box>
            </Box></Link>
           

           
        </RightContent>
        </CardContent> 
        <CardActions>
        <Button fullWidth sx={{border:'1px solid gray'}}>View More</Button>
        </CardActions>
       
    </StyledCard>
    </Link>
   
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