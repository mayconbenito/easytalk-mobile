import styled from 'styled-components/native';

import { colors } from '~/config/styles';

export const Container = styled.View`
  flex: 1;
`;

export const List = styled.FlatList``;

export const WarningMessage = styled.Text`
  color: ${colors.BLACK};
  margin-left: 10;
  margin-top: 5;
  font-size: 18;
`;
