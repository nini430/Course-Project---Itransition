import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material'
import {KeyboardArrowDown} from '@mui/icons-material'
import Avatar from '../../components/Avatar/Avatar'
import AvatarImg from '../../assets/avatar.png'
import { useAppSelector } from '../../store/store'


const AdminCard = () => {
  const {authedUser}=useAppSelector(state=>state.auth);
  const {users}=useAppSelector(state=>state.admin);
  return (
    <Accordion>
      <AccordionSummary expandIcon={<KeyboardArrowDown/>}>
        Admin Info
        </AccordionSummary>
        <AccordionDetails>
          <Avatar width={70} height={70} src={AvatarImg}/>
          <Box sx={{display:'flex',alignItems:'center',gap:'3px'}}>
            <Typography sx={{color:'gray'}}>Name:</Typography>
            <Typography>{authedUser?.firstName} {authedUser?.lastName}</Typography>
          </Box>
          <Box sx={{display:'flex',alignItems:'center',gap:'3px'}}>
            <Typography sx={{color:'gray'}}>E-mail:</Typography>
            <Typography>{authedUser?.email}</Typography>
          </Box>
          <Box sx={{display:'flex',alignItems:'center',gap:'3px'}}>
            <Typography sx={{color:'gray'}}>User Amount:</Typography>
            <Typography>{users?.length}</Typography>
          </Box>
          <Box sx={{display:'flex',alignItems:'center',gap:'3px'}}>
            <Typography sx={{color:'gray'}}>Blocked Users:</Typography>
            <Typography>{users?.length}</Typography>
          </Box>
        </AccordionDetails>
    </Accordion>
  )
}




export default AdminCard