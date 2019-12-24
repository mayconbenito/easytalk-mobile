import React from 'react';

import { Container, Image, Details, Title, Description } from './styles';

export default function ChatItem({ onPress }) {
  return (
    <Container onPress={onPress}>
      <Image />
      <Details>
        <Title>Chat Name</Title>
        <Description>Last Sent Message</Description>
      </Details>
    </Container>
  );
}
