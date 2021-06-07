import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { Pages } from './src/pages/Pages';
import { Welcome } from './src/pages/Welcome';
import { createStackNavigator } from '@react-navigation/stack';
import { UserIdentification } from './src/pages/UserIdentification';
import colors from './src/styles/colors';
import { Questions } from './src/pages/Questions';
import { UserProvider } from './src/proveiders/UserProvider';
import { End } from './src/pages/End';
import { Certificate } from './src/pages/Certificate';

const Stack = createStackNavigator();

const defaultScreenOptions = () => ({
  headerStyle: { backgroundColor: colors.blue_light },
  headerTintColor: colors.white,
  headerTitleStyle: { color: colors.white },
  headerBackTitleStyle: { color: colors.white },
  headerRightContainerStyle: { marginHorizontal: 20 }
});

export default function App() {
  return (
    <NavigationContainer>
      <UserProvider>
        <StatusBar barStyle="light-content" backgroundColor={colors.blue_light} />
        <Stack.Navigator screenOptions={defaultScreenOptions}>
          <Stack.Screen name={Pages.Welcome} component={Welcome} options={{ headerShown: false }} />
          <Stack.Screen name={Pages.UserIdentification} component={UserIdentification} options={{ headerShown: false }}/>
          <Stack.Screen name={Pages.Questions} component={Questions} options={{ headerShown: false }} />
          <Stack.Screen name={Pages.End} component={End} options={{ headerShown: false }} />
          <Stack.Screen name={Pages.Certificate} component={Certificate} options={{ headerShown: false }} />
        </Stack.Navigator>
      </UserProvider>
    </NavigationContainer>
  );
}
