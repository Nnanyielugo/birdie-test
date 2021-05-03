import styled from 'styled-components';
import Card from './Card';

const Item = styled.li`
  list-style-type: none;
  position: relative;
  width: 6px;
  margin: 0 auto;
  padding-top: 50px;
  background: #fff;
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  :nth-child(odd) {
    &::after {
      background: #FFF;
    }
  }
  :nth-child(even) {
    &::after {
      background: #f45b69;
    }
  }
  :nth-child(odd) ${Card} {
    left: 45px;
    &::before {
      left: -15px;
      border-width: 8px 16px 8px 0;
      border-color: transparent #f45b69 transparent transparent;
    }
  }
  :nth-child(even) ${Card} {
    text-align: right;
    left: -290px;
    &::before {
      right: -15px;
      border-width: 8px 0 8px 16px;
      border-color: transparent transparent transparent #f45b69;
    }
  }
  @media (max-width: 600px) {
    margin-left: 20px;
    :nth-child(even) ${Card} {
      text-align: left;
      left: 45px
      ::before {
        left: -15px;
        border-width: 8px 16px 8px 0;
        border-color: transparent #F45B69 transparent transparent;
      }
    }
  }
`;

export default Item;
