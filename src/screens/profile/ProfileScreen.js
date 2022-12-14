import React, {useCallback, useEffect, useLayoutEffect} from 'react';
import {Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useTheme, useTranslations} from 'dopenative';
import dynamicStyles from './styles';
import {useCurrentUser} from '../../Core/onboarding';
import {useAuth} from '../../Core/onboarding/hooks/useAuth';
import {TNTouchableIcon} from '../../Core/truly-native';

export const ProfileScreen = props => {
  const {navigation} = props;

  const currentUser = useCurrentUser();
  const authManager = useAuth();

  const {localized} = useTranslations();
  const {theme, appearance} = useTheme();
  const styles = dynamicStyles(theme, appearance);

  useLayoutEffect(() => {
    const colorSet = theme.colors[appearance];
    navigation.setOptions({
      headerTitle: localized('Profile'),
      headerRight: () => (
        <View>
          <TNTouchableIcon
            imageStyle={{tintColor: colorSet.primaryForeground}}
            iconSource={theme.icons.logout}
            onPress={onLogout}
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

  const onLogout = useCallback(() => {
    authManager?.logout(currentUser);
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'LoadScreen',
        },
      ],
    });
  }, [authManager, currentUser, navigation]);

  return (
    <View style={styles.container}>
      <FastImage
        style={styles.image}
        source={{uri: currentUser?.profilePictureURL}}
      />
      <Text style={styles.text}>
        {localized('Logged in as')} {currentUser?.email}
      </Text>
    </View>
  );
};
