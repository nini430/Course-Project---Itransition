import styled from 'styled-components';


const AuthContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 80px);
  padding: 0px 10px;
  display: flex;
  align-items: center;
  flex-direction:column;
`;
const AuthForm = styled(({ isX, isMob, isD, isXS, mode, ...props }: any) => (
  <form {...props} />
))`
  width: ${({ isX, isMob, isD, isXS }) =>
    isX ? '700px' : isMob ? '500px' : isXS ? '90%' : '400px'};
  height: auto;
  background-color:${({mode})=>mode==='dark'?'#252121':'white'}; 
  padding: 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap:5px;
`;

const LngContainer = styled.div`
  position: absolute;
  top: 20%;
  right: 20%;
`;

const AuthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const PropertyContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  align-self: end;
  position: absolute;
  right: 100px;
  margin-top:50px;
`;

export {
  AuthContainer,
  AuthForm,
  LngContainer,
  AuthWrapper,
  ErrorMessage,
  PropertyContainer,
};
