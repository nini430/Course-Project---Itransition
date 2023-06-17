import { KeyboardArrowDown, AddCircle } from '@mui/icons-material';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Input,
  Button,
} from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

interface ICollectionAccordionProps {
  summaryMessage: string;
  field: number;
  placeholderText: string;
  setField: () => void;
  accordionValues: any;
  setAccordionValues: Dispatch<SetStateAction<any>>;
  name:string;
}

const CollectionAccordion = ({
  summaryMessage,
  field,
  placeholderText,
  setField,
  accordionValues,
  setAccordionValues,
  name
}: ICollectionAccordionProps) => {
    console.log(accordionValues);
  return (
    <Accordion>
      <AccordionSummary expandIcon={<KeyboardArrowDown />}>
        {summaryMessage}
      </AccordionSummary>
      <AccordionDetails>
        {Array.from({ length: field }, (_, i) => i + 1).map((item: any) => (
          <Input
            onChange={(e) =>
              setAccordionValues(
                accordionValues[name]
                  ? {
                      ...accordionValues,
                      [name]: {
                        ...accordionValues[name],
                        [name + item]: e.target.value,
                      },
                    }
                  : {
                      ...accordionValues,
                      [name]: { [name + item]: e.target.value },
                    }
              )
            }
            key={item}
            sx={{ p: 1 }}
            fullWidth
            placeholder={placeholderText}
          />
        ))}
        <Button
          disabled={field === 3}
          onClick={setField}
          size="small"
          sx={{ mt: 1 }}
          startIcon={<AddCircle />}
        >
          Add More
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};

export default CollectionAccordion;
