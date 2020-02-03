import { Header as RNHeader } from 'react-navigation-stack';
import styled from 'styled-components/native';

import UserImage from '~/components/UserImage';
import { colors } from '~/config/styles';

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: ${RNHeader.HEIGHT};
  background-color: ${colors.PRIMARY};
  padding-horizontal: 10;
  border-bottom-width: 1;
  border-bottom-color: ${colors.LIGHT_CYAN};
`;

export const HeaderDetails = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 5;
`;

export const Image = styled(UserImage)`
  width: 40;
  height: 40;
  border-radius: 40;
  background-color: ${colors.LIGHT_CYAN};
  margin-right: 5;
`;

export const Name = styled.Text`
  font-size: 16;
  color: ${colors.WHITE};
  font-weight: bold;
`;

export const Scroll = styled.FlatList``;

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border-top-width: 1;
  border-top-color: ${colors.LIGHT_CYAN};
  padding-horizontal: 10;
`;

export const Input = styled.TextInput`
  flex: 1;
`;
