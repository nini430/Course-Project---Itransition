import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material'
import {KeyboardArrowDown} from '@mui/icons-material'
import Avatar from '../../components/Avatar/Avatar'
import AvatarImg from '../../assets/avatar.png'


const AdminCard = () => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<KeyboardArrowDown/>}>
        Admin Info
        </AccordionSummary>
        <AccordionDetails>
          <Avatar width={70} height={70} src={AvatarImg}/>
          <Box sx={{display:'flex',alignItems:'center',gap:'3px'}}>
            <Typography sx={{color:'gray'}}>Name:</Typography>
            <Typography>Nino Gogatishvili</Typography>
          </Box>
          <Box sx={{display:'flex',alignItems:'center',gap:'3px'}}>
            <Typography sx={{color:'gray'}}>E-mail:</Typography>
            <Typography>ningogatishvili1@gmail.com</Typography>
          </Box>
        </AccordionDetails>
    </Accordion>
  )
}




export default AdminCard