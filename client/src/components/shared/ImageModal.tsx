import {Dialog,DialogContent, DialogTitle, IconButton} from '@mui/material'
import {Close} from '@mui/icons-material'

interface IImageModalProps {
    image:string | null;
    onClose:()=>void;
}

const ImageModal = ({image,onClose}:IImageModalProps) => {
  return (
    <Dialog open={!!image} onClose={onClose}>
      <DialogTitle sx={{position:'relative'}}>
        <IconButton onClick={onClose} sx={{position:'absolute',right:0}}>
          <Close/>
        </IconButton>
      </DialogTitle>
        <DialogContent>
            <img style={{objectFit:'cover'}} src={image as string} width={300} height={300} alt="" />
        </DialogContent>
    </Dialog>
  )
}

export default ImageModal;