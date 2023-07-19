import { Box, Dialog, DialogContent, Typography } from '@mui/material';
import { useEffect } from 'react';
import AvatarImg from '../../assets/avatar.png';
import Avatar from '../Avatar/Avatar';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { FollowInstance } from '../../types/follow';
import { toggleFollow } from '../../store/userReducer';
import { getFollows } from '../../store/authReducer';

interface IFollowModalProps {
  open: any[] | null;
  onClose: () => void;
}

const FollowModal = ({ open, onClose }: IFollowModalProps) => {
  const dispatch = useAppDispatch();
  const { authedUser, myFollowings } = useAppSelector((state) => state.auth);
  const { toggleFollowLoading } = useAppSelector((state) => state.user);
  useEffect(() => {
    dispatch(getFollows());
  }, [dispatch]);

  return (
    <Dialog open={!!open} onClose={onClose}>
      <DialogContent sx={{ minWidth: 400, display:'flex', flexDirection:'column', gap:'15px' }}>
        {open && open.length === 0 && <Typography>No Records yet</Typography>}
        {open &&
          open.map((item) => (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Avatar
                  src={item?.profileImage || AvatarImg}
                  width={40}
                  height={40}
                />
                <Typography>
                  {item?.firstName} {item?.lastName}
                </Typography>
              </Box>
              {authedUser && authedUser?.id !== item?.id && (
                <LoadingButton
                  loading={toggleFollowLoading}
                  sx={{ border: '1px solid gray' }}
                  onClick={() => {
                    dispatch(
                      toggleFollow({ followedId: item.id, followerId: auth.id })
                    );
                  }}
                >
                  {myFollowings.find(
                    (follow: FollowInstance) => follow.followedId === item.id
                  )
                    ? 'Unfollow'
                    : 'Follow'}
                </LoadingButton>
              )}
            </Box>
          ))}
      </DialogContent>
    </Dialog>
  );
};

export default FollowModal;
