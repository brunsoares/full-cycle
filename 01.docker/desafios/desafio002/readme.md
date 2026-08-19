# Desafio 002: Nginx Proxy Reverso + Node.js + MySQL

## 📋 Descrição

Aplicação que demonstra a integração entre:

- **Nginx**: Proxy reverso que recebe requisições na porta 8080
- **Node.js**: API que processa requisições e gerencia dados
- **MySQL**: Banco de dados para persistência de nomes cadastrados

## 🔄 Fluxo de Funcionamento

```
Usuário (localhost:8080)
         ↓
    Nginx (Proxy Reverso)
         ↓
   Node.js API (porta 3000)
         ↓
   MySQL Database
```

### O que acontece:

1. Acesso a `http://localhost:8080`
2. Nginx recebe a requisição e encaminha para Node.js
3. Node.js insere um nome na tabela `people` do MySQL
4. Retorna página HTML com:
   - Título: **Full Cycle Rocks!**
   - Lista de nomes cadastrados no banco

## 🚀 Como Executar

Execute o comando abaixo e a aplicação estará pronta:

```bash
docker-compose up
```

Acesse: **http://localhost:8080**

## 📁 Estrutura do Projeto

```
desafio002/
├── docker-compose.yml    # Orquestração dos containers
├── node/
│   ├── index.js          # API Node.js
│   ├── Dockerfile        # Imagem Node
│   └── package.json      # Dependências
├── nginx/
│   └── nginx.conf        # Configuração do proxy reverso
└── README.md             # Este arquivo
```

## 🛑 Parar a Aplicação

```bash
docker-compose down
```

---

**Stack:** Node.js | Nginx | MySQL | Docker Compose
