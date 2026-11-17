package com.institutomaoamiga.api.controller;

import com.institutomaoamiga.api.dto.DoacaoRequestDTO;
import com.institutomaoamiga.api.dto.DoacaoResponseDTO;
import com.institutomaoamiga.api.entity.Doacao;
import com.institutomaoamiga.api.repository.DoacaoRepository;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@RestController
@RequestMapping("/api/doacoes")
public class DoacaoController {

    private final DoacaoRepository repository;

    public DoacaoController(DoacaoRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public DoacaoResponseDTO criar(@Valid @RequestBody DoacaoRequestDTO dto) {
        Doacao doacao = new Doacao();
        doacao.setTipoItem(dto.getTipoItem());
        doacao.setQuantidade(dto.getQuantidade());
        doacao.setPontoDestino(dto.getPontoDestino());

        return converter(repository.save(doacao));
    }

    @GetMapping
    public Page<DoacaoResponseDTO> listar(
            @RequestParam(required = false) String tipoItem,
            @PageableDefault(size = 10, sort = "criadoEm", direction = Sort.Direction.DESC) Pageable pageable) {

        Page<Doacao> doacoes;

        if (tipoItem != null && !tipoItem.isBlank()) {
            doacoes = repository.findByTipoItemContainingIgnoreCase(tipoItem, pageable);
        } else {
            doacoes = repository.findAll(pageable);
        }

        return doacoes.map(this::converter);
    }

    @GetMapping("/{id}")
    public DoacaoResponseDTO buscarPorId(@PathVariable UUID id) {
        Doacao doacao = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Doação não encontrada"));

        return converter(doacao);
    }

    @PutMapping("/{id}")
    public DoacaoResponseDTO atualizar(@PathVariable UUID id, @Valid @RequestBody DoacaoRequestDTO dto) {
        Doacao doacao = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Doação não encontrada"));

        doacao.setTipoItem(dto.getTipoItem());
        doacao.setQuantidade(dto.getQuantidade());
        doacao.setPontoDestino(dto.getPontoDestino());

        return converter(repository.save(doacao));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable UUID id) {
        Doacao doacao = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Doação não encontrada"));

        repository.delete(doacao);
    }

    private DoacaoResponseDTO converter(Doacao doacao) {
        return new DoacaoResponseDTO(
                doacao.getId(),
                doacao.getTipoItem(),
                doacao.getQuantidade(),
                doacao.getPontoDestino(),
                doacao.getCriadoEm()
        );
    }
}
