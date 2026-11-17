package com.institutomaoamiga.api.service;

import com.institutomaoamiga.api.dto.DoacaoRequestDTO;
import com.institutomaoamiga.api.entity.Doacao;
import com.institutomaoamiga.api.repository.DoacaoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class DoacaoService {

    private final DoacaoRepository repository;

    public DoacaoService(DoacaoRepository repository) {
        this.repository = repository;
    }

    public Page<Doacao> listar(String filtro, Pageable pageable) {
        if (filtro != null && !filtro.isBlank()) {
            return repository.findByTipoItemContainingIgnoreCase(filtro, pageable);
        }

        return repository.findAll(pageable);
    }

    public Doacao buscarPorId(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Doação não encontrada"));
    }

    public Doacao cadastrar(DoacaoRequestDTO dto) {
        Doacao doacao = new Doacao();
        preencherDados(doacao, dto);
        doacao.setCriadoEm(LocalDateTime.now());

        return repository.save(doacao);
    }

    public Doacao atualizar(UUID id, DoacaoRequestDTO dto) {
        Doacao doacao = buscarPorId(id);
        preencherDados(doacao, dto);

        return repository.save(doacao);
    }

    public void excluir(UUID id) {
        Doacao doacao = buscarPorId(id);
        repository.delete(doacao);
    }

    private void preencherDados(Doacao doacao, DoacaoRequestDTO dto) {
        doacao.setTipoItem(dto.getTipoItem());
        doacao.setQuantidade(dto.getQuantidade());
        doacao.setPontoDestino(dto.getPontoDestino());
    }
}
