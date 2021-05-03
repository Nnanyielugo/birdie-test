import styled from 'styled-components';

const Link = styled.a`
  display: inline-block;
  color: black;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 22px;
  padding-left: 10px;
  padding-right: 10px;
  text-decoration: none;
  background-color: white;
  margin: 5px;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  font-size: 14;
  &.active {
    background-color: #f45b69;
    color: white;
  }
  @media (max-width: 600px) {
    padding-top: 5px;
    padding-bottom: 8px;
    padding-left: 5px;
    padding-right: 5px;
    width: 25px;
    height: 25px;
    font-size: 12;
  }
`;

export default Link;
