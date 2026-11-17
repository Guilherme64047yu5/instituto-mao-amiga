import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { estilos } from '../styles/estilos';
import { listarPontos } from '../services/pontosService';

export default function ListaPontosScreen({ navigation }) {
  const [busca, setBusca] = useState('');
  const [pontos, setPontos] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function carregarUltimaBusca() {
      const salva = await AsyncStorage.getItem('@mao_amiga:ultima_busca');
      if (salva) setBusca(salva);
    }

    carregarUltimaBusca();
  }, []);

  const carregarPontos = useCallback(async () => {
    setCarregando(true);
    setErro('');

    try {
      const dados = await listarPontos(busca);
      setPontos(dados?.content || []);
    } catch (error) {
      setErro('Não foi possível carregar os pontos da API.');
      setPontos([]);
    } finally {
      setCarregando(false);
    }
  }, [busca]);

  useFocusEffect(
    useCallback(() => {
      carregarPontos();
    }, [carregarPontos])
  );

  async function handleBuscaChange(texto) {
    setBusca(texto);
    await AsyncStorage.setItem('@mao_amiga:ultima_busca', texto);
  }

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
        style={[estilos.botao, { backgroundColor: '#2e7d32', marginBottom: 10 }]}
        onPress={() => navigation.navigate('CadastroPonto')}
      >
        <Text style={estilos.textoBotao}>Cadastrar Ponto</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[estilos.botao, { backgroundColor: '#1976d2', marginBottom: 10 }]}
        onPress={() => navigation.navigate('CadastroDoacao')}
      >
        <Text style={estilos.textoBotao}>Cadastrar Doação</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[estilos.botao, { backgroundColor: '#6a1b9a', marginBottom: 15 }]}
        onPress={() => navigation.navigate('HistoricoDoacoes')}
      >
        <Text style={estilos.textoBotao}>Histórico de Doações</Text>
      </TouchableOpacity>

      {carregando && <ActivityIndicator size="large" />}

      {erro !== '' && <Text>{erro}</Text>}

      <FlatList
        data={pontos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={estilos.card}
            onPress={() => navigation.navigate('DetalhePonto', { ponto: item })}
          >
            <Text style={estilos.nomePonto}>{item.nome}</Text>
            <Text style={estilos.textoDetalhe}>{item.endereco}</Text>
            <Text style={estilos.textoDetalhe}>{item.bairro}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          !carregando && erro === '' ? (
            <Text>Nenhum ponto encontrado.</Text>
          ) : null
        }
      />
    </View>
  );
}
