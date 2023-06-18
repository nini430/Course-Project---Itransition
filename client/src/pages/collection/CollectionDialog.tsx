import styled from 'styled-components';
import { useState, Dispatch,SetStateAction } from 'react';
import CollectionAccordion from './CollectionAccordion';

interface ICollectionDialogProps {
  accordionValues:any;
  setAccordionValues:Dispatch<SetStateAction<any>>
}

const CollectionDialog = ({accordionValues,setAccordionValues}:ICollectionDialogProps) => {
  const [integerFieldCount, setIntegerFieldCount] = useState(1);
  const [stringFieldCount, setStringFieldCount] = useState(1);
  const [multilineFieldCount, setMultilineFieldCount] = useState(1);
  const [dateFieldCount, setDateFieldCount] = useState(1);
  const [checkboxFieldCount, setCheckboxFieldCount] = useState(1);
  return (
        <ConfigurationContainer>
          <CollectionAccordion
            setField={() => setIntegerFieldCount((prev) => prev + 1)}
            field={integerFieldCount}
            placeholderText="Integer Text Field"
            summaryMessage="Integer Fields"
            accordionValues={accordionValues}
            setAccordionValues={setAccordionValues}
            name='integerField'
          />
          <CollectionAccordion
           setField={()=>setStringFieldCount(prev=>prev+1)}
           field={stringFieldCount}
           placeholderText='String Text Field'
           summaryMessage='String Text Fields'
           accordionValues={accordionValues}
           setAccordionValues={setAccordionValues}
           name='stringField'
            />
          <CollectionAccordion
          setField={()=>setMultilineFieldCount(prev=>prev+1)}
          field={multilineFieldCount}
          placeholderText='Multiline Text Field'
          summaryMessage='Multiline Text Fields'
          accordionValues={accordionValues}
          setAccordionValues={setAccordionValues}
          name='multilineTextField'
           />
          <CollectionAccordion
          setField={()=>setCheckboxFieldCount(prev=>prev+1)}
          field={checkboxFieldCount}
          placeholderText='Checkbox  Field'
          summaryMessage='Checkbox Fields'
          accordionValues={accordionValues}
          setAccordionValues={setAccordionValues}
          name='booleanCheckboxField'
           />
          <CollectionAccordion
          setField={()=>setDateFieldCount(prev=>prev+1)}
          field={dateFieldCount}
          placeholderText='Date Text Field'
          summaryMessage='Date Fields'
          accordionValues={accordionValues}
          setAccordionValues={setAccordionValues}
          name='dateField'
           />
        </ConfigurationContainer>
 
  );
};

const ConfigurationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export default CollectionDialog;
