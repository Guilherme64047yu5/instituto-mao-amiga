import { requisicao } from './api';

export function listarDoacoes(filtro = '', page = 0, size = 10) {
  const consulta = `?filtro=${encodeURIComponent(filtro)}&page=${page}&size=${size}`;
  return requisicao(`/doacoes/filtro${consulta}`);
}

export function buscarDoacaoPorId(id) {
  return requisicao(`/doacoes/${id}`);
}

export function cadastrarDoacao(doacao) {
  return requisicao('/doacoes', {
    method: 'POST',
    body: JSON.stringify(doacao),
  });
}

export function atualizarDoacao(id, doacao) {
  return requisicao(`/doacoes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(doacao),
  });
}

export function excluirDoacao(id) {
  return requisicao(`/doacoes/${id}`, {
    method: 'DELETE',
  });
}
