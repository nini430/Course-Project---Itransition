import styled from 'styled-components'
import { Card, Typography } from '@mui/material'



const ItemCard = () => {
  return (
    <StyledCard>
        <Typography></Typography>
    </StyledCard>
  )
}

const StyledCard=styled(Card)`
    min-width: 400px;
    display:flex;
    flex-direction: column;
    gap:15px;
`

export default ItemCard;