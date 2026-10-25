import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TelaCadastro from './src/Telas/TelaCadastro';
import TelaImagens from './src/Telas/TelaImagens';
import TelaLogin from './src/Telas/TelaLogin';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaLogin">

        <Stack.Screen
          name="TelaLogin"
          component={TelaLogin}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="TelaCadastro"
          component={TelaCadastro}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="TelaImagens"
          component={TelaImagens}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}