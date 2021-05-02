import styled from 'styled-components';

const Card = styled.div`
  position: relative;
  bottom: 0;
  width: 400px;
  padding: 15px;
  background: #f45b69;
  color: #fff;
  &::before {
    content: '';
    position: absolute;
    bottom: 7px;
    width: 0;
    height: 0;
    border-style: solid;
  }
  @media (max-width: 600px) {
    width: 250px;
  }
`;

export default Card;
