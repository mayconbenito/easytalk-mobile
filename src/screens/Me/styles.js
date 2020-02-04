import styled from 'styled-components/native';

import UserImage from '~/components/UserImage';
import { colors } from '~/config/styles';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  padding-vertical: 30;
`;

export const Profile = styled.View``;

export const ImageContainer = styled.TouchableOpacity`
  width: 180;
  height: 180;
  border-radius: 180;
  align-self: center;
  background-color: ${colors.LIGHT_CYAN};
  justify-content: center;
  align-items: center;
`;

export const Image = styled(UserImage)`
  width: 180;
  height: 180;
  border-radius: 180;
`;

export const Username = styled.Text`
  color: ${colors.BLACK};
  font-weight: bold;
  font-size: 21;
  margin-top: 10;
  align-self: center;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  padding-horizontal: 10;
  padding-vertical: 10;
  background-color: ${colors.PRIMARY};
  border-radius: 2;
  align-self: center;
`;

export const ButtonText = styled.Text`
  color: ${colors.WHITE};
  font-size: 18;
`;
