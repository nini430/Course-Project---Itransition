import { Breadcrumbs, Typography, Paper } from "@mui/material";
import styled from 'styled-components'
import {Link} from 'react-router-dom';

import { BreadCrumbProps } from "../../types/common";


interface IBreadCrumbProps {
    paths:BreadCrumbProps[]
}

const BreadCrumb = ({paths}:IBreadCrumbProps) => {
  return (
    <StyledPaper>
        <Breadcrumbs separator={<Typography>/</Typography>}>
    {paths.map((elem:BreadCrumbProps)=>(
        <Link style={{textDecoration:'none'}}  key={elem.title}  to={elem.path} color='inherit'>
           <Typography sx={{display:'flex',alignItems:'center',gap:'4px',color:'gray'}}>
                {elem.title}
                <elem.icon/>
            </Typography> 
        </Link>
    ))}
    </Breadcrumbs>
    </StyledPaper>
    
  )
}

const StyledPaper=styled(Paper)`
    width:90%;
    padding:20px;
    height:30px;
    margin:20px;
    display: flex;
    align-items: center;
    color:gray;
`

export default BreadCrumb;