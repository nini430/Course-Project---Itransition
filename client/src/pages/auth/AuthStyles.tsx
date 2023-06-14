import styled from 'styled-components';

const AuthContainer = styled.div`
  width: 100vw;
  height: 100vh;
  padding:0px 10px;
  display:flex;
  justify-content: center;
  align-items: center;

`;
const AuthForm = styled(({isX, isMob, isD,isXS,...props}:any)=><div {...props}/>)`
  width: ${({isX,isMob,isD,isXS})=>isX?'700px':isMob?'500px':isXS?'90%':'400px'};
  height:auto;
  padding:20px;
  background-color: white;
  border-radius: 20px;
  display:flex;
  flex-direction:column;
`;

const LngContainer=styled.div`
  position:absolute;
  top:20%;
  right:20%;

`

const AuthWrapper=styled.div`
display:flex;
   flex-direction:column;
  gap:20px;

`

const ErrorMessage=styled.span`
  color:red;
  font-size:12px;
  margin-top:5px;
`

export { AuthContainer, AuthForm, LngContainer, AuthWrapper, ErrorMessage };
