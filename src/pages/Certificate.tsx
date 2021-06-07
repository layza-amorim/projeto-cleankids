import React from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useUser } from '../proveiders/UserProvider';
import colors from '../styles/colors';

const background = require('../assets/certificate.png');

export function Certificate() {
  const { name } = useUser();

  return (
    <View style={styles.container}>
      <ImageBackground source={background} style={styles.image}>
        <View style={styles.content}>
          <Text style={styles.messageText}>
            Este certificado foi feito para <Text style={[styles.messageText, { fontWeight: 'bold' }]}>{name},</Text>{' '}
            {'\n'} que aprendeu direitinho como será realizada a higienização necessária para sua proteção!
          </Text>
          <Text style={styles.messageCongratulations}>Parabéns!</Text>
        </View>
        <View style={styles.line} />
        <Text style={styles.messageText}>Assinatura do responsável</Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30
  },
  image: {
    resizeMode: 'cover',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 0.65,
    paddingVertical: 70,
    paddingHorizontal: 50
  },
  messageText: {
    fontSize: 12,
    textAlign: 'center'
  },
  messageCongratulations: {
    fontSize: 12,
    textAlign: 'center',
    paddingVertical: 10
  },
  line: {
    width: '60%',
    height: 1,
    backgroundColor: colors.black,
    margin: 4
  }
});
