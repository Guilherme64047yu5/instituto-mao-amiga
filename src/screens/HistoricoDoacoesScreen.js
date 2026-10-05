import React, { useState, useCallback } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { listarDoacoes } from '../services/doacoesStorage';

const ItemDoacao = React.memo(({ item, onPress }) => {
  const dataFormatada = new Date(item.criadoEm).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.cardTitulo}>{item.tipoItem}</Text>
      <Text style={styles.cardTexto}><Text style={styles.bold}>Quantidade:</Text> {item.quantidade}</Text>
      <Text style={styles.cardTexto}><Text style={styles.bold}>Destino:</Text> {item.pontoDestino || 'Não informado'}</Text>
      <Text style={styles.cardData}>Registado em: {dataFormatada}</Text>
    </TouchableOpacity>
  );
});

export default function HistoricoDoacoesScreen({ navigation }) {
  const [doacoes, setDoacoes] = useState([]);

  useFocusEffect(
    useCallback(() => {
      carregarHistorico();
    }, [])
  );

  const carregarHistorico = async () => {
    const dados = await listarDoacoes();
    setDoacoes(dados);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.tituloHeader}>Histórico de Doações</Text>

      <FlatList
        data={doacoes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItemDoacao 
            item={item} 
            onPress={() => navigation.navigate('DetalheDoacao', { doacao: item })}
          />
        )}
        contentContainerStyle={styles.listaContainer}
        ListEmptyComponent={
          <View style={styles.vazioContainer}>
            <Text style={styles.vazioTexto}>Ainda não há doações registadas.</Text>
            <TouchableOpacity 
              style={styles.botaoVazio} 
              onPress={() => navigation.navigate('CadastroDoacao')}
            >
              <Text style={styles.botaoVazioTexto}>Registar Primeira Doação</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tituloHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 16,
  },
  listaContainer: {
    padding: 16,
    flexGrow: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 2,
  },
  cardTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0066cc',
    marginBottom: 6,
  },
  cardTexto: {
    fontSize: 15,
    color: '#444',
    marginBottom: 4,
  },
  bold: {
    fontWeight: '600',
  },
  cardData: {
    fontSize: 12,
    color: '#888',
    marginTop: 8,
    textAlign: 'right',
  },
  vazioContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  vazioTexto: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  botaoVazio: {
    backgroundColor: '#0066cc',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  botaoVazioTexto: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});