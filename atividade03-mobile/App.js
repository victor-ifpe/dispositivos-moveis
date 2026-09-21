import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaExplorarProdutos from './src/telas/TelaExplorarProdutos';
import TelaDetalhesProduto from './src/telas/TelaDetalhesProdutos';
import TelaFiltros from './src/telas/TelaFiltros';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaExplorarProdutos">

        <Stack.Screen
          name="TelaExplorarProdutos"
          component={TelaExplorarProdutos}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="TelaDetalhesProduto"
          component={TelaDetalhesProduto}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="TelaFiltros"
          component={TelaFiltros}
          options={{
            headerShown: false,
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}