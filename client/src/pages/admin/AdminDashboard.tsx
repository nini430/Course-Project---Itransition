import { styled } from 'styled-components';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from '@mui/material';
import {
  AddCircle,
  Block,
  DeleteTwoTone,
  RemoveOutlined,
  Search,
  Undo,
} from '@mui/icons-material';

import Table from '../../components/Comment/shared/Table';
import { adminColumns } from '../../utils/adminColumns';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useEffect, useState } from 'react';
import { changeStatus, filterUsers } from '../../store/adminReducer';
import useTableFilter from '../../hooks/useTableFilter';
import Loading from '../../components/Loading/Loading';
import CollectionModal from '../../components/shared/CollectionModal';
import FollowModal from '../../components/shared/FollowModal';
import { Link } from 'react-router-dom';
import { Statuses } from '../../types/common';
import ConfirmDialog from '../../components/shared/ConfirmDialog';
import { toast } from 'react-hot-toast';
import toastOptions from '../../utils/toastOptions';

const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  const { users, getUsersLoading, changeStatusLoading } = useAppSelector(
    (state) => state.admin
  );
  const [filterValue, setFilterValue] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<'all' | Statuses>('all');
  const [collectionModal, setCollectionModal] = useState<any[] | null>(null);
  const [followModal, setFollowModal] = useState<any[] | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<any | null>(null);
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
          <Link to={`/add-user`} style={{ textDecoration: 'none' }}>
            <Button
              size="small"
              sx={{ border: '1px solid gray' }}
              startIcon={<AddCircle />}
            >
              Add New User
            </Button>
          </Link>

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
          <Select
            size="small"
            sx={{ width: 200 }}
            value={selectedFilter}
            onChange={(e) =>
              setSelectedFilter(e.target.value as 'all' | Statuses)
            }
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="blocked">Blocked</MenuItem>
            <MenuItem value="deleted">Deleted</MenuItem>
          </Select>
        </LeftContainer>
        <RightContainer>
          <Tooltip placement="top" title="Block User(s)">
            <IconButton
              onClick={() => setConfirmDialog({ name: 'block', topic: 'user' })}
              disabled={selectedIds.length === 0}
            >
              <Block />
            </IconButton>
          </Tooltip>
          <Tooltip placement="top" title="Remove User(s)">
            <IconButton
              onClick={() =>
                setConfirmDialog({ name: 'remove', topic: 'user' })
              }
              disabled={selectedIds.length === 0}
            >
              <DeleteTwoTone />
            </IconButton>
          </Tooltip>
          <Tooltip placement="top" title="Unblock User(s)">
            <IconButton
              onClick={() =>
                setConfirmDialog({ name: 'unblock', topic: 'user' })
              }
              disabled={selectedIds.length === 0}
            >
              <Undo/>
            </IconButton>
          </Tooltip>
        </RightContainer>
      </Box>
      <Table
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        viewFollows={(follows: any) => {
          console.log(follows);
          setFollowModal(follows);
        }}
        viewCollections={(item: any) => {
          setCollectionModal(item);
        }}
        tableName="admin"
        data={
          users
            ? selectedFilter === 'all'
              ? users
              : (users as any)?.filter(
                  (user: any) => user.status.data === selectedFilter
                )
            : []
        }
        columns={adminColumns}
      />
      <CollectionModal
        open={collectionModal}
        onClose={() => setCollectionModal(null)}
      />
      <FollowModal open={followModal} onClose={() => setFollowModal(null)} />
      <ConfirmDialog
        onOk={() => {
          dispatch(
            changeStatus({
              userIds: selectedIds,
              status:
                confirmDialog.name === 'block'
                  ? 'blocked'
                  : confirmDialog.name === 'unblock'
                  ? 'active'
                  : 'deleted',
              onSuccess: () => {
                setConfirmDialog(null);
                setSelectedIds([]);
                toast.success('status_changed_success', toastOptions);
              },
            })
          );
        }}
        loading={changeStatusLoading}
        open={confirmDialog}
        onClose={() => setConfirmDialog(null)}
      />
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

const RightContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export default AdminDashboard;
