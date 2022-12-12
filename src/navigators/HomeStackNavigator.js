import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useTranslations} from 'dopenative';
import {HomeScreen, ProfileScreen} from '../screens';
import {StyleSheet} from 'react-native';

const MainStack = createStackNavigator();
const MainStackNavigator = () => {
  const {localized} = useTranslations();
  return (
    <MainStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerBackTitle: localized('Back'),
      }}
      initialRouteName="Home">
      <MainStack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerStyle: styles.headerStyle}}
      />
      <MainStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerStyle: styles.headerStyle}}
      />
    </MainStack.Navigator>
  );
};
const styles = StyleSheet.create({
  headerStyle: {
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0, // remove shadow on Android
  },
});
export default MainStackNavigator;
