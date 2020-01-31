import { Header as RNHeader } from 'react-navigation-stack';
import styled from 'styled-components/native';

import { colors } from '~/config/styles';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-color: ${colors.PRIMARY};
  padding-horizontal: 10;
  border-bottom-width: 1;
  border-bottom-color: ${colors.LIGHT_CYAN};
`;

export const InputContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  height: ${RNHeader.HEIGHT};
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: colors.WHITE,
  selectionColor: colors.WHITE,
})`
  flex: 1;
  padding-vertical: 15;
  padding-horizontal: 10;
  color: ${colors.WHITE};
  font-size: 15;
  font-weight: bold;
`;

export const Results = styled.View``;

export const List = styled.FlatList.attrs({
  keyboardShouldPersistTaps: 'always',
})``;
