import React, { useState, useCallback, useMemo } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView,
  TextInput 
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
  const [busca, setBusca] = useState('');

  useFocusEffect(
    useCallback(() => {
      carregarHistorico();
    }, [])
  );

  const carregarHistorico = async () => {
    const dados = await listarDoacoes();
    setDoacoes(dados);
  };

  // Cálculo dos totais por tipo de item (ordenados do maior para o menor)
  const resumoTotais = useMemo(() => {
    const mapa = {};
    doacoes.forEach((item) => {
      const tipo = item.tipoItem.trim() || 'Outros';
      const qtd = Number(item.quantidade) || 0;
      if (!mapa[tipo]) {
        mapa[tipo] = { totalQtd: 0, totalDoacoes: 0 };
      }
      mapa[tipo].totalQtd += qtd;
      mapa[tipo].totalDoacoes += 1;
    });

    return Object.keys(mapa)
      .map((tipo) => ({
        tipoItem: tipo,
        totalQtd: mapa[tipo].totalQtd,
        totalDoacoes: mapa[tipo].totalDoacoes,
      }))
      .sort((a, b) => b.totalQtd - a.totalQtd);
  }, [doacoes]);

  const doacoesFiltradas = doacoes.filter((item) =>
    item.tipoItem.toLowerCase().includes(busca.toLowerCase()) ||
    (item.pontoDestino && item.pontoDestino.toLowerCase().includes(busca.toLowerCase()))
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.tituloHeader}>Histórico de Doações</Text>

      {/* Bloco de Resumo com Totais */}
      {resumoTotais.length > 0 && (
        <View style={styles.resumoContainer}>
          <Text style={styles.resumoTitulo}>Resumo por Tipo de Item</Text>
          {resumoTotais.map((resumo, index) => (
            <Text key={index} style={styles.resumoTexto}>
              • <Text style={styles.bold}>{resumo.tipoItem}</Text>: {resumo.totalQtd} unidade(s) em {resumo.totalDoacoes} doação(ões)
            </Text>
          ))}
        </View>
      )}

      <TextInput
        style={styles.searchInput}
        placeholder="Filtrar por item ou destino..."
        value={busca}
        onChangeText={setBusca}
      />

      <FlatList
        data={doacoesFiltradas}
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
            <Text style={styles.vazioTexto}>
              {doacoes.length === 0 ? 'Ainda não há doações registadas.' : 'Nenhuma doação encontrada.'}
            </Text>
            {doacoes.length === 0 && (
              <TouchableOpacity 
                style={styles.botaoVazio} 
                onPress={() => navigation.navigate('CadastroDoacao')}
              >
                <Text style={styles.botaoVazioTexto}>Registar Primeira Doação</Text>
              </TouchableOpacity>
            )}
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
    marginVertical: 12,
  },
  resumoContainer: {
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#90caf9',
  },
  resumoTitulo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0d47a1',
    marginBottom: 6,
  },
  resumoTexto: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    fontSize: 16,
  },
  listaContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
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
    marginTop: 30,
  },
  vazioTexto: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
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