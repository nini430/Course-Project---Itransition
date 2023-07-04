import {Box, Button, Dialog, DialogContent, Typography} from '@mui/material'
import Avatar from '../Avatar/Avatar';
import NoImage from '../../assets/no-image.png'
import { Link } from 'react-router-dom';

interface ICollectionModalProps {
    open?:null | any[];
    onClose:()=>void;
}

const CollectionModal = ({open,onClose}:ICollectionModalProps) => {
  return (
    <Dialog open={!!open} onClose={onClose}>
        <DialogContent sx={{display:'flex',flexDirection:'column',gap:'20px',minWidth:400}}>
          {open && open.length===0 && (
            <Typography sx={{fontSize:28}}>No records Yet</Typography>
          )}
            {open?.map(item=>(
               <Box sx={{display:'flex',alignItems:'center',justifyContent:'space-between'}} key={item.id}>
                <Box sx={{display:'flex',alignItems:'center',gap:'5px'}}>
                <Avatar width={50} height={50} src={item?.image || NoImage }/>
                <Typography>{item?.name}</Typography>
                </Box>
                <Link style={{textDecoration:'none'}} to={`/collection/${item.id}`}>
                <Button sx={{border:'1px solid gray'}}>View</Button></Link>
               
               </Box> 
            ))}
        </DialogContent> 
    </Dialog>
  )
}

export default CollectionModal