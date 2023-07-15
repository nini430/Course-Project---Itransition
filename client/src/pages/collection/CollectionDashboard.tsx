import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from '@mui/material';
import { Delete, Download } from '@mui/icons-material';
import { CSVLink } from 'react-csv';

import { ExtendedCollection } from '../../types/collection';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { filterItems, getMyItems, removeItems, sortItem } from '../../store/itemReducer';
import { styled } from 'styled-components';
import Loading from '../../components/Loading/Loading';
import { itemColumns } from '../../utils/itemColumns';
import { useTranslation } from 'react-i18next';
import { AddCircle, Search } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import ReactionMapper from '../../components/shared/ReactionMapper';
import { ReactionMapper as ReactionMapperType } from '../../types/reaction';
import CustomFieldsModal from '../item/CustomFieldsModal';
import useTableFilter from '../../hooks/useTableFilter';
import { SortedDir } from '../../types/table';
import { Item } from '../../types/item';
import Table from '../../components/Comment/shared/Table';
import { SimpleUser } from '../../types/auth';
import FollowModal from '../../components/shared/FollowModal';
import ConfirmDialog from '../../components/shared/ConfirmDialog';
import {toast,Toaster} from 'react-hot-toast';
import toastOptions from '../../utils/toastOptions';

interface ICollectionDashboardProps {
  currentCollection: ExtendedCollection | null;
}

const CollectionDashboard = ({
  currentCollection,
}: ICollectionDashboardProps) => {
  const [confirmDialog,setConfirmDialog]=useState<any | null>(null);
  const [selectedRowKeys,setSelectedRowKeys]=useState<string[]>([])
  const [sortedColumn, setSortedColumn] = useState('');
  const [sortedDir, setSortedDir] = useState<SortedDir>('asc');
  const [filterValue, setFilterValue] = useState('');
  const { searchValue, setSearchValue } = useTableFilter(filterValue);
  const [customFieldsModal, setCustomFieldsModal] = useState(null);
  const [selectedItemId, setSelecteditemId] = useState('');
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [reactionModal, setReactionModal] = useState<
    ReactionMapperType[] | null
  >(null);
  const [followModal,setFollowModal]=useState<null | SimpleUser[]>(null);
  const { myItems, getMyItemsLoading, removeItemLoading } = useAppSelector((state) => state.item);

  useEffect(() => {
    dispatch(getMyItems({ collectionId: currentCollection?.id as string }));
  }, [dispatch, currentCollection?.id]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchValue(filterValue);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [filterValue, setSearchValue]);

  useEffect(() => {
    dispatch(
      filterItems({
        filter: searchValue,
        collectionId: currentCollection?.id as string,
      })
    );
  }, [searchValue, dispatch, currentCollection]);
  useEffect(() => {
    if (sortedColumn) {
      dispatch(
        sortItem({
          sortedCol: sortedColumn,
          sortedDir,
          collectionId: currentCollection?.id as string,
        })
      );
    }
  }, [dispatch, currentCollection?.id, sortedDir, sortedColumn]);
  if (getMyItemsLoading || !myItems) {
    return <Loading />;
  }

  return (
    <DashboardContainer>
      <Toaster/>
      <Box sx={{ display: 'flex', justifyContent:'space-between', alignItems:'center'}}>
        <ToolbarSides>
        <Link to={`/add-item/${currentCollection?.id as string}`}>
          <Button
            startIcon={<AddCircle />}
            sx={{ alignSelf: 'flex-start', border: '1px solid gray' }}
          >
            Add New Item
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
        <Button startIcon={<Download />} sx={{ border: '1px solid gray' }}>
          <CSVLink
            style={{ textDecoration: 'none' }}
            filename={`items-${currentCollection?.id as string}`}
            data={myItems as Item[]}
          >
            Export Items to CSV
          </CSVLink>
        </Button>
        </ToolbarSides>
        <ToolbarSides>
          <Tooltip title='Delete'>
            <IconButton onClick={()=>setConfirmDialog(selectedRowKeys)}><Delete/></IconButton>
          </Tooltip>
        </ToolbarSides>
        
      </Box>
      <Table
      sortItem={(sortedCol:string,sortedDir:SortedDir)=>{
        setSortedColumn(sortedCol);
        setSortedDir(sortedDir);
        dispatch(sortItem({
          sortedCol:sortedCol,
          sortedDir,
          collectionId:currentCollection?.id as string
        }))
      }}
      sortedColumn={sortedColumn}
      sortedDir={sortedDir}
      selectedIds={selectedRowKeys}
      setSelectedIds={setSelectedRowKeys}
      viewComments={(data:any)=>{
        console.log(data);
        setFollowModal(data.map((item:any)=>item.author));
      }}
        viewReacts={(data: any) => {
          setReactionModal(
            data.map((reaction: any) => ({
              id: reaction.id,
              emoji: reaction.name,
              user: reaction.user,
            }))
          );
        }}
        viewCustom={(item: any) => {
          setCustomFieldsModal(item.customFields.fields);
          setSelecteditemId(item.customFields.id);
        }}
        data={myItems || []}
        tableName="item"
        columns={itemColumns}
      />
      <ReactionMapper
        open={reactionModal}
        onClose={() => setReactionModal(null)}
      />
      <CustomFieldsModal
        itemId={selectedItemId}
        collectionId={currentCollection?.id as string}
        open={customFieldsModal}
        onClose={() => setCustomFieldsModal(null)}
      />
      <FollowModal open={followModal} onClose={()=>setFollowModal(null)} />
      <ConfirmDialog loading={removeItemLoading} onOk={()=>{
        dispatch(removeItems({itemIds:selectedRowKeys,onSuccess:(message:string)=>{
          setConfirmDialog(null);
          toast.success(message,toastOptions);
        }}))
      }} open={confirmDialog} onClose={()=>setConfirmDialog(null)}/>
    </DashboardContainer>
  );
};

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ToolbarSides=styled.div`
  display:flex;
  align-items:center;
  gap:20px;
`
export default CollectionDashboard;
