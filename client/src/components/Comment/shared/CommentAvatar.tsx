import { Typography } from "@mui/material"
import Avatar from "../../Avatar/Avatar"
import AvatarImg from '../../../assets/avatar.png'

const CommentAvatar = () => {
  return (
   <>
    <Typography>Nini Gogatishvili</Typography>
      <Avatar width={30} height={30} src={AvatarImg} />
   </>
  )
}

export default CommentAvatar