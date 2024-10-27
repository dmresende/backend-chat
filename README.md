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

**Clonar o repositório:**
```bash
git clone https://github.com/dmresende/backend-chat.git
```

**Instalar as dependências**
```
cd backend-chat
npm install
```

***Configurar o ambiente:***
- Crie um arquivo `.env` na raiz do projeto, com base no `.env.example`, e defina as seguintes variáveis de ambiente:
- PORT: A porta em que o servidor vai rodar (ex: 3000).
- MONGO_URI: A string de conexão com o seu banco de dados MongoDB (local ou Atlas).
- SECRET_KEY: Uma chave secreta forte e única para assinar os tokens JWT. Gere uma chave aleatória usando openssl rand -base64 32.

***Executar o servidor***
```
npm start
```

***Testar as rotas***
- Signup: Faça uma requisição `POST` para `/auth/signup` com os campos name, username, password e, opcionalmente, photo.
-Login: Faça uma requisição `POST` para `/auth/login` com os campos username e password. Se o login for bem-sucedido, você receberá um token JWT na resposta.



## Próximos Passos
* Implementar a lógica do chat com Socket.IO.
* Implementar um middleware para proteger as rotas que requerem autenticação, verificando o token JWT.
* Criar o frontend da aplicação (React/Next.js).
* Implementar testes (unitários e de integração).
* Dockerizar a aplicação (opcional).


## Contribuições

Contribuições são bem-vindas!  Sinta-se à vontade para abrir issues e pull requests.


**Observações:**

* Crie um arquivo `.env.example`  com as variáveis de ambiente,  mas sem os valores reais (para que você possa compartilhar no repositório sem expor suas credenciais).
