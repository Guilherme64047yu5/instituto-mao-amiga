import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { estilos } from '../styles/estilos';
import { buscarPontoPorId } from '../services/pontosService';

const CHAVE_FAVORITOS = '@mao_amiga:pontos_favoritos';

export default function MeusPontosScreen({ navigation }) {
  const [pontos, setPontos] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const carregarPontos = useCallback(async () => {
    setCarregando(true);

    try {
      const dados = await AsyncStorage.getItem(CHAVE_FAVORITOS);
      const favoritos = dados ? JSON.parse(dados) : [];

      const resultados = await Promise.all(
        favoritos.map(async (id) => {
          try {
            return await buscarPontoPorId(id);
          } catch (error) {
            return null;
          }
        })
      );

      const encontrados = resultados.filter((ponto) => ponto !== null);
      setPontos(encontrados);

      const idsValidos = encontrados.map((ponto) => String(ponto.id));
      await AsyncStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(idsValidos));
    } catch (error) {
      setPontos([]);
    } finally {
      setCarregando(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarPontos();
    }, [carregarPontos])
  );

  async function removerFavorito(id) {
    const dados = await AsyncStorage.getItem(CHAVE_FAVORITOS);
    const favoritos = dados ? JSON.parse(dados) : [];
    const atualizados = favoritos.filter(
      (favorito) => String(favorito) !== String(id)
    );

    await AsyncStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(atualizados));
    setPontos((anteriores) =>
      anteriores.filter((ponto) => String(ponto.id) !== String(id))
    );
  }

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Meus Pontos</Text>

      {carregando && <ActivityIndicator size="large" />}

      <FlatList
        data={pontos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={[estilos.card, { flexDirection: 'row', alignItems: 'center' }]}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => navigation.navigate('DetalhePonto', { ponto: item })}
            >
              <Text style={estilos.nomePonto}>{item.nome}</Text>
              <Text style={estilos.textoDetalhe}>{item.endereco}</Text>
              <Text style={estilos.textoDetalhe}>{item.bairro}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => removerFavorito(item.id)}
              style={{
                minWidth: 48,
                minHeight: 48,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 30, color: '#c2185b' }}>♥</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          !carregando ? (
            <Text>Você ainda não tem pontos favoritos.</Text>
          ) : null
        }
      />
    </View>
  );
}
