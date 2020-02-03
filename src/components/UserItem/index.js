import React from 'react';

import { Container, Image, Details, Title } from './styles';

export default function ChatItem({ data, onPress }) {
  return (
    <Container onPress={onPress}>
      <Image source={data.picture ? data.picture.url : data.picture} />
      <Details>
        <Title>{data.name}</Title>
      </Details>
    </Container>
  );
}
