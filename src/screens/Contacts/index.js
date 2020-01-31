import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ContactItem from '~/components/ContactItem';
import FloatingActionButton from '~/components/FloatingActionButton';
import Loading from '~/components/Loading';
import { Creators as ContactActions } from '~/store/ducks/contact';

import { Container, List, WarningMessage } from './styles';

export default function Contacts({ navigation }) {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contact);

  useEffect(() => {
    dispatch(ContactActions.fetchContacts());
  }, []);

  function endReached() {
    if (contacts.total > contacts.data.length && !contacts.loading) {
      dispatch(ContactActions.fetchContacts());
    }
  }

  function refresh() {
    dispatch(ContactActions.refreshContacts());
  }

  return (
    <>
      <Container>
        {contacts.loading && <Loading loading={contacts.loading} />}

        {!contacts.loading && contacts.data.length > 0 && (
          <List
            data={contacts.data}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
              <ContactItem
                data={item}
                onPress={() => navigation.navigate('User', { data: item })}
              />
            )}
            onEndReached={endReached}
            onEndReachedThreshold={0.2}
            refreshing={contacts.loading}
            onRefresh={refresh}
          />
        )}

        {!contacts.loading && !contacts.data.length > 0 && (
          <WarningMessage>Você não possui nenhum contato.</WarningMessage>
        )}
      </Container>
      <FloatingActionButton onPress={() => navigation.navigate('Search')} />
    </>
  );
}
