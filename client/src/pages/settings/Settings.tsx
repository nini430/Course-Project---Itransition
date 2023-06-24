import { Typography, Accordion, AccordionDetails } from '@mui/material';
import { useState, SyntheticEvent } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../store/store';
import AccordionSummaryComponent from './AccordionSummary';
import FullNameSettings from './FullNameSettings';
import EmailSettings from './EmailSettings';
import PasswordSettings from './PasswordSettings';
import settingParams from '../../utils/settingParams';

const Settings = () => {
  const [expanded, setExpanded] = useState('');
  const { authedUser } = useAppSelector((state) => state.auth);
  const auth =
    authedUser || JSON.parse(localStorage.getItem('authed_user') as string);

  const handleAccordionChange =(param:string)=> {
       setExpanded(expanded===param?'':param);
       console.log(expanded);
  };
  return (
    <SettingsContainer>
      <Typography sx={{ fontSize: 40, mb: 2 }}>User Settings</Typography>
      <Accordion expanded={expanded===settingParams.FULL_NAME} onChange={()=>handleAccordionChange(settingParams.FULL_NAME)} sx={{ minWidth: 400 }}>
        <AccordionSummaryComponent
          parameter="Full Name"
          value={`${auth.firstName} ${auth.lastName}`}
        />
        <StyledAccordionDetails>
          <FullNameSettings />
        </StyledAccordionDetails>
      </Accordion>
      <Accordion expanded={expanded===settingParams.EMAIL} onChange={()=>handleAccordionChange(settingParams.EMAIL)} sx={{ minWidth: 400 }}>
        <AccordionSummaryComponent
          parameter="E-mail"
          value={`${auth.email}`}
        />
        <StyledAccordionDetails>
          <EmailSettings />
        </StyledAccordionDetails>
      </Accordion>
      <Accordion expanded={expanded===settingParams.PASSWORD} onChange={()=>handleAccordionChange(settingParams.PASSWORD)} sx={{ minWidth: 400 }}>
        <AccordionSummaryComponent
          parameter="Password"
          value={`************`}
        />
        <AccordionDetails>
          <StyledAccordionDetails>
            <PasswordSettings />
          </StyledAccordionDetails>
        </AccordionDetails>
      </Accordion>
    </SettingsContainer>
  );
};

const SettingsContainer = styled.div`
  width: 100vw;
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledAccordionDetails = styled(AccordionDetails)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default Settings;
