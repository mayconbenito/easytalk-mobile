import styled from 'styled-components/native';

import { colors } from '~/config/styles';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-horizontal: 20;
`;

export const Form = styled.View`
  width: 90%;
`;

export const Title = styled.Text`
  font-size: 40;
  font-weight: 100;
  color: ${colors.PRIMARY};
  margin-bottom: 3;
  border-radius: 3;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: colors.BLACK,
})`
  margin-vertical: 5;
  height: 45;
  padding-left: 10;
  border-radius: 3;
  shadow-opacity: 1;
  shadow-radius: 15;
  elevation: 1;
`;

export const ButtonText = styled.Text`
  color: ${colors.WHITE};
  font-size: 16;
  font-weight: bold;
`;

export const RegisterButton = styled.TouchableOpacity`
  padding-horizontal: 15;
  margin-vertical: 5;
  height: 45;
  border-radius: 3;
  align-items: center;
  justify-content: center;
  background-color: ${colors.PRIMARY};
`;

export const NavigationContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 10;
`;

export const LoginButton = styled.TouchableOpacity`
  padding-horizontal: 15;
  height: 45;
  border-radius: 3;
  align-items: center;
  justify-content: center;
  background-color: ${colors.SECONDARY};
`;

export const ErrorContainer = styled.View`
  margin-top: 20;
  align-items: center;
`;

export const ErrorMessage = styled.Text`
  font-size: 16;
  color: ${colors.BLACK};
  text-align: center;
`;
