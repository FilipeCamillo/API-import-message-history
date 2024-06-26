# Gerenciamento de Mensagens API

Esta API oferece funcionalidades de gerenciamento de mensagens para empresas, permitindo interagir com contatos, tickets e mensagens associados a uma empresa específica. Ela é construída com Node.js, utiliza um banco de dados PostgreSQL para armazenar dados e é baseada no framework Express.js para a criação de rotas.

## Recursos Principais

- **Obter Dados da Empresa:** Obtenha informações detalhadas sobre uma empresa com base em seu ID e token de autenticação.

- **Obter Tickets de Rastreamento:** Recupere tickets de rastreamento associados a uma empresa específica, com suporte a paginação.

- **Obter Tickets de Suporte:** Recupere tickets de suporte associados a uma empresa específica, com suporte a paginação.

- **Obter Usuários:** Recupere informações sobre usuários associados a uma empresa específica, com suporte a paginação.

- **Obter Tags do Kanban:** Recupere tags do Kanban associadas a uma empresa específica, com suporte a paginação.

- **Obter Avaliações de Usuários:** Recupere avaliações de usuários associadas a uma empresa específica, com suporte a paginação.

- **Obter Contatos:** Recupere informações de contatos associados a uma empresa específica, com suporte a paginação.

- **Inserir Mensagem:** Insira mensagens no sistema, associando-as a contatos e tickets, verificando a validade do token e criando novos tickets, se necessário.

## Tecnologias Utilizadas

- Node.js
- PostgreSQL (Banco de Dados)
- Express.js (Framework para a criação de rotas)
- UUID (Para geração de UUIDs únicos)
- Body-parser (Para análise de dados JSON)

## Como Utilizar

1. `su deploy`
2. `git clone https://github.com/FilipeCamillo/API-import-message-history.git`
3. Configure as variáveis de ambiente com as informações do banco de dados no arquivo `.env`.
4. Instale as dependências com `npm install` ou `yarn install`.
5. Inicie a aplicação com `npm start` ou `yarn start`.
6. `npm install pm2 -g`
7. `pm2 start app.js --name "APIs"`
8. `sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u deploy --hp /home/deploy`
9. `pm2 save`

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues, propor novos recursos e enviar pull requests.

## Licença

Este projeto é licenciado sob a [Licença MIT](./LICENSE).

