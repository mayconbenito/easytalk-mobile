import styled from 'styled-components/native';

import UserImage from '~/components/UserImage';
import { colors } from '~/config/styles';

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  flex-direction: row;
  padding-horizontal: 10;
  padding-vertical: 5;
  border-bottom-width: 1;
  border-bottom-color: ${colors.LIGHT_CYAN};
`;

export const Image = styled(UserImage)`
  width: 60;
  height: 60;
  border-radius: 60;
  background-color: ${colors.LIGHT_CYAN};
  margin-right: 10;
`;

export const Details = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 18;
  font-weight: bold;
  color: ${colors.BLACK};
`;

export const Description = styled.Text.attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  font-size: 16;
  color: ${colors.CYAN};
`;
