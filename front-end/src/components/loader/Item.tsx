import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% {
    top: 75px;
    left: 75px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 150px;
    height: 150px;
    opacity: 0;
  }
`;

const Item = styled.div`
  position: absolute;
  border: 4px solid #fff;
  opacity: 1;
  border-radius: 50%;
  animation: ${rotate} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  &:nth-child(2) {
    animation-delay: -0.5s;
  }
`;

export default Item;
