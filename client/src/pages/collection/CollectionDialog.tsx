import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,

} from '@mui/material';
import {Save,Cancel} from '@mui/icons-material'

import styled from 'styled-components';
import { useState } from 'react';
import CollectionAccordion from './CollectionAccordion';
import { LoadingButton } from '@mui/lab';

interface ICollectionDialogProps {
  open: boolean;
  onClose: () => void;
}

const CollectionDialog = ({ open, onClose }: ICollectionDialogProps) => {
  const [accordionValues,setAccordionValues]=useState({});
  const [integerFieldCount, setIntegerFieldCount] = useState(1);
  const [stringFieldCount, setStringFieldCount] = useState(1);
  const [multilineFieldCount, setMultilineFieldCount] = useState(1);
  const [dateFieldCount, setDateFieldCount] = useState(1);
  const [checkboxFieldCount, setCheckboxFieldCount] = useState(1);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent sx={{ minWidth: 400 }}>
        <Typography sx={{ mb: 4 }}>Configure Item Fields</Typography>
        <ConfigurationContainer>
          <CollectionAccordion
            setField={() => setIntegerFieldCount((prev) => prev + 1)}
            field={integerFieldCount}
            placeholderText="Integer Text Field"
            summaryMessage="Integer Fields"
            accordionValues={accordionValues}
            setAccordionValues={setAccordionValues}
            name='integerfield'
          />
          <CollectionAccordion
           setField={()=>setStringFieldCount(prev=>prev+1)}
           field={stringFieldCount}
           placeholderText='String Text Field'
           summaryMessage='String Text Fields'
           accordionValues={accordionValues}
           setAccordionValues={setAccordionValues}
           name='stringfield'
            />
          <CollectionAccordion
          setField={()=>setMultilineFieldCount(prev=>prev+1)}
          field={multilineFieldCount}
          placeholderText='Multiline Text Field'
          summaryMessage='Multiline Text Fields'
          accordionValues={accordionValues}
          setAccordionValues={setAccordionValues}
          name='multilinetextfield'
           />
          <CollectionAccordion
          setField={()=>setCheckboxFieldCount(prev=>prev+1)}
          field={checkboxFieldCount}
          placeholderText='Checkbox  Field'
          summaryMessage='Checkbox Fields'
          accordionValues={accordionValues}
          setAccordionValues={setAccordionValues}
          name='booleancheckboxfield'
           />
          <CollectionAccordion
          setField={()=>setDateFieldCount(prev=>prev+1)}
          field={dateFieldCount}
          placeholderText='Date Text Field'
          summaryMessage='Date Fields'
          accordionValues={accordionValues}
          setAccordionValues={setAccordionValues}
          name='datefield'
           />
        </ConfigurationContainer>
      </DialogContent>
      <DialogActions>
        <LoadingButton startIcon={<Save/>}>Save</LoadingButton>
        <Button onClick={onClose} startIcon={<Cancel/>}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

const ConfigurationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export default CollectionDialog;
