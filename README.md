# Instituto Mão Amiga

Aplicativo para gerenciamento de pontos de coleta e doações do Instituto Mão Amiga.

## Tecnologias utilizadas

- React Native
- Expo
- Java 17
- Spring Boot
- Spring Data JPA
- H2 Database
- AsyncStorage

## Como executar o projeto

### 1. Executar a API

Abra um terminal e execute:

```powershell
cd api
.\mvnw.cmd spring-boot:run
```

A API será executada na porta 8080.

### 2. Configurar o endereço da API

Confira o arquivo `src/services/api.js`.

A variável `API_URL` deve apontar para o endereço da máquina que está executando a API:

- Expo Web: pode utilizar `http://localhost:8080/api/v1`.
- Celular com Expo Go: utilize o IP local do computador, por exemplo `http://192.168.1.10:8080/api/v1`.

### 3. Executar o aplicativo

Em outro terminal, na pasta principal:

```powershell
npm install
npx.cmd expo start
```

Para executar no navegador:

```powershell
npx.cmd expo start --web
```

## Funcionalidades

### Pontos de coleta

- Listagem e busca de pontos.
- Cadastro de pontos.
- Visualização dos detalhes.
- Edição e exclusão de pontos.
- Paginação e filtragem pela API.
- Favoritar e desfavoritar pontos.
- Tela Meus Pontos para consultar os favoritos.

### Doações

- Cadastro de doações.
- Histórico de doações.
- Edição de doações.
- Exclusão de doações.

## Favoritos

Os favoritos são armazenados localmente com AsyncStorage. O aplicativo salva somente os IDs dos pontos favoritos.

Ao abrir a tela Meus Pontos, o aplicativo consulta a API para buscar os dados atualizados de cada ponto. Se um ponto tiver sido excluído, ele deixa de aparecer na lista de favoritos.

Essa decisão permite manter os favoritos no dispositivo sem precisar criar uma tabela adicional no banco de dados.

Os pontos e as doações continuam sendo gerenciados pela API.

## Roteiro de demonstração

Tempo máximo sugerido: 3 minutos.

1. Abrir o aplicativo e pesquisar um ponto de coleta.
2. Cadastrar um ponto e demonstrar sua edição e exclusão.
3. Favoritar um ponto e abrir a tela Meus Pontos.
4. Fechar e abrir novamente o aplicativo para demonstrar a persistência dos favoritos.
5. Remover um ponto dos favoritos.
6. Cadastrar uma doação e demonstrar sua edição e exclusão.
7. Demonstrar respostas de erro HTTP 400 e 404 da API.

## Documentação da API

A documentação das buscas, filtros e paginação da N2-2 está em `api/README.md`.
