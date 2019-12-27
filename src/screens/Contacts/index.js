import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';

import ContactItem from '~/components/ContactItem';
import Loading from '~/components/Loading';
import { Creators as ContactActions } from '~/store/ducks/contact';

import { Container } from './styles';

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
        {contacts.loading && <Loading />}

        {!contacts.loading && (
          <FlatList
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
      </Container>
      <FloatingAction
        color="#714cc1"
        onPressMain={() => navigation.navigate('Search')}
        overlayColor="rgba(0, 0, 0, 0)"
        floatingIcon={<MaterialIcons name="search" color="#fff" size={24} />}
      />
    </>
  );
}
