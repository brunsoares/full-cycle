# Desafio DDD - Repositorio de ordens

Implementacao do desafio do curso Full Cycle sobre persistencia de ordens usando TypeScript, Sequelize e `sequelize-typescript`.

O foco principal deste desafio foi completar o caso de testes e o repositorio de ordens:

- `src/infrastructure/order/repository/sequilize/order.repository.spec.ts`
- `src/infrastructure/order/repository/sequilize/order.repository.ts`

## Objetivo

Persistir o agregado `Order` do dominio em um banco relacional, mantendo a separacao entre:

- **Dominio:** entidades `Order` e `OrderItem`, que definem as regras e calculam o total da ordem.
- **Infraestrutura:** modelos Sequelize e `OrderRepository`, responsaveis por converter os objetos de dominio para registros persistidos e vice-versa.

## O que foi implementado

### `OrderRepository`

O repositorio implementa as operacoes de persistencia da ordem:

- `create`: cria a ordem e seus itens usando o recurso `include` do Sequelize;
- `update`: atualiza os dados da ordem, remove os itens antigos e recria os itens atuais;
- `find`: busca uma ordem pelo identificador, incluindo seus itens, e devolve uma nova entidade `Order`;
- `findAll`: busca todas as ordens com seus itens e reconstrói as entidades de dominio.

## Testes em `OrderRepositorySpec`

Os testes do repositorio usam Sequelize com o dialeto SQLite e banco em memoria. Antes de cada teste, os modelos sao registrados e o schema e recriado. Depois de cada teste, a conexao e encerrada.

A suite verifica:

1. Criacao de uma nova ordem com seus itens.
2. Atualizacao da ordem com a inclusao de novos itens.
3. Busca de uma ordem por `id`.
4. Busca de todas as ordens.

## Pre-requisitos

- Node.js instalado;
- npm instalado.

## Instalacao

Na pasta do projeto, execute:

```bash
npm install
```

## Execucao dos testes

Para executar o typecheck e todos os testes:

```bash
npm test
```

Esse comando executa primeiro `tsc --noEmit` e, se nao houver erros de TypeScript, executa o Jest.

Para executar somente o compilador TypeScript:

```bash
npm run tsc -- --noEmit
```

Para executar diretamente a suite do Jest:

```bash
npx jest
```

## Tecnologias

- TypeScript
- Jest
- Sequelize
- sequelize-typescript
- SQLite
