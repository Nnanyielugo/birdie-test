import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Item = styled(Link)`
  color: #f2f2f2;
  text-align: center;
  padding: 20px 15px;
  margin-left: 5px;
  margin-right: 5px;
  text-decoration: none;
  line-height: 2;
  font-size: 17px;
  &:hover {
    background-color: #666666;
    color: black;
  }
  &.active {
    background-color: #f45b69;
    color: white;
  }
`;

export default Item;
