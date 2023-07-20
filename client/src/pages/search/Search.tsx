import { Tab, Typography } from '@mui/material';
import { FileCopy, Collections, Comment, Person3 } from '@mui/icons-material';
import styled from 'styled-components';
import SearchItem from '../../components/search/SearchItem';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { ChangeEvent, Fragment, useState } from 'react';
import { SearchItems } from '../../types/search';
import { useAppSelector } from '../../store/store';
import Loading from '../../components/Loading/Loading';
import AvatarImg from '../../assets/avatar.png';
import useResponsive from '../../hooks/useResponsive';

const Search = () => {
  const [selectedFilter, setSelectedFilter] = useState<SearchItems | 'all'>(
    'all'
  );
  const { searchedItems, searchLoading } = useAppSelector(
    (state) => state.search
  );
  const {sm,xs}=useResponsive();
  if (searchLoading) {
    return <Loading />;
  }
  return (
    <SearchContainer>
      <Typography
        sx={{
          fontSize: 30,
          fontStyle: 'italic',
          p: 1,
          borderBottom: '1px solid gray',
        }}
      >
        {searchedItems?.map(item=>item.data).flat().length} Items Found
      </Typography>
      <TabContext value={selectedFilter}>
        <StyledTabsList
         sm={sm}
         xs={xs}
          TabIndicatorProps={{ style: { borderColor: 'gray !important' } }}
          onChange={(e:ChangeEvent, value:SearchItems |'all') => setSelectedFilter(value)}
        >
          <Tab value="all" label="All" />
          <Tab icon={<FileCopy />} value="items" label="Items" />
          <Tab icon={<Collections />} value="collections" label="Collections" />
          <Tab icon={<Comment />} value="comments" label="Comments" />
          <Tab icon={<Person3 />} value="users" label="Users" />
        </StyledTabsList>
        <TabPanel value="all">
          <PanelsContainer sm={sm} xs={xs}>
            {searchedItems.map((item: any) => (
              <Fragment key={item.name}>
                {item.data.map((elem: any) => (
                  <SearchItem
                    item={{
                      name:
                        item.name === 'user'
                          ? `${elem.firstName} ${elem.lastName}`
                          : elem.name,
                      image:
                        item.name === 'user'
                          ? elem.profileImage || AvatarImg
                          : elem.image,
                      link:
                        item.name === 'user'
                          ? `/profile/${elem.id}`
                          : item.name === 'collection'
                          ? `/collection/${elem.id}`
                          : item.name === 'item'
                          ? `/item/${elem.id}`
                          : `/item/${elem.itemId}`,
                          tags:elem?.tags?.split(',').map((item:any)=>`#${item}`).join(','),
                          commentText:elem?.text
                    }}
                  />
                ))}
              </Fragment>
            ))}
          </PanelsContainer>
        </TabPanel>
        {['item', 'collection', 'comment', 'user'].map((tab) => (
          <TabPanel value={`${tab}s`}>
            {searchedItems
              .find((item: any) => item.name === tab)
              ?.data.map((elem: any) => (
                <SearchItem
                  item={{
                    name:
                      tab === 'user'
                        ? `${elem.firstName} ${elem.lastName}`
                        : elem.name,
                    image:
                      tab === 'user'
                        ? elem.profileImage || AvatarImg
                        : elem.image,
                      link:
                        tab === 'user'
                          ? `/profile/${elem.id}`
                          : tab === 'collection'
                          ? `/collection/${elem.id}`
                          : tab === 'item'
                          ? `/item/${elem.id}`
                          : `/item/${elem.itemId}`,
                      tags:elem?.tags?.split(',').map((item:any)=>`#${item}`).join(','),
                      commentText: elem?.text
                  }}
                />
              ))}
          </TabPanel>
        ))}
      </TabContext>
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  min-height: calc(100vh - 80px);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;
`;

const StyledTabsList=styled(({sm,xs,...rest}:any)=><TabList {...rest} />)`
  display:flex;
  gap:10px;
  flex-direction:${({sm,xs})=>(sm || xs)? 'column':'row'} !important;

  .css-heg063-MuiTabs-flexContainer {
    flex-direction:${({sm,xs})=>(sm || xs)? 'column':'row'} !important;
  }
  
`

const PanelsContainer = styled(({sm,xs,...rest}:any)=><div {...rest} />)`
  display: flex;
  gap: 15px;
  flex-direction:${({sm,xs})=>(sm || xs)? 'column':'row'};
`;

export default Search;
