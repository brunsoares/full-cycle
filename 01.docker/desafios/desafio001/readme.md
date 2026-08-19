# Desafio 001 - Docker

Este projeto demonstra como construir e executar uma aplicação simples em Go usando Docker, com foco em uma imagem final otimizada.

## Objetivo

Criar uma imagem Docker enxuta para uma aplicação que imprime uma mensagem no terminal.

## Como usar o Dockerfile

### 1. Construir a imagem

No diretório do projeto, execute:

```yml
docker build usuario/golang-custom
```

### 2. Executar o container

Depois da build, rode:

```yml
docker run usuario/golang-custom
```

## Explicação do `main.go`

O arquivo `main.go` é o ponto de entrada da aplicação. Ele contém a função `main()`, que é executada quando o programa inicia.
Exemplo esperado:

```go
package main

import "fmt"

func main() {
	fmt.Println("Full Cycle Rocks!!")
}
```

Nesse código:

- `package main` define que este arquivo faz parte de uma aplicação executável;
- `func main()` é a função principal;
- `fmt.Println(...)` imprime a mensagem no terminal.

## Resultado esperado

Ao executar o container, a saída deve ser:

```bash
Full Cycle Rocks!!
```

Se a mensagem aparecer, significa que a imagem foi criada corretamente e que o container está executando o binário como esperado.

## Otimização da imagem Docker

A otimização aplicada neste desafio é o uso de **multi-stage build**.

### O que isso resolve

Normalmente, uma imagem com Go pode ficar maior do que o necessário porque inclui ferramentas de compilação, dependências de build e arquivos temporários. Com multi-stage build, a compilação acontece em uma etapa separada e a imagem final recebe apenas o binário pronto.

### Benefícios

- reduz o tamanho final da imagem;
- diminui o tempo de download e deploy;
- reduz a superfície de ataque;
- mantém a imagem de produção mais limpa.

### Estratégia usada na otimização

Uma configuração comum para esse tipo de projeto é:

- usar uma imagem com Go na etapa de build;
- copiar apenas o binário para uma imagem final mínima, como `scratch`;
- evitar instalar pacotes desnecessários na imagem final.

### Exemplo conceitual

1. A primeira etapa compila a aplicação.
2. A segunda etapa copia somente o executável.
3. O container final executa apenas o necessário para rodar o programa.

Essa abordagem é ideal para aplicações pequenas e previsíveis, como este desafio.

## Informações úteis

DockerHub: https://hub.docker.com/repository/docker/brunsoares/golang-custom/general

Comando para executar a imagem:

```yml
docker run brunsoares/golang-custom
```
