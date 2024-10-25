# Chat em Tempo Real

Este projeto implementa um aplicativo de chat em tempo real usando Node.JS/TS com Express, MongoDB e Socket.IO.

## Objetivo

Criar um sistema de chat que permita aos usuários:

* Cadastrar-se e fazer login.
* Trocar mensagens em tempo real.
* Ver o status online/offline dos usuários.
* Persistir as mensagens no banco de dados.

## Tecnologias Utilizadas

* **Backend:** Node.js, TypeScript, Express, Mongoose, Passport.js, bcryptjs, jsonwebtoken, Socket.IO.
* **Banco de Dados:** MongoDB.
* **Frontend:** (Ainda em desenvolvimento - React/Next.js).

## Arquitetura

O backend do projeto segue uma arquitetura baseada em camadas, com separação de responsabilidades:

* **`src/server.ts` (Servidor principal):** Ponto de entrada da aplicação. Configura o servidor Express, os middlewares e registra os roteadores.
* **`src/routes/*` (Roteadores):** Definem as rotas da API e chamam os controllers correspondentes.  Agrupam rotas relacionadas por funcionalidade (ex: autenticação).
* **`src/controllers/*` (Controllers):** Contém a lógica de negócio das rotas.  Recebem as requisições, validam os dados, interagem com os models e retornam as respostas.
* **`src/models/*` (Models):**  Representam as entidades da aplicação (ex: usuário, mensagem) e definem como os dados são armazenados no banco de dados.
* **`dist/*` (Build):** Contém os arquivos JavaScript transpilados pelo TypeScript, que são usados em produção.


## Como Executar

**(Instruções de execução)**


## Próximos Passos

* (Próximos passos)


## Contribuições

Contribuições são bem-vindas!  Sinta-se à vontade para abrir issues e pull requests.