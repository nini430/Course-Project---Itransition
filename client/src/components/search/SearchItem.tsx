import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import {useAppSelector} from '../../store/store'
import {Link} from 'react-router-dom'
import Avatar from '../Avatar/Avatar';
import { useTranslation } from 'react-i18next';

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
    const {t}=useTranslation();
    const {searchQuery}=useAppSelector(state=>state.search);
   const commentSection=item.commentText?.replace(new RegExp(`${searchQuery}`,'gi'),`<b>${searchQuery}</b>`)
  return (
    
    <Card sx={{minWidth:300}}>
        <Link to={item.link} style={{textDecoration:'none'}}>
        <CardContent sx={{display:'flex',flexDirection:'column',gap:'10px',alignItems:'center'}}>
            <Typography>{item?.name}</Typography>
            {item?.tags && <Typography>{item.tags}</Typography>}
            {item?.image && <Avatar width={50} height={50} src={item.image as string} />}
            <div dangerouslySetInnerHTML={{__html:commentSection as string}}/> 
        </CardContent>
        </Link>
        <CardActions sx={{display:'flex',justifyContent:'center'}}>
            <Link to={item.link} style={{textDecoration:'none'}}>
            <Button sx={{border:'1px solid gray'}}>{t('common.view_more')}</Button>
            </Link>
           
        </CardActions>
        </Card>
        
  )
}


export default SearchItem;