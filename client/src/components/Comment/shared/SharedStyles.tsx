import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid gray;
  padding: 3px;
  border-radius: 10px;
  gap: 5px;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 200px;
`;

const CloseContainer = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  color: gray;
`;

export { Wrapper, ImageContainer, CloseContainer };
