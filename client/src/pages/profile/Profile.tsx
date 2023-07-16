import { useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../store/store';
import { getFollows } from '../../store/authReducer';
import { getMyCollections } from '../../store/collectionReducer';
import ProfileCard from './ProfileCard';
import ProfileDashboard from './ProfileDashboard';
import { useParams } from 'react-router-dom';
import useResponsive from '../../hooks/useResponsive';

const Profile = () => {
  const { userId } = useParams();
  const { xs, sm } = useResponsive();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getMyCollections(userId as string));
    dispatch(getFollows());
  }, [dispatch, userId]);
  return (
    <ProfileContainer xs={xs} sm={sm}>
      <ProfileCard />
      <ProfileDashboard />
    </ProfileContainer>
  );
};

const ProfileContainer = styled(({ xs,sm, ...rest }: any) => (
  <div {...rest} />
))`
  width: 100vw;
  min-height: calc(100vh - 80px);
  padding: 20px;
  display: ${({ xs,sm }) => ((xs || sm) ? 'flex' : 'grid')};
  grid-template-columns: ${({ xs,sm }) => (!(xs || sm) ? '1fr 2fr' : '')};
  align-items: ${({ xs,sm }) => ((xs || sm) ? 'center' : 'flex-start')};
  flex-direction: ${({ xs,sm }) => ((xs || sm) ? 'column' : '')};
  gap: 20px;
  overflow: hidden;
`;

export default Profile;
