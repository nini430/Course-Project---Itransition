import { Typography } from "@mui/material"
import Avatar from "../../Avatar/Avatar"
import AvatarImg from '../../../assets/avatar.png'

interface ICommentAvatarProps {
  src?:string;
  fullName: string;
}

const CommentAvatar = ({src,fullName}:ICommentAvatarProps) => {
  return (
   <>
    <Typography>{fullName}</Typography>
      <Avatar width={30} height={30} src={src || AvatarImg} />
   </>
  )
}

export default CommentAvatar