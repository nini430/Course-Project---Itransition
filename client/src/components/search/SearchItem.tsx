import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import {useAppSelector} from '../../store/store'
import {Link} from 'react-router-dom'
import Avatar from '../Avatar/Avatar';

interface ISearchItemProps {
    item:{
        name:string;
        image?:string;
        link:string;
        tags?:string;
        commentText?:string;
    }
}

const SearchItem = ({item}:ISearchItemProps) => {
    const {searchQuery}=useAppSelector(state=>state.search);
   const commentSection=item.commentText?.replace(new RegExp(`${searchQuery}`,'gi'),`<b>${searchQuery}</b>`)
  return (
    <Link to={item.link} style={{textDecoration:'none'}}>
    <Card sx={{minWidth:300}}>
        <CardContent sx={{display:'flex',flexDirection:'column',gap:'10px',alignItems:'center'}}>
            <Typography>{item?.name}</Typography>
            {item?.tags && <Typography>{item.tags}</Typography>}
            {item?.image && <Avatar width={50} height={50} src={item.image as string} />}
            <div dangerouslySetInnerHTML={{__html:commentSection as string}}/> 
        </CardContent>
        <CardActions sx={{display:'flex',justifyContent:'center'}}>
            <Button sx={{border:'1px solid gray'}}>View More</Button>
        </CardActions>
        </Card></Link>
        
  )
}


export default SearchItem;