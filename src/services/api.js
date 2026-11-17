const API_URL = 'http://192.168.101.8:8080/api/v1';

export async function requisicao(url, opcoes = {}) {
  const resposta = await fetch(`${API_URL}${url}`, {
    ...opcoes,
    headers: {
      'Content-Type': 'application/json',
      ...opcoes.headers,
    },
  });

  const texto = await resposta.text();
  const dados = texto ? JSON.parse(texto) : null;

  if (!resposta.ok) {
    throw new Error(dados?.mensagem || dados?.message || 'Não foi possível realizar a operação.');
  }

  return dados;
}