Objetivo

Neste desafio você deve criar e publicar uma imagem Docker que execute uma aplicação desenvolvida em Go. O foco é eficiência e otimização: aplique técnicas de construção de imagem para garantir que o tamanho final seja extremamente reduzido.

Comportamento esperado

Ao executar o container baseado na sua imagem publicada no Docker Hub, o terminal deverá exibir exatamente a mensagem:

Full Cycle Rocks!!

Dica: consulte o site oficial da Go para um exemplo de "Olá Mundo".

Exemplo de execução (CLI)

O avaliador rodará o comando:

```
docker run nome-da-imagem
```

Requisitos técnicos

- **Linguagem:** A aplicação deve ser desenvolvida em Go.
- **Tamanho da imagem:** A imagem final publicada deve ter menos de 2MB.
  - Dica: a imagem oficial do Go pode ser grande demais. Pesquise técnicas de otimização de imagens Docker e imagens base leves para reduzir o tamanho.
- **Publicação:** A imagem deve estar publicada e pública no Docker Hub.

Tecnologias obrigatórias

- **Linguagem:** Go
- **Containerização:** Docker
- **Registry:** Docker Hub

Estrutura sugerida do projeto

```
├── Dockerfile        # Configuração da imagem
├── main.go           # Código-fonte da aplicação em Go
├── go.mod            # Gerenciador de dependências (se necessário)
└── README.md         # Instruções e link da imagem
```

Entregável

- **Link do repositório:** Link para o repositório público (GitHub, GitLab, etc.) contendo o código-fonte e o Dockerfile.
- **README com instruções:** O arquivo README.md deve conter obrigatoriamente:
  - O link direto para a sua imagem no Docker Hub.
  - O comando exato para baixar e rodar a imagem (ex.: `docker run seu-usuario/fullcycle`).

Regras de entrega

- **Repositório único:** Entregue apenas um projeto por repositório.
- **Branch principal:** Todo o código deve estar na branch `main`.
- **Documentação:** Garanta que o `README.md` esteja na raiz do projeto e contenha todas as informações do item "Entregável".
