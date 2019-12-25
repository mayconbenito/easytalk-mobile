import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  flex-direction: row;
  padding-horizontal: 10;
  padding-vertical: 5;
  border-bottom-width: 1;
  border-bottom-color: #ccc;
`;

export const Image = styled.View`
  width: 60;
  height: 60;
  border-radius: 60;
  background-color: #ccc;
  margin-right: 10;
`;

export const Details = styled.View`
  flex-direction: column;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 18;
  font-weight: bold;
  color: #000;
`;
