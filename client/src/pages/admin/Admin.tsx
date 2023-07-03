import styled from 'styled-components'
import AdminCard from './AdminCard';
import AdminDashboard from './AdminDashboard';
import { useEffect } from 'react';
import { useAppDispatch } from '../../store/store';
import { getUsers } from '../../store/adminReducer';

const Admin = () => {
  const dispatch=useAppDispatch();
  useEffect(()=>{
    dispatch(getUsers())
  },[dispatch])
  return (
    <AdminContainer>
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