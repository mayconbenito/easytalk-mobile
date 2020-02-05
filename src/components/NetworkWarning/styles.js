import { Header } from 'react-navigation-stack';
import styled from 'styled-components/native';

import { colors } from '~/config/styles';

export const Container = styled.View`
  position: absolute;
  background-color: ${colors.ERROR};
  width: 100%;
  height: 20;
  top: ${Header.HEIGHT};
  justify-content: center;
  align-items: center;
  padding-vertical: 15;
  z-index: 4;
`;

export const Warning = styled.Text`
  color: ${colors.WHITE};
  font-weight: bold;
  font-size: 16;
`;
