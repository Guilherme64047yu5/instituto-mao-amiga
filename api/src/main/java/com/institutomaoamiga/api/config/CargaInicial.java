
package com.institutomaoamiga.api.config;

import com.institutomaoamiga.api.entity.Ponto;
import com.institutomaoamiga.api.repository.PontoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class CargaInicial {

    @Bean
    CommandLineRunner carregarPontos(PontoRepository repository) {
        return args -> {

            if (repository.count() > 0) {
                return;
            }

            List<Ponto> pontos = List.of(
                new Ponto("Centro Comunitário Esperança", "Rua das Flores, 120", "Centro", "Seg a Sex, 8h às 17h", "coleta"),
                new Ponto("Instituto Mão Amiga", "Avenida Goiás, 500", "Centro", "Seg a Sex, 8h às 18h", "coleta"),
                new Ponto("Ponto Solidário Campinas", "Rua Benjamin Constant, 80", "Campinas", "Seg a Sex, 9h às 17h", "coleta"),
                new Ponto("Casa da Solidariedade", "Rua 10, 250", "Setor Oeste", "Seg a Sex, 8h às 17h", "distribuição"),
                new Ponto("Projeto Novo Caminho", "Avenida 85, 900", "Setor Marista", "Seg a Sex, 9h às 16h", "coleta"),
                new Ponto("Centro Social Vila Nova", "Rua 228, 45", "Vila Nova", "Seg a Sex, 8h às 17h", "coleta"),
                new Ponto("Associação Mãos Unidas", "Rua C-148, 200", "Jardim América", "Seg a Sex, 8h às 17h", "distribuição"),
                new Ponto("Espaço Cidadania", "Avenida T-9, 1200", "Setor Bueno", "Seg a Sex, 9h às 18h", "coleta"),
                new Ponto("Centro de Apoio Social", "Rua 44, 300", "Setor Norte Ferroviário", "Seg a Sex, 8h às 17h", "coleta"),
                new Ponto("Projeto Recomeçar", "Rua 3, 150", "Setor Central", "Seg a Sex, 8h às 16h", "distribuição"),
                new Ponto("Ponto Solidário Universitário", "Avenida Universitária, 600", "Setor Universitário", "Seg a Sex, 8h às 17h", "coleta"),
                new Ponto("Centro Comunitário Leste", "Rua 205, 90", "Leste Universitário", "Seg a Sex, 9h às 17h", "coleta"),
                new Ponto("Associação Vida Nova", "Rua JC-10, 75", "Jardim Curitiba", "Seg a Sex, 8h às 17h", "distribuição"),
                new Ponto("Projeto Bem Viver", "Avenida Rio Verde, 400", "Vila Rosa", "Seg a Sex, 8h às 18h", "coleta"),
                new Ponto("Centro de Apoio Familiar", "Rua 104, 220", "Setor Sul", "Seg a Sex, 8h às 17h", "distribuição"),
                new Ponto("Casa do Bem", "Rua 90, 310", "Setor Sul", "Seg a Sex, 9h às 17h", "coleta"),
                new Ponto("Ponto Solidário Finsocial", "Rua VF-15, 100", "Finsocial", "Seg a Sex, 8h às 17h", "coleta"),
                new Ponto("Instituto Caminhos", "Avenida Anhanguera, 1500", "Setor dos Funcionários", "Seg a Sex, 8h às 17h", "distribuição"),
                new Ponto("Centro Social Novo Mundo", "Rua do Comércio, 200", "Jardim Novo Mundo", "Seg a Sex, 8h às 17h", "coleta"),
                new Ponto("Associação Esperança", "Rua 8, 350", "Setor Pedro Ludovico", "Seg a Sex, 9h às 17h", "coleta"),
                new Ponto("Projeto União", "Rua das Acácias, 75", "Parque Amazônia", "Seg a Sex, 8h às 17h", "distribuição"),
                new Ponto("Centro Comunitário Norte", "Avenida Perimetral Norte, 500", "Vila João Vaz", "Seg a Sex, 8h às 17h", "coleta"),
                new Ponto("Ponto Solidário Garavelo", "Avenida Igualdade, 400", "Garavelo", "Seg a Sex, 8h às 17h", "coleta"),
                new Ponto("Casa de Apoio Esperança", "Rua 14, 180", "Setor Aeroporto", "Seg a Sex, 8h às 17h", "distribuição"),
                new Ponto("Centro de Doações Oeste", "Avenida Mutirão, 700", "Setor Marista", "Seg a Sex, 9h às 18h", "coleta")
            );

            repository.saveAll(pontos);
        };
    }
}
