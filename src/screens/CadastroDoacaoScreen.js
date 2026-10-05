import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { estilos } from '../styles/estilos';

export default function CadastroDoacaoScreen({ navigation }) {
  const [tipoItem, setTipoItem] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [erroQtd, setErroQtd] = useState('');

  const validarESalvar = () => {
    if (!/^\d+$/.test(quantidade)) {
      setErroQtd('A quantidade deve conter apenas números válidos.');
      return;
    }
    setErroQtd('');

    if (!tipoItem.trim()) {
      Alert.alert('Atenção', 'Informe o tipo do item.');
      return;
    }

    Alert.alert('Sucesso', 'Doação cadastrada com sucesso!');
    setTipoItem('');
    setQuantidade('');
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Cadastro de Doação</Text>

      <Text style={estilos.textoDetalhe}>Tipo do Item:</Text>
      <TextInput
        style={estilos.input}
        placeholder="Ex: Cesta básica, Roupas..."
        value={tipoItem}
        onChangeText={setTipoItem}
      />

      <Text style={estilos.textoDetalhe}>Quantidade:</Text>
      <TextInput
        style={estilos.input}
        placeholder="Ex: 5"
        keyboardType="numeric"
        value={quantidade}
        onChangeText={(texto) => {
          setQuantidade(texto);
          if (/^\d*$/.test(texto)) setErroQtd('');
          else setErroQtd('Digite apenas números.');
        }}
      />
      {erroQtd ? <Text style={estilos.erro}>{erroQtd}</Text> : null}

      <TouchableOpacity style={estilos.botao} onPress={validarESalvar}>
        <Text style={estilos.textoBotao}>Salvar Doação</Text>
      </TouchableOpacity>
    </View>
  );
}