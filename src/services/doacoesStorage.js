import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_DOACOES = '@instituto_mao_amiga:doacoes';

export async function listarDoacoes() {
  try {
    const dados = await AsyncStorage.getItem(CHAVE_DOACOES);
    if (!dados) return [];
    return JSON.parse(dados);
  } catch (error) {
    console.log('Erro ao listar doações:', error);
    return [];
  }
}

export async function salvarDoacao(novaDoacao) {
  try {
    const doacoesAtuais = await listarDoacoes();
    
    const doacaoCompletada = {
      id: Date.now().toString(),
      tipoItem: novaDoacao.tipoItem,
      quantidade: novaDoacao.quantidade,
      pontoDestino: novaDoacao.pontoDestino || novaDoacao.destino || '',
      criadoEm: new Date().toISOString(),
    };

    const novasDoacoes = [doacaoCompletada, ...doacoesAtuais];
    await AsyncStorage.setItem(CHAVE_DOACOES, JSON.stringify(novasDoacoes));
    return doacaoCompletada;
  } catch (error) {
    console.log('Erro detalhado ao salvar doação:', error);
    throw error;
  }
}