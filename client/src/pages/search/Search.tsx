import { Tab, Typography } from '@mui/material'
import {FileCopy,Collections,Comment,Person3} from '@mui/icons-material'
import styled from 'styled-components'
import SearchCommentItem from '../../components/search/SearchCommenItem'
import SearchUserItem from '../../components/search/SearchUserItem'
import { TabContext, TabList } from '@mui/lab'
import { useState } from 'react'
import { SearchItems } from '../../types/search'

const Search = () => {
  const [selectedFilter,setSelectedFilter]=useState<SearchItems>('items')
  return (
    <SearchContainer>
      <Typography sx={{fontSize:30,fontStyle:'italic',p:1,borderBottom:'1px solid gray'}}>5 Items Found</Typography>
      <TabContext value={selectedFilter}>
        <TabList TabIndicatorProps={{style:{borderColor:'gray !important'}}} onChange={(e,value)=>setSelectedFilter(value)}>
          <Tab icon={<FileCopy/>} value='items' label='Items'/>
          <Tab icon={<Collections/>} value='collections' label='Collections'/>
          <Tab icon={<Comment/>} value='comments' label='Comments'/>
          <Tab icon={<Person3/>} value='Users' label='users'/>
        </TabList>
      </TabContext>
      <ItemsContainer>
        <SearchCommentItem/>
        <SearchUserItem/>
      </ItemsContainer>
    </SearchContainer>
  )
}

const SearchContainer=styled.div`
  min-height:calc(100vh - 80px);
  padding:20px;
  display:flex;
  flex-direction: column;
  align-items:start;
  gap:20px;
`

const ItemsContainer=styled.div`
  display:flex;
  flex-wrap:wrap;
  gap:20px;
`

export default Search