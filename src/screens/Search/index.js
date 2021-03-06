import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import UserItem from '~/components/UserItem';
import { colors } from '~/config/styles';
import useDebounce from '~/helpers/hooks/useDebounce';
import isStringEmpty from '~/helpers/isStringEmpty';
import api from '~/services/api';

import { Container, Header, InputContainer, Input, List } from './styles';

function Search({ navigation }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const debouncedQuery = useDebounce(query, 500);

  async function fetchSearch() {
    try {
      const response = await api.get('/search/users/', {
        params: {
          searchText: query,
          limit: 30,
        },
      });

      setResults(response.data.users);
    } catch (err) {
      console.log(err.response.data);
    }
  }

  useEffect(() => {
    if (!isStringEmpty(debouncedQuery)) {
      fetchSearch();
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);

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
          <MaterialIcons name="arrow-back" size={30} color={colors.WHITE} />
        </TouchableOpacity>
        <InputContainer>
          <Input
            placeholder="Buscar por usuários"
            autoFocus
            returnKeyType="search"
            value={query}
            onChangeText={onInputChange}
          />

          <TouchableOpacity onPress={clearQuery}>
            <MaterialIcons name="clear" size={30} color={colors.WHITE} />
          </TouchableOpacity>
        </InputContainer>
      </Header>

      <List
        data={results}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <UserItem
            data={item}
            onPress={() => navigation.navigate('User', { data: item })}
          />
        )}
      />
    </Container>
  );
}

Search.navigationOptions = () => ({
  header: null,
});

export default Search;
