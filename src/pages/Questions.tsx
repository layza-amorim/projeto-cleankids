import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Dimensions, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ImageSourcePropType } from '../../node_modules/@types/react-native/index';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Pages } from './Pages';
import { useUser } from '../proveiders/UserProvider';
import { Audio } from 'expo-av';
import colors from '../styles/colors';
import { Sound } from 'expo-av/build/Audio';

const soundCorrectAnswer = require('../assets/correctAnswer.mp3');
const soundWrongAnswer = require('../assets/wrongAnswer.mp3');

const trueAnswer = require('../assets/trueAnswer.png');
const falseAnswer = require('../assets/falseAnswer.png');
const question1 = require('../assets/question1.png');
const question2 = require('../assets/question2.png');
const question3 = require('../assets/question3.png');
const question4 = require('../assets/question4.png');
const question5 = require('../assets/question5.png');
const question6 = require('../assets/question6.png');
const question7 = require('../assets/question7.png');
const question8 = require('../assets/question8.png');

export function Questions() {
  const navigation = useNavigation();
  const { updateScore } = useUser();
  const [score, setScore] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [imageCurrentQuestion, setImageCurrentQuestion] = useState<ImageSourcePropType>(question1);
  const [sound, setSound] = useState<Sound>();

  const imagesQuestions: any = {
    [1]: question1,
    [2]: question2,
    [3]: question3,
    [4]: question4,
    [5]: question5,
    [6]: question6,
    [7]: question7,
    [8]: question8
  };

  const answers: any = {
    [1]: true,
    [2]: true,
    [3]: true,
    [4]: false,
    [5]: true,
    [6]: true,
    [7]: false,
    [8]: false
  };

  useFocusEffect(
    useCallback(() => {
      setScore(0);
      setCurrentQuestion(1);
      setImageCurrentQuestion(question1);
    }, [])
  );

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const submitAnswer = async (answer: boolean) => {
    const correctAnswer = answers[currentQuestion];

    if (answer === correctAnswer) {
      const { sound } = await Audio.Sound.createAsync(soundCorrectAnswer);
      setSound(sound);
      await sound.playAsync();

      Alert.alert('Parabéns, você acertou! 😀');
      const newScore = score + 1;
      setScore(newScore);
      updateScore(newScore);
    } else {
      const { sound } = await Audio.Sound.createAsync(soundWrongAnswer);
      setSound(sound);
      await sound.playAsync();

      Alert.alert('Que pena, você errou! 😥');
    }

    const newCurrentQuestion = currentQuestion + 1;
    setCurrentQuestion(newCurrentQuestion);

    const newImageCurrentQuestion = imagesQuestions[newCurrentQuestion];
    setImageCurrentQuestion(newImageCurrentQuestion);

    if (newCurrentQuestion === 9) {
      navigation.navigate(Pages.End);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={imageCurrentQuestion} style={styles.imageQuestion}>
        <View style={styles.content}>
          <View style={styles.containerScore}>
            <Text style={styles.score}>{score}</Text>
            <Text style={styles.scoreText}>Pontos</Text>
          </View>
          <View style={styles.answersGroup}>
            <TouchableOpacity style={styles.answer} onPress={() => submitAnswer(true)}>
              <Image source={trueAnswer} style={styles.imageAnswer} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.answer} onPress={() => submitAnswer(false)}>
              <Image source={falseAnswer} style={styles.imageAnswer} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  containerScore: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 5,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors.blue_light
  },
  score: {
    fontSize: 45,
    color: colors.white,
    fontWeight: 'bold'
  },
  scoreText: {
    fontSize: 20,
    color: colors.white,
    fontWeight: 'bold'
  },
  imageAnswer: {
    resizeMode: 'contain',
    height: Dimensions.get('window').width * 0.35,
    width: Dimensions.get('window').width * 0.35
  },
  imageQuestion: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  answersGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  answer: {
    alignItems: 'center',
    marginHorizontal: 20
  }
});
