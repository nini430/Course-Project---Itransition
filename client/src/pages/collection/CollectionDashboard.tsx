import { useEffect, useState } from 'react';
import moment from 'moment';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';

import { ExtendedCollection } from '../../types/collection';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { filterItems, getMyItems, sortItem } from '../../store/itemReducer';
import { styled } from 'styled-components';
import Loading from '../../components/Loading/Loading';
import { itemColumns } from '../../utils/itemColumns';
import { useTranslation } from 'react-i18next';
import {
  AddCircle,
  KeyboardDoubleArrowDown,
  Search,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import NoImage from '../../assets/no-image.png';
import Avatar from '../../components/Avatar/Avatar';
import AvatarImg from '../../assets/avatar.png';
import ReactionMapper from '../../components/shared/ReactionMapper';
import { ReactionMapper as ReactionMapperType } from '../../types/reaction';
import CustomFieldsModal from '../item/CustomFieldsModal';
import useTableFilter from '../../hooks/useTableFilter';
import { SortedDir } from '../../types/table';

interface ICollectionDashboardProps {
  currentCollection: ExtendedCollection | null;
}

const CollectionDashboard = ({
  currentCollection,
}: ICollectionDashboardProps) => {
  const [sortedColumn,setSortedColumn]=useState('');
  const [sortedDir,setSortedDir]=useState<SortedDir>('asc');
  const [filterValue, setFilterValue] = useState('');
  const { searchValue, setSearchValue } = useTableFilter(filterValue);
  const [customFieldsModal, setCustomFieldsModal] = useState(null);
  const [selectedItemId, setSelecteditemId] = useState('');
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [reactionModal, setReactionModal] = useState<
    ReactionMapperType[] | null
  >(null);
  const { myItems, getMyItemsLoading } = useAppSelector((state) => state.item);

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
  }, [filterValue, searchValue, setSearchValue]);

  useEffect(() => {
    if (searchValue) {
      dispatch(filterItems({ filter: searchValue, collectionId:currentCollection?.id as string }));
    }
  }, [searchValue, dispatch,currentCollection]);
  useEffect(()=>{
    if(sortedColumn) {
      dispatch(sortItem({sortedCol:sortedColumn,sortedDir,collectionId:currentCollection?.id as string}))
    }
  },[dispatch,currentCollection?.id,sortedDir,sortedColumn])
  if (getMyItemsLoading || !myItems) {
    return <Loading />;
  }

  

  return (
    <DashboardContainer>
      <Box sx={{ display: 'flex', gap: '20px' }}>
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
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            {itemColumns.map((column) => (
              <TableCell>
                {t(`item.${column.label}`)} 
              {column.isSortable && <IconButton onClick={()=>{
                if(sortedColumn===column.label) {
                    setSortedDir(prev=>prev==='asc'?'desc':'asc');
                }else{
                    setSortedColumn(column.label);
                    setSortedDir('desc');
                }
              }}>
               {sortedColumn===column.label ? (sortedDir==='asc'? <ArrowDropUp/>: <ArrowDropDown/> ): <ArrowDropUp/>} 
                </IconButton> }  
              
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {myItems.map((item) => (
            <TableRow>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                {item.tags
                  .split(',')
                  .map((item) => `#${item}`)
                  .join(',')}
              </TableCell>
              <TableCell>
                <span
                  onClick={() => {
                    setReactionModal(
                      item.reactions.map((reaction) => ({
                        id: reaction.id,
                        emoji: reaction.name,
                        user: reaction.user,
                      }))
                    );
                  }}
                  style={{ textDecoration: 'underline', cursor: 'pointer' }}
                >
                  {item.reactions?.length}
                </span>
              </TableCell>
              <TableCell>{item.comments?.length}</TableCell>
              <TableCell>{moment(item.createdAt).format('L')}</TableCell>
              <TableCell>
                <Link
                  style={{ textDecoration: 'none' }}
                  to={`/collection/${item.collectionId}`}
                >
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                  >
                    <Avatar
                      width={30}
                      height={30}
                      src={item.collection.image || NoImage}
                    />
                    <Typography>{item.collection.name}</Typography>
                  </Box>
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  style={{ textDecoration: 'none' }}
                  to={`/profile/${item.collection.author.id}`}
                >
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                  >
                    <Avatar
                      width={30}
                      height={30}
                      src={item.collection.author.profileImage || AvatarImg}
                    />
                    <Typography>
                      {item.collection.author.firstName}{' '}
                      {item.collection.author.lastName}
                    </Typography>
                  </Box>
                </Link>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    setCustomFieldsModal(item.customFieldValues);
                    setSelecteditemId(item.id);
                  }}
                  sx={{ border: '1px solid gray' }}
                >
                  {t('common.show')}
                </Button>
              </TableCell>
              <ReactionMapper
                open={reactionModal}
                onClose={() => setReactionModal(null)}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CustomFieldsModal
        itemId={selectedItemId}
        open={customFieldsModal}
        onClose={() => setCustomFieldsModal(null)}
      />
    </DashboardContainer>
  );
};

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default CollectionDashboard;
