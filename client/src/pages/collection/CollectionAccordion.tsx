import { KeyboardArrowDown, AddCircle } from '@mui/icons-material';
import {Accordion,AccordionSummary,AccordionDetails, Input, Button} from '@mui/material'

interface ICollectionAccordionProps {
    summaryMessage:string;
    field:number;
    placeholderText:string;
    setField:()=>void;
}

const CollectionAccordion = ({summaryMessage,field,placeholderText,setField}:ICollectionAccordionProps) => {
  return (
   <Accordion>
    <AccordionSummary expandIcon={<KeyboardArrowDown/>}>
        {summaryMessage}
    </AccordionSummary>
    <AccordionDetails>
        {Array.from({length:field},(_,i)=>i+1).map((item:any)=>(
            <Input key={item} sx={{p:1}} fullWidth placeholder={placeholderText} />
        ))}
        <Button disabled={field===3} onClick={setField} size="small" sx={{mt:1}} startIcon={<AddCircle/>}>Add More</Button>
    </AccordionDetails>
   </Accordion>
  )
}

export default CollectionAccordion;