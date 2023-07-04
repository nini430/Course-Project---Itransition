import { styled } from 'styled-components';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import { AddCircle, Search } from '@mui/icons-material';

import Table from '../../components/Comment/shared/Table';
import { adminColumns } from '../../utils/adminColumns';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useEffect, useState } from 'react';
import { filterUsers } from '../../store/adminReducer';
import useTableFilter from '../../hooks/useTableFilter';
import Loading from '../../components/Loading/Loading';
import CollectionModal from '../../components/shared/CollectionModal';
import FollowModal from '../../components/shared/FollowModal';

const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  const { users, getUsersLoading } = useAppSelector((state) => state.admin);
  const [filterValue, setFilterValue] = useState('');
  const [collectionModal,setCollectionModal]=useState<any[]|null>(null);
  const [followModal,setFollowModal]=useState<any[]|null>(null);
  const { searchValue, setSearchValue } = useTableFilter(filterValue);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchValue(filterValue);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [filterValue, setSearchValue]);
  useEffect(() => {
    dispatch(filterUsers({ filter: searchValue }));
  }, [dispatch, searchValue]);
  if (getUsersLoading) {
    return <Loading />;
  }
  return (
    <DashboardContainer>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <LeftContainer>
          <Button
            size="small"
            sx={{ border: '1px solid gray' }}
            startIcon={<AddCircle />}
          >
            Add New User
          </Button>
          <TextField
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            size="small"
          />
        </LeftContainer>
      </Box>
      <Table
      viewFollows={(follows:any)=>{
        console.log(follows);
        setFollowModal(follows);
      }}
       viewCollections={(item:any)=>{
        setCollectionModal(item);
      }} tableName="admin" data={users || []} columns={adminColumns} />
      <CollectionModal open={collectionModal} onClose={()=>setCollectionModal(null)} />
      <FollowModal open={followModal} onClose={()=>setFollowModal(null)} />
    </DashboardContainer>
  );
};

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const LeftContainer = styled.div`
  display: flex;
  gap: 20px;
`;

export default AdminDashboard;
