package com.institutomaoamiga.api.controller;

import com.institutomaoamiga.api.dto.PontoRequestDTO;
import com.institutomaoamiga.api.dto.PontoResponseDTO;
import com.institutomaoamiga.api.service.PontoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/pontos")
public class PontoController {

    private final PontoService service;

    public PontoController(PontoService service) {
        this.service = service;
    }

    @GetMapping
    public List<PontoResponseDTO> listarTodos() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public PontoResponseDTO buscarPorId(@PathVariable UUID id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PontoResponseDTO cadastrar(@Valid @RequestBody PontoRequestDTO dados) {
        return service.cadastrar(dados);
    }

    @PutMapping("/{id}")
    public PontoResponseDTO atualizar(
            @PathVariable UUID id,
            @Valid @RequestBody PontoRequestDTO dados) {
        return service.atualizar(id, dados);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable UUID id) {
        service.excluir(id);
    }
}
