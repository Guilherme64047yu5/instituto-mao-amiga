import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { estilos } from '../styles/estilos';
import { excluirPonto } from '../services/pontosService';

export default function DetalhePontoScreen({ route, navigation }) {
  const { ponto } = route.params || {};

  if (!ponto) {
    return (
      <View style={estilos.container}>
        <Text style={estilos.titulo}>Detalhes não encontrados</Text>
      </View>
    );
  }

  function confirmarExclusao() {
    Alert.alert(
      'Excluir ponto',
      'Tem certeza que deseja excluir este ponto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await excluirPonto(ponto.id);
              Alert.alert('Sucesso', 'Ponto excluído!');
              navigation.goBack();
            } catch (error) {
              Alert.alert('Erro', error.message || 'Não foi possível excluir o ponto.');
            }
          },
        },
      ]
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
        <Text style={estilos.nomePonto}>Bairro:</Text>
        <Text style={estilos.textoDetalhe}>{ponto.bairro}</Text>
      </View>

      <View style={estilos.card}>
        <Text style={estilos.nomePonto}>Dias e horários:</Text>
        <Text style={estilos.textoDetalhe}>{ponto.horario}</Text>
      </View>

      <View style={estilos.card}>
        <Text style={estilos.nomePonto}>Tipo:</Text>
        <Text style={estilos.textoDetalhe}>{ponto.tipo}</Text>
      </View>

      <TouchableOpacity
        style={[estilos.botao, { marginBottom: 10 }]}
        onPress={() => navigation.navigate('CadastroPonto', { ponto })}
      >
        <Text style={estilos.textoBotao}>Editar ponto</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[estilos.botao, { backgroundColor: '#c62828' }]}
        onPress={confirmarExclusao}
      >
        <Text style={estilos.textoBotao}>Excluir ponto</Text>
      </TouchableOpacity>
    </View>
  );
}