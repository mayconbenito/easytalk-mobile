import { Header as RNHeader } from 'react-navigation-stack';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: ${RNHeader.HEIGHT};
  background-color: #714cc1;
  padding-horizontal: 10;
  border-bottom-width: 1;
  border-bottom-color: #ccc;
`;

export const HeaderDetails = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 5;
`;

export const Image = styled.View`
  width: 40;
  height: 40;
  border-radius: 40;
  background-color: #ccc;
  margin-right: 5;
`;

export const Name = styled.Text`
  font-size: 16;
  color: #ccc;
  font-weight: bold;
`;

export const Scroll = styled.FlatList``;

export const Input = styled.TextInput`
  border-top-width: 1;
  border-top-color: #ccc;
  padding-left: 10;
`;
