import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_ULTIMA_DOACAO = '@instituto_mao_amiga:ultima_doacao';

export default function CadastroDoacaoScreen({ navigation }) {
  const [tipoItem, setTipoItem] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [destino, setDestino] = useState('');

  useEffect(() => {
    carregarDoacaoSalva();
  }, []);

  const carregarDoacaoSalva = async () => {
    try {
      const dadosSalvos = await AsyncStorage.getItem(CHAVE_ULTIMA_DOACAO);
      if (dadosSalvos !== null) {
        const doacao = JSON.parse(dadosSalvos);
        setTipoItem(doacao.tipoItem || '');
        setQuantidade(doacao.quantidade || '');
        setDestino(doacao.destino || '');
      }
    } catch (error) {
      console.log('Erro ao carregar a doação salva:', error);
    }
  };

  const handleCadastrar = async () => {
    const regexNumerico = /^[0-9]+$/;
    if (!regexNumerico.test(quantidade)) {
      Alert.alert('Erro', 'A quantidade deve conter apenas números válidos.');
      return;
    }

    const novaDoacao = { tipoItem, quantidade, destino };

    try {
      await AsyncStorage.setItem(CHAVE_ULTIMA_DOACAO, JSON.stringify(novaDoacao));
      Alert.alert('Sucesso', 'Doação registada e salva com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar os dados localmente.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.titulo}>Registar Nova Doação</Text>

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
          <TextInput
            style={styles.input}
            placeholder="Ex: Centro de Apoio"
            placeholderTextColor="#888"
            value={destino}
            onChangeText={setDestino}
          />

          <TouchableOpacity style={styles.botao} onPress={handleCadastrar}>
            <Text style={styles.botaoTexto}>Confirmar Doação</Text>
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
    justifyContent: 'center',
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