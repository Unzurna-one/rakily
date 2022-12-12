import React, {useEffect, useLayoutEffect} from 'react';
import {Text, View} from 'react-native';
import {useTheme} from 'dopenative';
import dynamicStyles from './styles';
import {useCurrentUser} from '../../Core/onboarding';
import {Avatar, IconButton} from '@react-native-material/core';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

export const MyReportsScreen = props => {
  const {navigation, imageStyle} = props;

  const currentUser = useCurrentUser();

  const {theme, appearance} = useTheme();
  const styles = dynamicStyles(theme, appearance);

  const colorSet = theme.colors[appearance];
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <IconButton icon={props => <Icon name="menu" {...props} />} />
      ),
      headerRight: () => (
        <View>
          <IconButton
            icon={
              <Avatar
                style={[styles.Image, imageStyle]}
                color="primary"
                label={currentUser.firstName + ' ' + currentUser.lastName}
                size={28}
              />
            }
            onPress={() => navigation.navigate('Profile')}
          />
        </View>
      ),
      headerStyle: {
        backgroundColor: colorSet.primaryBackground,
        borderBottomColor: colorSet.hairline,
      },
      headerTintColor: colorSet.primaryText,
    });
  }, []);

  useEffect(() => {
    if (!currentUser?.id) {
    }
  }, [currentUser?.id]);

  return (
    <View style={styles.container}>
      <Text style={styles.text} />
    </View>
  );
};
