import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import Chat from '~/screens/Chat';
import Chats from '~/screens/Chats';
import Friends from '~/screens/Friends';
import Login from '~/screens/Login';
import Register from '~/screens/Register';
import Search from '~/screens/Search';

const HomeStack = createMaterialTopTabNavigator(
  {
    Chats: {
      screen: Chats,
      navigationOptions: {
        title: 'Conversas',
      },
    },
    Friends: {
      screen: Friends,
      navigationOptions: {
        title: 'Amigos',
      },
    },
  },
  {
    swipeEnabled: true,
    tabBarOptions: {
      style: {
        backgroundColor: '#714CC1',
      },
      indicatorStyle: {
        borderBottomColor: '#fff',
        borderBottomWidth: 2,
      },
    },
  }
);

const AppStack = createStackNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      title: 'EasyTalk',
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#714CC1',
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      },
    },
  },
  Search,
  Chat,
});

const AuthStack = createStackNavigator(
  {
    Login,
    Register,
  },
  {
    initialRouteName: 'Login',
  }
);

const MainStack = createSwitchNavigator(
  { AppStack, AuthStack },
  {
    initialRouteName: 'AppStack',
  }
);

export default createAppContainer(MainStack);
