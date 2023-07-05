import styled from 'styled-components'
import {Toaster} from 'react-hot-toast';
import AdminCard from './AdminCard';
import AdminDashboard from './AdminDashboard';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getUsers } from '../../store/adminReducer';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate=useNavigate();
  const {authedUser}=useAppSelector(state=>state.auth);
  const auth=authedUser || JSON.parse(localStorage.getItem('authed_user') as string);
  const dispatch=useAppDispatch();
  useEffect(()=>{
    if(auth.role!=='ADMIN') {
      navigate('/')
    }
  },[auth.role,navigate])
  useEffect(()=>{
    dispatch(getUsers())
  },[dispatch])
  return (
    <AdminContainer>
      <Toaster/>
        <AdminCard/>
        <AdminDashboard/>
    </AdminContainer>
  )
}

const AdminContainer=styled.div`
    width:100vw;
    min-height:calc(100vh - 80px);
    display:flex;
    flex-direction: column;
    padding:20px;
    gap:40px;
`

export default Admin;