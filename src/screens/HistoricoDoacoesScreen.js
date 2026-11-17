import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
  listarDoacoes,
  excluirDoacao
} from '../services/doacoesService';

export default function HistoricoDoacoesScreen({ navigation }) {
  const [filtro, setFiltro] = useState('');
  const [busca, setBusca] = useState('');
  const [doacoes, setDoacoes] = useState([]);
  const [pagina, setPagina] = useState(0);
  const [temMais, setTemMais] = useState(true);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  const carregarDoacoes = async (novaBusca = filtro, paginaAtual = 0, reiniciar = false) => {
    if (carregando) return;

    setCarregando(true);
    setErro('');

    try {
      const resposta = await listarDoacoes(novaBusca, paginaAtual, 10);
      const lista = resposta?.content || [];

      setDoacoes((anteriores) =>
        reiniciar ? lista : [...anteriores, ...lista]
      );

      const totalPaginas = resposta?.page?.totalPages ?? resposta?.totalPages;
      const ultimaPagina = resposta?.last;

      if (totalPaginas !== undefined) {
        setTemMais(paginaAtual + 1 < totalPaginas);
      } else if (ultimaPagina !== undefined) {
        setTemMais(!ultimaPagina);
      } else {
        setTemMais(lista.length === 10);
      }

      setPagina(paginaAtual);
    } catch (error) {
      setErro('Não foi possível carregar as doações. Verifique se a API está ligada.');
      if (reiniciar) setDoacoes([]);
    } finally {
      setCarregando(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarDoacoes(filtro, 0, true);
    }, [filtro])
  );

  const pesquisar = () => {
    setFiltro(busca);
    setPagina(0);
    setTemMais(true);
    carregarDoacoes(busca, 0, true);
  };

  const carregarMais = () => {
    if (!carregando && temMais && doacoes.length > 0) {
      carregarDoacoes(filtro, pagina + 1);
    }
  };

  const editar = (id) => {
    navigation.navigate('EditarDoacao', { id });
  };

  const excluir = (id) => {
    Alert.alert(
      'Excluir doação',
      'Tem certeza que deseja excluir esta doação?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await excluirDoacao(id);
              setDoacoes((anteriores) =>
                anteriores.filter((doacao) => doacao.id !== id)
              );
              Alert.alert('Sucesso', 'Doação excluída com sucesso!');
            } catch (error) {
              Alert.alert('Erro', error.message || 'Não foi possível excluir a doação.');
            }
          }
        }
      ]
    );
  };

  const formatarData = (data) => {
    if (!data) return 'Data não informada';
    return new Date(data).toLocaleString('pt-BR');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Histórico de Doações</Text>

      <TextInput
        style={styles.input}
        placeholder="Pesquisar por tipo de item..."
        value={busca}
        onChangeText={setBusca}
        onSubmitEditing={pesquisar}
      />

      <TouchableOpacity style={styles.botao} onPress={pesquisar}>
        <Text style={styles.textoBotao}>Pesquisar</Text>
      </TouchableOpacity>

      {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

      <FlatList
        data={doacoes}
        keyExtractor={(item) => String(item.id)}
        onEndReached={carregarMais}
        onEndReachedThreshold={0.3}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.tipoItem}</Text>
            <Text>Quantidade: {item.quantidade}</Text>
            <Text>Destino: {item.pontoDestino}</Text>
            <Text>Data: {formatarData(item.criadoEm)}</Text>

            <View style={styles.acoes}>
              <TouchableOpacity
                style={styles.botaoEditar}
                onPress={() => editar(item.id)}
              >
                <Text style={styles.textoAcao}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.botaoExcluir}
                onPress={() => excluir(item.id)}
              >
                <Text style={styles.textoAcao}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          carregando ? null : (
            <Text style={styles.vazio}>
              {erro ? '' : 'Nenhuma doação encontrada.'}
            </Text>
          )
        }
        ListFooterComponent={
          carregando ? (
            <ActivityIndicator size="large" color="#1976d2" />
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 10,
  },
  botao: {
    backgroundColor: '#1976d2',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  nome: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  acoes: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  botaoEditar: {
    flex: 1,
    backgroundColor: '#1976d2',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoExcluir: {
    flex: 1,
    backgroundColor: '#d32f2f',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoAcao: {
    color: '#fff',
    fontWeight: 'bold',
  },
  erro: {
    color: 'red',
    marginBottom: 10,
  },
  vazio: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
});
