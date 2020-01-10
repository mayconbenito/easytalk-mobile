import React from 'react';

import { Container, MessageText } from './styles';

export default function Message({ message, mine }) {
  return (
    <Container mine={mine}>
      <MessageText>{message}</MessageText>
    </Container>
  );
}
