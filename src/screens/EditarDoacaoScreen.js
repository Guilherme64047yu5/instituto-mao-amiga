import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { requisicao } from '../services/api';
import {
  buscarDoacaoPorId,
  atualizarDoacao
} from '../services/doacoesService';

export default function EditarDoacaoScreen({ route, navigation }) {
  const { id } = route.params;

  const [tipoItem, setTipoItem] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [pontos, setPontos] = useState([]);
  const [pontoSelecionado, setPontoSelecionado] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [doacao, listaPontos] = await Promise.all([
        buscarDoacaoPorId(id),
        requisicao('/pontos')
      ]);

      setTipoItem(doacao.tipoItem || '');
      setQuantidade(String(doacao.quantidade || ''));

      const lista = Array.isArray(listaPontos) ? listaPontos : [];
      setPontos(lista);

      const ponto = lista.find(
        (item) => item.nome === doacao.pontoDestino
      );

      setPontoSelecionado(ponto || null);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os dados da doação.');
    } finally {
      setCarregando(false);
    }
  };

  const handleSalvar = async () => {
    if (!tipoItem.trim()) {
      Alert.alert('Erro', 'Informe o tipo do item.');
      return;
    }

    if (!/^[0-9]+$/.test(quantidade) || Number(quantidade) <= 0) {
      Alert.alert('Erro', 'Informe uma quantidade válida maior que zero.');
      return;
    }

    if (!pontoSelecionado) {
      Alert.alert('Erro', 'Selecione um ponto de destino.');
      return;
    }

    setSalvando(true);

    try {
      await atualizarDoacao(id, {
        tipoItem: tipoItem.trim(),
        quantidade: Number(quantidade),
        pontoDestino: pontoSelecionado.nome
      });

      Alert.alert('Sucesso', 'Doação atualizada com sucesso!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]);
    } catch (error) {
      Alert.alert('Erro', error.message || 'Não foi possível atualizar a doação.');
    } finally {
      setSalvando(false);
    }
  };

  if (carregando) {
    return (
      <View style={styles.carregando}>
        <ActivityIndicator size="large" color="#1976d2" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <Text style={styles.titulo}>Editar Doação</Text>

        <Text style={styles.label}>Tipo do Item:</Text>
        <TextInput
          style={styles.input}
          value={tipoItem}
          onChangeText={setTipoItem}
          placeholder="Ex: Alimentos"
        />

        <Text style={styles.label}>Quantidade:</Text>
        <TextInput
          style={styles.input}
          value={quantidade}
          onChangeText={setQuantidade}
          keyboardType="numeric"
          placeholder="Apenas números"
        />

        <Text style={styles.label}>Ponto de Destino:</Text>

        {pontos.map((ponto) => (
          <TouchableOpacity
            key={ponto.id}
            style={[
              styles.ponto,
              pontoSelecionado?.id === ponto.id && styles.selecionado
            ]}
            onPress={() => setPontoSelecionado(ponto)}
          >
            <Text style={styles.textoPonto}>{ponto.nome}</Text>
            <Text style={styles.endereco}>{ponto.endereco}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.botao}
          onPress={handleSalvar}
          disabled={salvando}
        >
          <Text style={styles.textoBotao}>
            {salvando ? 'Salvando...' : 'Salvar Alterações'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  conteudo: {
    padding: 20,
  },
  carregando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#444',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 16,
  },
  ponto: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#fafafa',
  },
  selecionado: {
    borderColor: '#0066cc',
    borderWidth: 2,
    backgroundColor: '#e6f2ff',
  },
  textoPonto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  endereco: {
    color: '#666',
    marginTop: 4,
  },
  botao: {
    backgroundColor: '#1976d2',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
