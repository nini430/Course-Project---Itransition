import { Typography } from '@mui/material'
import styled from 'styled-components'

interface IEmptyProps {
    message:string;
}

const Empty: React.FC<IEmptyProps> = ({message}) => {
  return (
    <EmptyContainer>
        <Typography sx={{fontSize:50,fontStyle:'italic'}}>{message}</Typography>
    </EmptyContainer>
  )
}

const EmptyContainer=styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
`

export default Empty