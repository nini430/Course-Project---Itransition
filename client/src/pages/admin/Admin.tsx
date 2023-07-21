import styled from 'styled-components';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AdminCard from './AdminCard';
import AdminDashboard from './AdminDashboard';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getUsers } from '../../store/adminReducer';


const Admin = () => {
  const navigate = useNavigate();
  const { authedUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!authedUser || authedUser.role !== 'ADMIN') {
      navigate('/');
    }
  }, [authedUser, navigate]);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  return (
    <AdminContainer>
      <Toaster />
      <AdminCard />
      <AdminDashboard />
    </AdminContainer>
  );
};

const AdminContainer = styled.div`
  width: 100vw;
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 40px;
`;

export default Admin;
