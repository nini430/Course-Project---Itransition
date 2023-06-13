import styled from 'styled-components';

const AuthContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display:flex;
  justify-content: center;
  align-items: center;
  padding:0px 10px;
`;
const AuthForm = styled(({isX, isMob, isD,isXS,...props}:any)=><div {...props}/>)`
  width: ${({isX,isMob,isD,isXS})=>isX?'800px':isMob?'500px':isXS?'100%':'500px'};
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

export { AuthContainer, AuthForm, LngContainer };
