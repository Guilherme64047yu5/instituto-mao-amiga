import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { estilos } from '../styles/estilos';
import { cadastrarPonto, atualizarPonto } from '../services/pontosService';

export default function CadastroPontoScreen({ navigation, route }) {
  const ponto = route.params?.ponto;
  const editando = !!ponto;

  const [nome, setNome] = useState(ponto?.nome || '');
  const [endereco, setEndereco] = useState(ponto?.endereco || '');
  const [bairro, setBairro] = useState(ponto?.bairro || '');
  const [horario, setHorario] = useState(ponto?.horario || '');
  const [tipo, setTipo] = useState(ponto?.tipo || 'coleta');
  const [salvando, setSalvando] = useState(false);

  async function salvar() {
    if (!nome.trim() || !endereco.trim() || !bairro.trim() || !horario.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    const dados = {
      nome: nome.trim(),
      endereco: endereco.trim(),
      bairro: bairro.trim(),
      horario: horario.trim(),
      tipo,
    };

    try {
      setSalvando(true);

      if (editando) {
        await atualizarPonto(ponto.id, dados);
      } else {
        await cadastrarPonto(dados);
      }

      Alert.alert('Sucesso', editando ? 'Ponto atualizado!' : 'Ponto cadastrado!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', error.message || 'Não foi possível salvar o ponto.');
    } finally {
      setSalvando(false);
    }
  }

  return (
    <ScrollView style={estilos.container}>
      <Text style={estilos.titulo}>
        {editando ? 'Editar Ponto' : 'Cadastrar Ponto'}
      </Text>

      <Text style={estilos.nomePonto}>Nome</Text>
      <TextInput
        style={estilos.input}
        placeholder="Nome do ponto"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={estilos.nomePonto}>Endereço</Text>
      <TextInput
        style={estilos.input}
        placeholder="Endereço"
        value={endereco}
        onChangeText={setEndereco}
      />

      <Text style={estilos.nomePonto}>Bairro</Text>
      <TextInput
        style={estilos.input}
        placeholder="Bairro"
        value={bairro}
        onChangeText={setBairro}
      />

      <Text style={estilos.nomePonto}>Dias e horários</Text>
      <TextInput
        style={estilos.input}
        placeholder="Ex.: Seg a Sex, 8h às 17h"
        value={horario}
        onChangeText={setHorario}
      />

      <Text style={estilos.nomePonto}>Tipo do ponto</Text>

      <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
        <TouchableOpacity
          style={[
            estilos.botao,
            { flex: 1, backgroundColor: tipo === 'coleta' ? '#1976d2' : '#888' },
          ]}
          onPress={() => setTipo('coleta')}
        >
          <Text style={estilos.textoBotao}>Coleta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            estilos.botao,
            { flex: 1, backgroundColor: tipo === 'distribuição' ? '#1976d2' : '#888' },
          ]}
          onPress={() => setTipo('distribuição')}
        >
          <Text style={estilos.textoBotao}>Distribuição</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={estilos.botao}
        onPress={salvar}
        disabled={salvando}
      >
        <Text style={estilos.textoBotao}>
          {salvando ? 'Salvando...' : editando ? 'Salvar alterações' : 'Cadastrar ponto'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}