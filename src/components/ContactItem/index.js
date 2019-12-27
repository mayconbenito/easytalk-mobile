import React from 'react';

import { Container, Image, Details, Title, Description } from './styles';

export default function ContactItem({ data, onPress }) {
  return (
    <Container onPress={onPress}>
      <Image />
      <Details>
        <Title>{data.name}</Title>
        <Description />
      </Details>
    </Container>
  );
}
