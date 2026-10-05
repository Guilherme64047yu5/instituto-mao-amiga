import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pontosMock } from '../data/pontos';
import { estilos } from '../styles/estilos';

export default function ListaPontosScreen({ navigation }) {
  const [busca, setBusca] = useState('');

  useEffect(() => {
    async function carregarUltimaBusca() {
      const salva = await AsyncStorage.getItem('@mao_amiga:ultima_busca');
      if (salva) setBusca(salva);
    }
    carregarUltimaBusca();
  }, []);

  const handleBuscaChange = async (texto) => {
    setBusca(texto);
    await AsyncStorage.setItem('@mao_amiga:ultima_busca', texto);
  };

  const pontosFiltrados = pontosMock.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Pontos de Coleta</Text>
      
      <TextInput
        style={estilos.input}
        placeholder="Pesquisar ponto..."
        value={busca}
        onChangeText={handleBuscaChange}
      />

      <TouchableOpacity 
        style={[estilos.botao, { backgroundColor: '#1976d2', marginBottom: 15 }]}
        onPress={() => navigation.navigate('CadastroDoacao')}
      >
        <Text style={estilos.textoBotao}>Cadastrar Doação</Text>
      </TouchableOpacity>

      <FlatList
        data={pontosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={estilos.card}
            onPress={() => navigation.navigate('DetalhePonto', { ponto: item })}
          >
            <Text style={estilos.nomePonto}>{item.nome}</Text>
            <Text style={estilos.textoDetalhe}>{item.endereco}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}