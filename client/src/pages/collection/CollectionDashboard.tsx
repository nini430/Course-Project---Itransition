import {useEffect} from 'react';
import {Button, Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material'

import { ExtendedCollection } from "../../types/collection";
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getMyItems } from '../../store/itemReducer';
import { styled } from 'styled-components';
import Loading from '../../components/Loading/Loading';
import { itemColumns } from '../../utils/itemColumns';
import { useTranslation } from 'react-i18next';
import { AddCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import routesPath from '../../utils/routes';



interface ICollectionDashboardProps {
    currentCollection: ExtendedCollection | null
}

const CollectionDashboard = ({currentCollection}:ICollectionDashboardProps) => {
  const {t}=useTranslation();
  const dispatch=useAppDispatch();
  const {myItems, getMyItemsLoading }=useAppSelector(state=>state.item);
  useEffect(()=>{
    dispatch(getMyItems({userId:currentCollection?.author.id as string}))
  },[dispatch,currentCollection?.author.id])
  if(getMyItemsLoading || !myItems) {
    return <Loading/>
  }
  return (
   <DashboardContainer>
    <Link to={`/add-item/${currentCollection?.id as string}`}>
    <Button startIcon={<AddCircle/>} sx={{alignSelf:'flex-start',border:'1px solid gray'}}>Add New Item</Button></Link>
    
      <Table>
       <TableHead>
        <TableRow>
         {itemColumns.map(column=>(
          <TableCell>{t(`item.${column.label}`)}</TableCell>
         ))}
        </TableRow>
       </TableHead>
      </Table>
   </DashboardContainer>
  )
}

const DashboardContainer=styled.div`
  display: flex;
  flex-direction:column;
  gap:10px;
`

export default CollectionDashboard;