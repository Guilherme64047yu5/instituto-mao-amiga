
# API - Instituto Mão Amiga

## N2-2 - Busca de pontos com paginação

A API permite listar os pontos de coleta com filtros, paginação e ordenação.

### 1. Listar pontos sem filtro

**Requisição:**

GET http://localhost:8080/api/v1/pontos/filtro?page=0&size=10

**Resultado:**

- 10 pontos retornados na primeira página.
- Total de 25 pontos cadastrados.
- Total de 3 páginas.
- Ordenação padrão pelo nome.

### 2. Buscar pontos por bairro

**Requisição:**

GET http://localhost:8080/api/v1/pontos/filtro?filtro=Jardim%20Am%C3%A9rica&page=0&size=10

**Resultado:**

- 1 ponto encontrado.
- Nome: Associação Mãos Unidas.
- Bairro: Jardim América.
- Total de 1 página.

### 3. Consultar a segunda página

**Requisição:**

GET http://localhost:8080/api/v1/pontos/filtro?page=1&size=10

**Resultado:**

- 10 pontos retornados.
- Página atual: 1.
- Total de 25 pontos.
- Total de 3 páginas.

### Tecnologias utilizadas

- Java 17
- Spring Boot
- Spring Data JPA
- H2 Database
- Swagger
