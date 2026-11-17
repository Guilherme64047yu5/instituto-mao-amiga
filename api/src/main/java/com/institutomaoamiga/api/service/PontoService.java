package com.institutomaoamiga.api.service;

import com.institutomaoamiga.api.dto.PontoRequestDTO;
import com.institutomaoamiga.api.dto.PontoResponseDTO;
import com.institutomaoamiga.api.entity.Ponto;
import com.institutomaoamiga.api.repository.PontoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
public class PontoService {

    private final PontoRepository repository;

    public PontoService(PontoRepository repository) {
        this.repository = repository;
    }

    public List<PontoResponseDTO> listarTodos() {
        return repository.findAll()
                .stream()
                .map(PontoResponseDTO::fromEntity)
                .toList();
    }

    public PontoResponseDTO buscarPorId(UUID id) {
        Ponto ponto = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Ponto não encontrado"
                ));

        return PontoResponseDTO.fromEntity(ponto);
    }

    public PontoResponseDTO cadastrar(PontoRequestDTO dados) {
        Ponto ponto = new Ponto(
                dados.nome(),
                dados.endereco(),
                dados.bairro(),
                dados.horario(),
                dados.tipo()
        );

        return PontoResponseDTO.fromEntity(repository.save(ponto));
    }

    public PontoResponseDTO atualizar(UUID id, PontoRequestDTO dados) {
        Ponto ponto = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Ponto não encontrado"
                ));

        ponto.setNome(dados.nome());
        ponto.setEndereco(dados.endereco());
        ponto.setBairro(dados.bairro());
        ponto.setHorario(dados.horario());
        ponto.setTipo(dados.tipo());

        return PontoResponseDTO.fromEntity(repository.save(ponto));
    }

    public void excluir(UUID id) {
        Ponto ponto = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Ponto não encontrado"
                ));

        repository.delete(ponto);
    }
}
