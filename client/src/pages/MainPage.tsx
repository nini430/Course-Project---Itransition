import {useEffect} from 'react';
import { useAppSelector } from "../store/store"
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate=useNavigate();
  const {authedUser}=useAppSelector(state=>state.auth);
  const userExists= authedUser || localStorage.getItem('authed_user');

  return (
    <div>MainPage</div>
  )
}

export default MainPage