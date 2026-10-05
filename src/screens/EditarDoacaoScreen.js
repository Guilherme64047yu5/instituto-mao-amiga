import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  ScrollView 
} from 'react-native';
import { atualizarDoacao } from '../services/doacoesStorage';

export default function EditarDoacaoScreen({ route, navigation }) {
  const { doacao } = route.params;

  const [tipoItem, setTipoItem] = useState(doacao.tipoItem);
  const [quantidade, setQuantidade] = useState(String(doacao.quantidade));
  const [pontoDestino, setPontoDestino] = useState(doacao.pontoDestino || '');

  const handleSalvarEdicao = async () => {
    if (!tipoItem.trim() || !quantidade.trim()) {
      Alert.alert('Atenção', 'Preencha o tipo do item e a quantidade.');
      return;
    }

    try {
      await atualizarDoacao(doacao.id, {
        tipoItem,
        quantidade,
        pontoDestino,
      });

      Alert.alert('Sucesso', 'Doação atualizada com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar a doação.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Editar Doação</Text>

      <Text style={styles.label}>Tipo do Item:</Text>
      <TextInput
        style={styles.input}
        value={tipoItem}
        onChangeText={setTipoItem}
        placeholder="Ex: Alimentos, Roupas..."
      />

      <Text style={styles.label}>Quantidade:</Text>
      <TextInput
        style={styles.input}
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
        placeholder="Ex: 5"
      />

      <Text style={styles.label}>Ponto de Destino:</Text>
      <TextInput
        style={styles.input}
        value={pontoDestino}
        onChangeText={setPontoDestino}
        placeholder="Ex: Ponto Central"
      />

      <TouchableOpacity style={styles.botaoSalvar} onPress={handleSalvarEdicao}>
        <Text style={styles.textoBotaoSalvar}>Guardar Alterações</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    flexGrow: 1,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  botaoSalvar: {
    backgroundColor: '#0066cc',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotaoSalvar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});