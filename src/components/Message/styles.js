import styled from 'styled-components/native';

import { colors } from '~/config/styles';

export const Container = styled.View`
  align-self: ${props => (props.mine ? 'flex-end' : 'flex-start')};
  background-color: ${colors.LIGHT_CYAN};
  border-radius: 3;
  margin-bottom: 5;
  padding-horizontal: 10;
  padding-vertical: 6;
`;

export const MessageText = styled.Text`
  font-size: 14;
`;
