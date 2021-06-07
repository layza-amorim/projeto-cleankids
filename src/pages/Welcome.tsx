import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Pages } from './Pages';
import { Button } from '../components/Button';

const background = require('../assets/background.png');

export function Welcome() {
  const navigation = useNavigation();

  const handleStart = () => {
    navigation.navigate(Pages.UserIdentification);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={background} style={styles.image}>
        <View style={styles.footer}>
          <Button title="Começar" onPress={handleStart} />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end'
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 50
  }
});
