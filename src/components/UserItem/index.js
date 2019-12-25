import React from 'react';

import { Container, Image, Details, Title } from './styles';

export default function ChatItem({ data, onPress }) {
  return (
    <Container onPress={onPress}>
      <Image />
      <Details>
        <Title>{data.name}</Title>
      </Details>
    </Container>
  );
}
