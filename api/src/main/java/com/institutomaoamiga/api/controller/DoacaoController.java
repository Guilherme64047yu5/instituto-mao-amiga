package com.institutomaoamiga.api.controller;

import com.institutomaoamiga.api.dto.DoacaoRequestDTO;
import com.institutomaoamiga.api.dto.DoacaoResponseDTO;
import com.institutomaoamiga.api.entity.Doacao;
import com.institutomaoamiga.api.service.DoacaoService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/doacoes")
@CrossOrigin(origins = "*")
public class DoacaoController {

    private final DoacaoService service;

    public DoacaoController(DoacaoService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public DoacaoResponseDTO criar(@Valid @RequestBody DoacaoRequestDTO dto) {
        return converter(service.cadastrar(dto));
    }

    @GetMapping("/filtro")
    public Page<DoacaoResponseDTO> listar(
            @RequestParam(required = false) String filtro,
            @PageableDefault(size = 10, sort = "criadoEm", direction = Sort.Direction.DESC)
            Pageable pageable) {

        return service.listar(filtro, pageable).map(this::converter);
    }

    @GetMapping("/{id}")
    public DoacaoResponseDTO buscarPorId(@PathVariable UUID id) {
        return converter(service.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public DoacaoResponseDTO atualizar(
            @PathVariable UUID id,
            @Valid @RequestBody DoacaoRequestDTO dto) {
        return converter(service.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable UUID id) {
        service.excluir(id);
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
