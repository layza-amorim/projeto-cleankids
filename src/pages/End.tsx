import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { useUser } from '../proveiders/UserProvider';
import { Pages } from './Pages';
import colors from '../styles/colors';

const background = require('../assets/background.png');
const logo = require('../assets/logo.png');

export function End() {
  const navigation = useNavigation();
  const { name, score } = useUser();

  return (
    <View style={styles.container}>
      {score >= 6 ? (
        <View style={styles.contentWin}>
          <Image source={logo} style={styles.imageLogo} />
          <Text style={styles.title}>Parabéns, {name}! 😀</Text>
          <Text style={styles.subtitle}>
            Você chegou ao fim do jogo e pelo seu bom desempenho, ganhou um certificado!
          </Text>
          <View style={styles.footer}>
            <Button title="Ver certificado" onPress={() => navigation.navigate(Pages.Certificate)} />
          </View>
        </View>
      ) : (
        <ImageBackground source={background} style={styles.imageBackground}>
          <View style={styles.contentLost}>
            <Text style={styles.title}>{name}, você chegou ao fim do jogo!</Text>
            <Text style={styles.subtitle}>
              Seu desempenho não foi muito bom 😥, então você pode jogar novamente para aprender mais sobre limpeza!
            </Text>
            <View style={styles.footer}>
              <Button title="Jogar novamente" onPress={() => navigation.navigate(Pages.Questions)} />
            </View>
          </View>
        </ImageBackground>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentWin: {
    flex: 1,
    justifyContent: 'space-around'
    // alignItems: 'center',
    // padding: 20
  },
  contentLost: {
    backgroundColor: colors.white,
    borderRadius: 20,
    margin: 20,
    padding: 10
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end'
  },
  imageLogo: {
    resizeMode: 'contain',
    height: Dimensions.get('window').width * 0.4
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginVertical: 10
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center'
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: '100%'
  }
});
