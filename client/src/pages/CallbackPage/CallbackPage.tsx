import { Typography, CircularProgress} from "@mui/material"
import { CallbackContainer } from "./CallbackPageStyles"
import { useAppDispatch } from "../../store/store"
import { useEffect } from "react";
import { getMyPassportUser } from "../../store/authReducer";
import { useNavigate } from "react-router-dom";

const CallbackPage = () => {
  const navigate=useNavigate();
  const dispatch=useAppDispatch();
  useEffect(()=>{
    dispatch(getMyPassportUser({onSuccess:()=>{
      navigate('/')
    }}));
  },[dispatch,navigate])
  return (
    <CallbackContainer>
        <Typography sx={{fontSize:35}}>Checking Credentials...</Typography>
        <CircularProgress size={80}/>
    </CallbackContainer>
  )
}

export default CallbackPage;