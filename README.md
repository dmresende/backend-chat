# Chat em Tempo Real
Este projeto implementa um aplicativo de chat em tempo real usando Node.JS/TS com Express, MongoDB e Socket.IO.

## Objetivo
Criar um sistema de chat que permita aos usuários:

* Cadastrar-se e fazer login.
* Trocar mensagens em tempo real.
* Ver o status online/offline dos usuários.
* Persistir as mensagens no banco de dados.

## Tecnologias Utilizadas
* **Backend:** Node.js, Express, Mongoose, Passport.js, bcryptjs, jsonwebtoken, Socket.IO.
* **Banco de Dados:** MongoDB.
* **Frontend:** (Ainda em desenvolvimento - React/Next.js).

## Como Executar
**Clonar o repositório:**
```
git clone <https://github.com/dmresende/backend-chat.git>
```

1. Instalar as dependências (backend):
cd backend-chat 
npm install

2. Configurar o banco de dados:
* Crie um banco de dados MongoDB local ou use o MongoDB Atlas.
* Configure a string de conexão no arquivo index.ts

3. Executar o servidor:
`npm start`

4. Próximos Passos
* Implementar o frontend com React/Next.js.
* Adicionar recursos extras (ex: notificações, grupos de conversa).
* Implementar testes unitários e de integração.
* Dockerizar a aplicação (opcional).

### Contribuições
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.
