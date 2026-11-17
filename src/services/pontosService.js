import { requisicao } from './api';

export function listarPontos(filtro = '') {
  const consulta = `?filtro=${encodeURIComponent(filtro)}&page=0&size=50`;
  return requisicao(`/pontos/filtro${consulta}`);
}

export function cadastrarPonto(ponto) {
  return requisicao('/pontos', {
    method: 'POST',
    body: JSON.stringify(ponto),
  });
}

export function atualizarPonto(id, ponto) {
  return requisicao(`/pontos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(ponto),
  });
}

export function excluirPonto(id) {
  return requisicao(`/pontos/${id}`, {
    method: 'DELETE',
  });
}
export function buscarPontoPorId(id) {
  return requisicao(`/pontos/${id}`);
}
