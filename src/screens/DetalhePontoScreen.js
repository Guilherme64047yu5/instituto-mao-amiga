import React from 'react';
import { View, Text } from 'react-native';
import { estilos } from '../styles/estilos';

export default function DetalhePontoScreen({ route }) {
  const { ponto } = route.params || {};

  // Proteção caso abra sem parâmetros
  if (!ponto) {
    return (
      <View style={estilos.container}>
        <Text style={estilos.titulo}>Detalhes não encontrados</Text>
      </View>
    );
  }

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>{ponto.nome}</Text>
      
      <View style={estilos.card}>
        <Text style={estilos.nomePonto}>Endereço:</Text>
        <Text style={estilos.textoDetalhe}>{ponto.endereco}</Text>
      </View>

      <View style={estilos.card}>
        <Text style={estilos.nomePonto}>Dias e Horários:</Text>
        <Text style={estilos.textoDetalhe}>{ponto.diasHorarios}</Text>
      </View>

      <View style={estilos.card}>
        <Text style={estilos.nomePonto}>Informações:</Text>
        <Text style={estilos.textoDetalhe}>{ponto.recebeDistribui}</Text>
      </View>
    </View>
  );
}