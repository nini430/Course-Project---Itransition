import {AccordionSummary, Button, Typography} from '@mui/material'
import {ExpandMore} from '@mui/icons-material'
import { styled } from 'styled-components';

interface IAccordionSummaryProps {
    parameter:string;
    value:string;
}

const AccordionSummaryComponent = ({parameter,value}:IAccordionSummaryProps) => {
  return (
    <AccordionSummary   expandIcon={<ExpandMore/>} sx={{width:400}}>
        <AccordionContainer>
            <Typography>{parameter}: {value}</Typography>
        </AccordionContainer>
    </AccordionSummary>
  )
}


const AccordionContainer=styled.div`
    display:flex;
    align-items:center;
    justify-content: space-between;
`
export default AccordionSummaryComponent;