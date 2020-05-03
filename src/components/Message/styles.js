import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

import { colors } from '~/config/styles';

const windowWidth = Dimensions.get('window').width;

export const Container = styled.View`
  flex-direction: column;
  align-self: ${props => (props.mine ? 'flex-end' : 'flex-start')};
  margin-bottom: ${props => (props.last ? 0 : 20)};
  max-width: ${windowWidth / 1.4};
  justify-content: space-between;
  align-items: ${props => (props.mine ? 'flex-end' : 'flex-start')};
`;

export const MessageTextContainer = styled.View.attrs({
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.3,
  shadowRadius: 4.65,
  elevation: 8,
})`
  padding-horizontal: 15;
  padding-vertical: 10;
  font-size: 14.5;
  border-radius: 5;
  background-color: ${props => (props.mine ? colors.PRIMARY : colors.WHITE)};
`;

export const MessageText = styled.Text`
  font-size: 14.5;
  color: ${props => (props.mine ? colors.WHITE : colors.BLACK)};
`;

export const Date = styled.Text`
  font-size: 14;
  margin-top: 5;
`;
