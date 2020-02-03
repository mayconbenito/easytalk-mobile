import React from 'react';

import { Container, Image, Details, Title, Description } from './styles';

export default function ChatItem({ data, onPress }) {
  return (
    <Container onPress={onPress}>
      <Image
        source={data.user.picture ? data.user.picture.url : data.user.picture}
      />
      <Details>
        <Title>{data.user.name}</Title>
        <Description>{data.lastSentMessage}</Description>
      </Details>
    </Container>
  );
}
