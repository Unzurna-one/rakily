import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useTranslations} from 'dopenative';
import {HomeScreen} from '../screens';

const MainStack = createStackNavigator();
const MainStackNavigator = () => {
  const {localized} = useTranslations();
  console.log('MainStackNavigator logging...', localized);
  return (
    <MainStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerBackTitle: localized('Back'),
      }}
      initialRouteName="Home">
      <MainStack.Screen name="Home" component={HomeScreen} />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
