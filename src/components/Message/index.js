import 'moment/min/locales';

import moment from 'moment';
import React from 'react';
import * as RNLocalize from 'react-native-localize';

import { Container, MessageTextContainer, MessageText, Date } from './styles';

require('moment-timezone');

export default function Message({ data, last, mine }) {
  const timezone = RNLocalize.getTimeZone();
  const locales = RNLocalize.getLocales();

  const primaryLanguage = locales[0].languageCode;

  moment.locale(primaryLanguage);
  const utcCreatedAt = moment(data.createdAt);

  return (
    <Container mine={mine} last={last}>
      <MessageTextContainer mine={mine}>
        <MessageText mine={mine}>{data.data}</MessageText>
      </MessageTextContainer>

      <Date>{utcCreatedAt.tz(timezone).format('LT')}</Date>
    </Container>
  );
}
