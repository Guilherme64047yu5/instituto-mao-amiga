import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { requisicao } from '../services/api';
import { cadastrarDoacao } from '../services/doacoesService';

export default function CadastroDoacaoScreen({ navigation }) {
  const [tipoItem, setTipoItem] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [pontos, setPontos] = useState([]);
  const [pontoSelecionado, setPontoSelecionado] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    carregarPontos();
  }, []);

  const carregarPontos = async () => {
    try {
      const resposta = await requisicao('/pontos');
      setPontos(Array.isArray(resposta) ? resposta : []);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os pontos de coleta.');
    } finally {
      setCarregando(false);
    }
  };

  const handleCadastrar = async () => {
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
      await cadastrarDoacao({
        tipoItem: tipoItem.trim(),
        quantidade: Number(quantidade),
        pontoDestino: pontoSelecionado.nome
      });

      Alert.alert('Sucesso', 'Doação cadastrada com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', error.message || 'Não foi possível cadastrar a doação.');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.titulo}>Registrar Nova Doação</Text>

          <Text style={styles.label}>Tipo do Item:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Alimentos não perecíveis"
            placeholderTextColor="#888"
            value={tipoItem}
            onChangeText={setTipoItem}
          />

          <Text style={styles.label}>Quantidade:</Text>
          <TextInput
            style={styles.input}
            placeholder="Apenas números"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={quantidade}
            onChangeText={setQuantidade}
          />

          <Text style={styles.label}>Ponto de Destino:</Text>

          {carregando ? (
            <ActivityIndicator size="large" color="#0066cc" />
          ) : pontos.length === 0 ? (
            <Text style={styles.aviso}>Nenhum ponto de coleta encontrado.</Text>
          ) : (
            pontos.map((ponto) => (
              <TouchableOpacity
                key={ponto.id}
                style={[
                  styles.ponto,
                  pontoSelecionado?.id === ponto.id && styles.pontoSelecionado
                ]}
                onPress={() => setPontoSelecionado(ponto)}
              >
                <Text style={styles.textoPonto}>{ponto.nome}</Text>
                <Text style={styles.endereco}>{ponto.endereco}</Text>
              </TouchableOpacity>
            ))
          )}

          <TouchableOpacity
            style={styles.botao}
            onPress={handleCadastrar}
            disabled={salvando || carregando}
          >
            <Text style={styles.botaoTexto}>
              {salvando ? 'Salvando...' : 'Confirmar Doação'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    flexGrow: 1,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#444',
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#fafafa',
  },
  ponto: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#fafafa',
  },
  pontoSelecionado: {
    borderColor: '#0066cc',
    backgroundColor: '#e6f2ff',
    borderWidth: 2,
  },
  textoPonto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  endereco: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  aviso: {
    color: '#666',
    marginBottom: 16,
  },
  botao: {
    backgroundColor: '#0066cc',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
