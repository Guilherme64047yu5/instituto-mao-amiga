package com.institutomaoamiga.api.repository;

import com.institutomaoamiga.api.entity.Ponto;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface PontoRepository extends JpaRepository<Ponto, UUID> {
}
