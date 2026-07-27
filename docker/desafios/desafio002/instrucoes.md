Título: Nginx como Proxy Reverso com Node.js

Objetivo

Neste desafio você deve criar uma aplicação usando Docker que simule um ambiente real de desenvolvimento. O objetivo principal é configurar o Nginx como Proxy Reverso para receber requisições e encaminhá-las a uma aplicação Node.js, que fará a persistência de dados em um banco MySQL.

Tecnologias obrigatórias

- **Linguagem:** Node.js (JavaScript)
- **Servidor Web/Proxy:** Nginx
- **Banco de Dados:** MySQL
- **Orquestração:** Docker & Docker Compose

Requisitos e comportamento

Fluxo da aplicação

1. O usuário acessa o Nginx (na porta 8080).
2. O Nginx, atuando como Proxy Reverso, encaminha a chamada para a aplicação Node.js.
3. A aplicação Node.js conecta-se ao banco de dados MySQL.

Regras de negócio

- Sempre que o usuário acessar o Nginx, a aplicação Node.js deve inserir um registro (um nome qualquer) na tabela `people` do banco de dados.
- A resposta da aplicação deve devolver uma página HTML contendo:
  - O título: `<h1>Full Cycle Rocks!</h1>`
  - A lista de nomes já cadastrados no banco de dados.

Ambiente Docker

- A aplicação deve subir e funcionar com um único comando: `docker compose up` (ou `docker-compose up -d`).
- Não deve ser necessário executar scripts manuais de instalação de dependências (ex.: `npm install`) ou criar tabelas no banco fora do Docker.
- É obrigatório o uso de volumes para a aplicação Node.js, garantindo que o ambiente de desenvolvimento esteja mapeado corretamente.

Exemplo de retorno (browser)

Ao acessar `http://localhost:8080`, a página deve exibir algo como:

```
<h1>Full Cycle Rocks!</h1>

- Wescley
- Luiz
- (Outros nomes cadastrados...)
```

Estrutura obrigatória do projeto

```
├── docker-compose.yml   # Orquestração dos containers
├── node/
│   ├── index.js         # Aplicação Node.js
│   ├── Dockerfile       # Imagem da aplicação
│   └── package.json     # Dependências
├── nginx/
│   ├── nginx.conf       # Configuração do Proxy Reverso
│   └── Dockerfile       # (Opcional, caso personalize a imagem)
└── README.md            # Instruções de execução
```

Ordem de execução

O avaliador deve ser capaz de rodar o projeto executando apenas o comando `docker compose up` e tudo deverá funcionar sem comandos adicionais. Após a execução, a aplicação deve estar disponível em `http://localhost:8080`.

Entregável

- Link para o repositório público (GitHub, GitLab ou Bitbucket).
- O repositório deve conter o `README.md` com as instruções.
- Todo o código deve estar na branch `main`.
