import styled from 'styled-components';

const Item = styled.a`
  color: #f2f2f2;
  text-align: center;
  padding: 20px 20px;
  text-decoration: none;
  line-height: 2;
  font-size: 17px;
  &:hover {
    background-color: #666666;
    color: black;
  }
  &.active {
    background-color: #04aa6d;
    color: white;
  }
`;

export default Item;
