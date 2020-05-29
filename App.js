import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import DeckList from './components/DeckList'
import DeckDetail from './components/DeckDetail';
import Quiz from './components/Quiz';
import NewDeck from './components/NewDeck';
import AddCard from './components/AddCard';
import reducers from './reducers'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {setLocalNotification} from './utils/helper'


function FlashStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: 15 }}>
      <StatusBar translucent backgroundColor={backgroundColor}{...props} />
    </View>
  )
}


const TabRouteConfig = {
  Decks: {
    name: 'Decks',
    component: DeckList,
    options: { tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name="cards" size={30} color={tintColor} />, title: 'Decks' }
  },
  NewDeck: {
    name: 'New Deck',
    component: NewDeck,
    options: { tabBarIcon: ({ tintColor }) => <Ionicons name="ios-add-circle-outline" size={30} color={tintColor} />, title: 'Add Deck' }
  }
}

const tabNavigatorConfig = {
  tabBarOptions: {
    activeTintColor: 'purple',
    style: {
      height: 56,
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Home = () => {
  return (
    <Tab.Navigator {...tabNavigatorConfig}>
      <Tab.Screen {...TabRouteConfig['Decks']} />
      <Tab.Screen {...TabRouteConfig['NewDeck']} />
    </Tab.Navigator>
  )
}

const StackRouteConfig = {
  Home: {
    name: 'Home',
    component: Home,

  },

  DeckDetail: {
    name: 'Deck Details',
    component: DeckDetail
  },
  AddCard: {
    name: 'AddCard',
    component: AddCard
  },
  Quiz: {
    name: 'Quiz',
    component: Quiz
  }



}

const StackRoutes = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator >
        <Stack.Screen {...StackRouteConfig['Home']} />
        <Stack.Screen {...StackRouteConfig['DeckDetail']} />
        <Stack.Screen {...StackRouteConfig['AddCard']} />
        <Stack.Screen {...StackRouteConfig['Quiz']} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={createStore(reducers)}>
        <FlashStatusBar backgroundColor={'gray'} />
        <StackRoutes />
      </Provider>

    );
  }
}

