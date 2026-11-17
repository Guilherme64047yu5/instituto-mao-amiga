
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { estilos } from '../styles/estilos';

const API_URL = 'http://192.168.101.8:8080/api/v1/pontos/filtro';

export default function ListaPontosScreen({ navigation }) {
  const [busca, setBusca] = useState('');
  const [pontos, setPontos] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function iniciar() {
      try {
        const salva = await AsyncStorage.getItem('@mao_amiga:ultima_busca');
        if (salva) {
          setBusca(salva);
          await buscarPontos(salva);
        } else {
          await buscarPontos('');
        }
      } catch (error) {
        await buscarPontos('');
      }
    }

    iniciar();
  }, []);

  async function buscarPontos(texto) {
    setCarregando(true);
    setErro('');

    try {
      const url = `${API_URL}?filtro=${encodeURIComponent(texto)}&page=0&size=50`;
      const resposta = await fetch(url);

      if (!resposta.ok) {
        throw new Error('Erro ao buscar pontos');
      }

      const dados = await resposta.json();
      setPontos(dados.content || []);
    } catch (error) {
      setErro('Não foi possível conectar à API.');
      setPontos([]);
    } finally {
      setCarregando(false);
    }
  }

  const handleBuscaChange = async (texto) => {
    setBusca(texto);
    await AsyncStorage.setItem('@mao_amiga:ultima_busca', texto);
    buscarPontos(texto);
  };

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

      {carregando && <ActivityIndicator size="large" />}

      {erro !== '' && <Text>{erro}</Text>}

      <FlatList
        data={pontos}
        keyExtractor={(item) => item.id}
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
