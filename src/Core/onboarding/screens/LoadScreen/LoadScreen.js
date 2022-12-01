import React, { useCallback } from 'react'
import { Keyboard, Text, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import deviceStorage from '../../utils/AuthDeviceStorage'
import { useDispatch } from 'react-redux'
import { setUserData } from '../../redux/auth'
import { useOnboardingConfig } from '../../hooks/useOnboardingConfig'
import { useAuth } from '../../hooks/useAuth'

const LoadScreen = props => {
  const { navigation } = props

  const dispatch = useDispatch()
  const authManager = useAuth()

  const { config } = useOnboardingConfig()

  useFocusEffect(
    React.useCallback(() => {
      setAppState()
    }, []),
  )

  const setAppState = async () => {
    const shouldShowOnboardingFlow = deviceStorage.getShouldShowOnboardingFlow()
    if (!shouldShowOnboardingFlow) {
      if (config?.isDelayedLoginEnabled) {
        await fetchPersistedUserIfNeeded()
        return
      }
      navigation.navigate('LoginStack')
    } else {
      navigation.navigate('Walkthrough')
    }
  }

  const fetchPersistedUserIfNeeded = async () => {
    if (!authManager?.retrievePersistedAuthUser) {
      return navigation.navigate('DelayedHome')
    }
    authManager
      ?.retrievePersistedAuthUser(config)
      .then(response => {
        if (response?.user) {
          dispatch(
            setUserData({
              user: response.user,
            }),
          )
          Keyboard.dismiss()
        }
        navigation.navigate('DelayedHome')
      })
      .catch(error => {
        console.log(error)
        navigation.navigate('DelayedHome')
      })
  }
  return (
    <View>
      <Text> fffffffffffffffffffff</Text>
    </View>
  );
}

LoadScreen.navigationOptions = {
  header: null,
}

export default LoadScreen
