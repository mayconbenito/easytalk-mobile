import React from 'react';

import { Container, Warning } from './styles';

export default function NetworkWarning() {
  return (
    <Container>
      <Warning>Você está offline</Warning>
    </Container>
  );
}
