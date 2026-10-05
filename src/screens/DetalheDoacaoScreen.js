import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { excluirDoacao } from '../services/doacoesStorage';

export default function DetalheDoacaoScreen({ route, navigation }) {
  const { doacao } = route.params;

  const dataFormatada = new Date(doacao.criadoEm).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleExcluir = () => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza de que deseja eliminar este registo de doação?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive',
          onPress: async () => {
            await excluirDoacao(doacao.id);
            navigation.goBack();
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Tipo de Item:</Text>
        <Text style={styles.valor}>{doacao.tipoItem}</Text>

        <Text style={styles.label}>Quantidade:</Text>
        <Text style={styles.valor}>{doacao.quantidade}</Text>

        <Text style={styles.label}>Ponto de Destino:</Text>
        <Text style={styles.valor}>{doacao.pontoDestino || 'Não informado'}</Text>

        <Text style={styles.label}>Data do Registo:</Text>
        <Text style={styles.valor}>{dataFormatada}</Text>
      </View>

      <TouchableOpacity style={styles.botaoExcluir} onPress={handleExcluir}>
        <Text style={styles.textoBotaoExcluir}>Excluir Doação</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 2,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginTop: 12,
  },
  valor: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 4,
  },
  botaoExcluir: {
    backgroundColor: '#d32f2f',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotaoExcluir: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});