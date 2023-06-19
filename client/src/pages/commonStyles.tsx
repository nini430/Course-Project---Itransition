import styled from 'styled-components'

const Form = styled(({ mode, ...rest }: any) => <form {...rest} />)`
  background-color: ${({ mode }) => (mode === 'dark' ? '#252121' : 'white')};
  width: ${({ isX, isMob, isD, isXS }) =>
    isX ? '700px' : isMob ? '500px' : isXS ? '350px' : '500px'};
  padding: 20px;
  min-width: 300px;
  max-width: 600px;
  height: auto;
  border-radius: 10px;
  max-height:750px;
  overflow-y: auto;
`;

export {Form}