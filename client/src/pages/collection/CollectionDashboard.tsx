import { useEffect, useState } from 'react';
import moment from 'moment';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { ExtendedCollection } from '../../types/collection';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getMyItems } from '../../store/itemReducer';
import { styled } from 'styled-components';
import Loading from '../../components/Loading/Loading';
import { itemColumns } from '../../utils/itemColumns';
import { useTranslation } from 'react-i18next';
import { AddCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import NoImage from '../../assets/no-image.png';
import Avatar from '../../components/Avatar/Avatar';
import AvatarImg from '../../assets/avatar.png';
import ReactionMapper from '../../components/shared/ReactionMapper';
import { ReactionMapper as ReactionMapperType } from '../../types/reaction';
import CustomFieldsModal from '../item/CustomFieldsModal';

interface ICollectionDashboardProps {
  currentCollection: ExtendedCollection | null;
}

const CollectionDashboard = ({
  currentCollection,
}: ICollectionDashboardProps) => {
  const [customFieldsModal,setCustomFieldsModal]=useState(null);
  const [selectedItemId,setSelecteditemId]=useState('')
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [reactionModal, setReactionModal] = useState<
    ReactionMapperType[] | null
  >(null);
  const { myItems, getMyItemsLoading } = useAppSelector((state) => state.item);
  
  useEffect(() => {
    dispatch(getMyItems({ collectionId: currentCollection?.id }));
  }, [dispatch, currentCollection?.id]);
  if (getMyItemsLoading || !myItems) {
    return <Loading />;
  }
  return (
    <DashboardContainer>
      <Link to={`/add-item/${currentCollection?.id as string}`}>
        <Button
          startIcon={<AddCircle />}
          sx={{ alignSelf: 'flex-start', border: '1px solid gray' }}
        >
          Add New Item
        </Button>
      </Link>

      <Table>
        <TableHead>
          <TableRow>
            {itemColumns.map((column) => (
              <TableCell>{t(`item.${column.label}`)}</TableCell>
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
                <span onClick={()=>{
                  setReactionModal(item.reactions.map(reaction=>({
                    id:reaction.id,
                    emoji:reaction.name,
                    user: reaction.user
                  })))
                }} style={{textDecoration:'underline',cursor:'pointer'}}>
                {item.reactions.length}
                </span>
                
                </TableCell>
              <TableCell>{item.comments.length}</TableCell>
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
                  onClick={()=>{
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
      <CustomFieldsModal itemId={selectedItemId} open={customFieldsModal} onClose={()=>setCustomFieldsModal(null)}/>
    </DashboardContainer>
  );
};

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default CollectionDashboard;
