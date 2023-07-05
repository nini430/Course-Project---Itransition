import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material'
import {KeyboardArrowDown} from '@mui/icons-material'
import Avatar from '../../components/Avatar/Avatar'
import AvatarImg from '../../assets/avatar.png'
import { useAppSelector } from '../../store/store'


const AdminCard = () => {
  const {authedUser}=useAppSelector(state=>state.auth);
  const auth = authedUser || JSON.parse(localStorage.getItem('authed_user') as string);
  return (
    <Accordion>
      <AccordionSummary expandIcon={<KeyboardArrowDown/>}>
        Admin Info
        </AccordionSummary>
        <AccordionDetails>
          <Avatar width={70} height={70} src={AvatarImg}/>
          <Box sx={{display:'flex',alignItems:'center',gap:'3px'}}>
            <Typography sx={{color:'gray'}}>Name:</Typography>
            <Typography>{auth.firstName} {auth.lastName}</Typography>
          </Box>
          <Box sx={{display:'flex',alignItems:'center',gap:'3px'}}>
            <Typography sx={{color:'gray'}}>E-mail:</Typography>
            <Typography>{auth.email}</Typography>
          </Box>
        </AccordionDetails>
    </Accordion>
  )
}




export default AdminCard