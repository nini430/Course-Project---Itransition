import { useEffect } from 'react';
import { TagCloud } from 'react-tagcloud';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getItemTags } from '../../store/itemReducer';
import generateRandomNumber from '../../utils/generateRandomNumber';
import { getFullTextSearch } from '../../store/searchReducer';
import { useNavigate } from 'react-router-dom';

const data = [
  { value: 'JavaScript', count: 38 },
  { value: 'React', count: 30 },
  { value: 'Nodejs', count: 28 },
  { value: 'Express.js', count: 25 },
  { value: 'HTML5', count: 33 },
  { value: 'MongoDB', count: 18 },
  { value: 'CSS3', count: 20 },
];

const TagCloudComponent = () => {
  const navigate=useNavigate();
  const dispatch = useAppDispatch();
  const { itemTags } = useAppSelector((state) => state.item);
  useEffect(() => {
    dispatch(getItemTags());
  }, [dispatch]);
  return (
    <TagCloud
      onClick={(tag:{value:string})=>{
        dispatch(getFullTextSearch({searchQuery:tag.value}));
        navigate('/search')
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
