import styled from 'styled-components';
import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import CollectionAccordion from './CollectionAccordion';
import { useAppSelector } from '../../store/store';

interface ICollectionDialogProps {
  accordionValues: any;
  setAccordionValues: Dispatch<SetStateAction<any>>;
  collectionId: string | undefined | null;
}

const CollectionDialog = ({
  accordionValues,
  setAccordionValues,
  collectionId,
}: ICollectionDialogProps) => {
  const { draftCollection } = useAppSelector((state) => state.collection);
  const [integerFieldCount, setIntegerFieldCount] = useState(1);
  const [stringFieldCount, setStringFieldCount] = useState(1);
  const [multilineFieldCount, setMultilineFieldCount] = useState(1);
  const [dateFieldCount, setDateFieldCount] = useState(1);
  const [checkboxFieldCount, setCheckboxFieldCount] = useState(1);
  useEffect(() => {
    if (draftCollection) {
      const { collection, ...rest } = draftCollection;
      setAccordionValues(rest);
    }
  }, [draftCollection, setAccordionValues]);

  return (
    <ConfigurationContainer>
      <CollectionAccordion
        collectionId={collectionId}
        setField={() => setIntegerFieldCount((prev: any) => prev + 1)}
        field={integerFieldCount}
        placeholderText="Integer Text Field"
        summaryMessage="Integer Fields"
        accordionValues={accordionValues}
        setAccordionValues={setAccordionValues}
        name="integerField"
      />
      <CollectionAccordion
        collectionId={collectionId}
        setField={() => setStringFieldCount((prev: any) => prev + 1)}
        field={stringFieldCount}
        placeholderText="String Text Field"
        summaryMessage="String Text Fields"
        accordionValues={accordionValues}
        setAccordionValues={setAccordionValues}
        name="stringField"
      />
      <CollectionAccordion
        collectionId={collectionId}
        setField={() => setMultilineFieldCount((prev: any) => prev + 1)}
        field={multilineFieldCount}
        placeholderText="Multiline Text Field"
        summaryMessage="Multiline Text Fields"
        accordionValues={accordionValues}
        setAccordionValues={setAccordionValues}
        name="multilineTextField"
      />
      <CollectionAccordion
        collectionId={collectionId}
        setField={() => setCheckboxFieldCount((prev: any) => prev + 1)}
        field={checkboxFieldCount}
        placeholderText="Checkbox  Field"
        summaryMessage="Checkbox Fields"
        accordionValues={accordionValues}
        setAccordionValues={setAccordionValues}
        name="booleanCheckboxField"
      />
      <CollectionAccordion
        collectionId={collectionId}
        setField={() => setDateFieldCount((prev: any) => prev + 1)}
        field={dateFieldCount}
        placeholderText="Date Text Field"
        summaryMessage="Date Fields"
        accordionValues={accordionValues}
        setAccordionValues={setAccordionValues}
        name="dateField"
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
