import styled from 'styled-components/native';

export const Container = styled.View`
  align-self: ${props => (props.mine ? 'flex-end' : 'flex-start')};
  background-color: #d1cbd1;
  border-radius: 3;
  margin-bottom: 5;
  padding-horizontal: 10;
  padding-vertical: 6;
`;

export const MessageText = styled.Text`
  font-size: 14;
`;
