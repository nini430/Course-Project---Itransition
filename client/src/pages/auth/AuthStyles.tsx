import styled from 'styled-components';

const AuthContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 80px);
  padding: 0px 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const AuthForm = styled(({ xs, sm, md, lg, xl, mode, ...props }: any) => (
  <form {...props} />
))`
  width: ${({ xs, sm, md, lg, xl }) =>
    xl ? '800px' : sm ? '500px' : xs ? '300px' : '700px'};
  height: auto;
  background-color: ${({ mode }) => (mode === 'dark' ? '#252121' : 'white')};
  padding: 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const TwoGridContainer = styled(({ sm, xs, ...rest }: any) => (
  <div {...rest} />
))`
  display: grid;
  grid-template-columns: ${({ sm, xs }) => (sm || xs ? '1fr' : '1fr 1fr')};
  grid-gap: 5px;
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
  margin-top: 50px;
`;

export {
  AuthContainer,
  AuthForm,
  LngContainer,
  AuthWrapper,
  ErrorMessage,
  PropertyContainer,
  TwoGridContainer,
};
