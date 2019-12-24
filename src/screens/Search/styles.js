import { Header as RNHeader } from 'react-navigation-stack';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-color: #714cc1;
  padding-horizontal: 10;
  border-bottom-width: 1;
  border-bottom-color: #ccc;
`;

export const InputContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  height: ${RNHeader.HEIGHT};
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#fff',
  selectionColor: '#fff',
})`
  flex: 1;
  padding-vertical: 15;
  padding-horizontal: 10;
  color: #fff;
  font-size: 15;
  font-weight: bold;
`;

export const Results = styled.View``;

export const List = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  keyboardShouldPersistTaps: 'always',
})``;
