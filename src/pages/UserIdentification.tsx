import React, { useState } from 'react';
import colors from '../styles/colors';
import { useNavigation } from '@react-navigation/native';
import {
  Alert,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { Button } from '../components/Button';
import { useUser } from '../proveiders/UserProvider';
import { Pages } from './Pages';

const logo = require('../assets/logo.png');

export function UserIdentification() {
  const navigation = useNavigation();
  const { saveName } = useUser();
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>();

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!name);
  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputChenge(value: string) {
    setIsFocused(!!value);
    setName(value);
  }

  async function handleSubmite() {
    if (!name) {
      return Alert.alert('Me diz como chamar você 😥');
    } else {
      saveName(name);
      navigation.navigate(Pages.Questions);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <Image source={logo} style={styles.image} />
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.emoji}>{isFilled ? '😁' : '😀'}</Text>
                <Text style={styles.title}>Como podemos {'\n'} chamar você?</Text>
              </View>
              <TextInput
                placeholder="Digite um nome"
                style={[styles.input, (isFocused || isFilled) && { borderColor: colors.blue_light }]}
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChenge}
              />
              <View style={styles.footer}>
                <Button title="Confirmar" onPress={handleSubmite} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignContent: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.white
  },
  content: {
    flex: 1,
    width: '100%'
  },
  image: {
    alignSelf: 'center',
    height: Dimensions.get('window').width * 0.4,
    resizeMode: 'contain'
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 54,
    alignItems: 'center'
  },
  header: {
    alignItems: 'center'
  },
  emoji: {
    fontSize: 44
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center'
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: colors.heading,
    lineHeight: 32
  },
  footer: {
    marginTop: 40,
    width: '100%',
    paddingHorizontal: 20
  }
});
