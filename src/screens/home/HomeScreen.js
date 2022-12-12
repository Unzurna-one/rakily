import React, {useEffect, useLayoutEffect} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from 'dopenative';
import dynamicStyles from './styles';
import {useCurrentUser} from '../../Core/onboarding';
import {Avatar, IconButton} from '@react-native-material/core';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {getMovies} from '../../redux/reducers/reports';
import {MaterialIcons} from '@expo/vector-icons';

export const HomeScreen = props => {
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

  const {movies} = useSelector(state => state.moviesReducer);
  const dispatch = useDispatch();
  const fetchMovies = () => dispatch(getMovies());
  useEffect(() => {
    fetchMovies();
  }, []);
  console.log('movies ', movies);
  console.log('Object.values(movies) ', Object.values(movies));
  return (
    <View style={{flex: 1, marginTop: 10, paddingHorizontal: 20}}>
      <Text style={{fontSize: 20}}>All raki</Text>
      <View style={{flex: 1, marginTop: 12}}>
        <FlatList
          data={Object.values(movies)}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            const IMAGE_URL =
              'https://www.themoviedb.org/t/p/w600_and_h900_bestv2' +
              item.poster_path;
            console.log('IMAGE_URL ', IMAGE_URL);

            return (
              <View style={{marginVertical: 12}}>
                <View style={{flexDirection: 'row', flex: 1}}>
                  <Image
                    source={{
                      uri: IMAGE_URL,
                    }}
                    resizeMode="cover"
                    style={{width: 100, height: 100, borderRadius: 10}}
                  />
                  <View style={{flex: 1, marginLeft: 12}}>
                    <View>
                      <Text
                        numberOfLines={2}
                        style={{fontSize: 20, paddingRight: 16}}>
                        {item.title}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        alignItems: 'center',
                      }}>
                      <MaterialIcons color="green" name="thumb-up" size={32} />
                      <Text
                        style={{
                          fontSize: 18,
                          paddingLeft: 10,
                          color: '#64676D',
                        }}>
                        {item.vote_count}
                      </Text>
                      <TouchableOpacity
                        onPress={() => console.log('Added!')}
                        activeOpacity={0.7}
                        style={{
                          marginLeft: 14,
                          flexDirection: 'row',
                          padding: 2,
                          borderRadius: 20,
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: 40,
                          width: 40,
                        }}>
                        <MaterialIcons
                          color="orange"
                          size={32}
                          name="favorite-outline"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};
