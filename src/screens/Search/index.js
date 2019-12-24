import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { Container, Header, InputContainer, Input } from './styles';

import api from '~/services/api';

import UserItem from '~/components/UserItem';

function Search({ navigation }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function fetchSearch() {
      try {
        const response = await api.get('/search/users/', {
          params: {
            searchText: query,
            page: 1,
          },
        });

        console.log(response.data.users);

        setResults(response.data.users);
      } catch (e) {
        console.log(e);
      }
    }

    fetchSearch();

    // if (isInitialMount.current) {
    //   isInitialMount.current = false;
    // } else if (query !== '') {
    //   fetchSearch();
    // } else {
    //   setResults({ artists: [], albums: [], tracks: [] });
    // }
  }, [query]);

  function onInputChange(txt) {
    setQuery(txt);
  }

  function clearQuery() {
    setQuery('');
  }

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
        <InputContainer>
          <Input
            placeholder="Buscar por artistas e músicas"
            autoFocus
            onChangeText={onInputChange}
          />

          <TouchableOpacity onPress={clearQuery}>
            <MaterialIcons name="clear" size={30} color="#fff" />
          </TouchableOpacity>
        </InputContainer>
      </Header>

      {results.map(() => (
        <UserItem />
      ))}
    </Container>
  );
}

Search.navigationOptions = () => ({
  header: null,
});

export default Search;
