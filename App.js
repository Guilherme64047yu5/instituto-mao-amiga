import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListaPontosScreen from './src/screens/ListaPontosScreen';
import DetalhePontoScreen from './src/screens/DetalhePontoScreen';
import CadastroDoacaoScreen from './src/screens/CadastroDoacaoScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListaPontos">
        <Stack.Screen 
          name="ListaPontos" 
          component={ListaPontosScreen} 
          options={{ title: 'Instituto Mão Amiga' }}
        />
        <Stack.Screen 
          name="DetalhePonto" 
          component={DetalhePontoScreen} 
          options={{ title: 'Detalhes do Ponto' }}
        />
        <Stack.Screen 
          name="CadastroDoacao" 
          component={CadastroDoacaoScreen} 
          options={{ title: 'Nova Doação' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}