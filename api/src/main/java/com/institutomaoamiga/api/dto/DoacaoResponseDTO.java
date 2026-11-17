package com.institutomaoamiga.api.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public class DoacaoResponseDTO {

    private UUID id;
    private String tipoItem;
    private Integer quantidade;
    private String pontoDestino;
    private LocalDateTime criadoEm;

    public DoacaoResponseDTO(UUID id, String tipoItem, Integer quantidade, String pontoDestino, LocalDateTime criadoEm) {
        this.id = id;
        this.tipoItem = tipoItem;
        this.quantidade = quantidade;
        this.pontoDestino = pontoDestino;
        this.criadoEm = criadoEm;
    }

    public UUID getId() {
        return id;
    }

    public String getTipoItem() {
        return tipoItem;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public String getPontoDestino() {
        return pontoDestino;
    }

    public LocalDateTime getCriadoEm() {
        return criadoEm;
    }
}
