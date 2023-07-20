import { useEffect } from 'react';
import { TagCloud } from 'react-tagcloud';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getItemTags } from '../../store/itemReducer';
import generateRandomNumber from '../../utils/generateRandomNumber';
import { getFullTextSearch } from '../../store/searchReducer';
import { useNavigate } from 'react-router-dom';

const TagCloudComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { itemTags } = useAppSelector((state) => state.item);
  useEffect(() => {
    dispatch(getItemTags());
  }, [dispatch]);
  return (
    <TagCloud
      onClick={(tag: { value: string }) => {
        dispatch(getFullTextSearch({ searchQuery: tag.value }));
        navigate('/search');
      }}
      shuffle
      className="tag-cloud"
      minSize={14}
      maxSize={35}
      tags={itemTags.map((item) => ({
        value: item,
        count: generateRandomNumber(14, 35),
      }))}
    />
  );
};

export default TagCloudComponent;
