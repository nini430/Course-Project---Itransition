import { KeyboardArrowDown, AddCircle } from '@mui/icons-material';
import styled from 'styled-components';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Input,
  Button,
} from '@mui/material';
import { Dispatch, SetStateAction} from 'react';
import Empty from '../../components/Empty/Empty';

interface ICollectionAccordionProps {
  summaryMessage: string;
  field: number;
  placeholderText: string;
  setField: () => void;
  accordionValues: any;
  setAccordionValues: Dispatch<SetStateAction<any>>;
  name: string;
  value?: string;
  collectionId: string | undefined | null;
}

const CollectionAccordion = ({
  summaryMessage,
  field,
  placeholderText,
  setField,
  accordionValues,
  setAccordionValues,
  name,
  collectionId,
}: ICollectionAccordionProps) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<KeyboardArrowDown />}>
        {summaryMessage}
      </AccordionSummary>
      <AccordionDetails>
        {
        collectionId &&
          (accordionValues?.[name] && accordionValues?.[name].length === 0
            ? <Empty message='No Records'/>
            : accordionValues?.[name]?.map(
                (item: any) => (
                  <InputWrapper key={item?.id}>
                    <Input
                      value={item?.name}
                      onChange={(e) => {
                        setAccordionValues({
                          ...accordionValues,
                          [name]: accordionValues?.[name].map((val:any)=>(
                            val.id===item.id? {...val,name:e.target.value}:val
                          ))
                        });
                      }}
                      sx={{ p: 1, width: '90%' }}
                      fullWidth
                      placeholder={placeholderText}
                    />
                  </InputWrapper>
                )
              ))}

        {!collectionId &&
          Array.from({ length: field },(_,i)=>i+1).map((item) => {
            return (
              <InputWrapper key={name+item}>
                <Input
                  name={name + item}
                  onChange={(e) => {
                    setAccordionValues(
                      accordionValues[name]
                        ? {
                            ...accordionValues,
                            [name]: {
                              ...accordionValues[name],
                              [e.target.name]: e.target.value,
                            },
                          }
                        : {
                            ...accordionValues,
                            [name]: { [e.target.name]: e.target.value },
                          }
                    );
                  }}
                  sx={{ p: 1, width: '90%' }}
                  fullWidth
                  placeholder={placeholderText}
                />
               
              </InputWrapper>
            );
          })}
          {!collectionId &&  <Button
                  onClick={setField}
                  size="small"
                  sx={{ mt: 1 }}
                  startIcon={<AddCircle />}
                >
                  Add More
                </Button>}
      </AccordionDetails>
    </Accordion>
  );
};

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export default CollectionAccordion;
