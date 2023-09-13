# Rotas da API de Gerenciamento de Mensagens

Este repositório contém as definições das rotas de uma API de gerenciamento de mensagens que permite interagir com contatos, tickets e mensagens associados a uma empresa específica. A API oferece funcionalidades de busca, inserção e rastreamento de mensagens.

## Rotas Disponíveis

### Obter Dados da Empresa

- **Endpoint:** `/api/get_company/:companyID/:token`
- **Método:** GET

Esta rota permite obter informações sobre uma empresa com base no seu ID e token de autenticação. Ela verifica a validade do token e retorna os detalhes da empresa.

### Obter Tickets de Rastreamento

- **Endpoint:** `/api/get_TicketTraking/:companyID/:token`
- **Método:** GET

Essa rota permite recuperar tickets de rastreamento associados a uma empresa específica. Os resultados podem ser paginados e filtrados por token de autenticação.

### Obter Tickets de Suporte

- **Endpoint:** `/api/get_Ticket/:companyID/:token`
- **Método:** GET

Esta rota permite recuperar tickets de suporte associados a uma empresa específica. Assim como na rota anterior, os resultados podem ser paginados e filtrados por token de autenticação.

### Obter Usuários

- **Endpoint:** `/api/get_Users/:companyID/:token`
- **Método:** GET

Essa rota permite recuperar informações sobre usuários associados a uma empresa específica. Os resultados podem ser paginados e filtrados por token de autenticação.

### Obter Tags do Kanban

- **Endpoint:** `/api/get_Tags_Kanban/:companyID/:token`
- **Método:** GET

Esta rota permite recuperar tags do Kanban associadas a uma empresa específica. Os resultados podem ser paginados e filtrados por token de autenticação.

### Obter Avaliações de Usuários

- **Endpoint:** `/api/get_UserRatings/:companyID/:token`
- **Método:** GET

Esta rota permite recuperar avaliações de usuários associadas a uma empresa específica. Os resultados podem ser paginados e filtrados por token de autenticação.

### Obter Contatos

- **Endpoint:** `/api/get_Contacts/:companyID/:token`
- **Método:** GET

Esta rota permite recuperar informações de contatos associados a uma empresa específica. Os resultados podem ser paginados e filtrados por token de autenticação.

### Inserir Mensagem

- **Endpoint:** `/api/insert_message`
- **Método:** POST

Esta rota permite inserir mensagens no sistema, associando-as a contatos e tickets. Ela verifica a validade do token e, se necessário, cria um novo ticket. Os dados da mensagem são enviados no corpo da solicitação.

## Tecnologias Utilizadas

- Node.js
- PostgreSQL (Banco de Dados)
- Express.js (Framework para a criação de rotas)
- UUID (Para geração de UUIDs únicos)
- Body-parser (Para análise de dados JSON)

## Como Utilizar

1. Clone este repositório.
2. Configure as variáveis de ambiente e as informações de conexão com o banco de dados.
3. Execute a aplicação Node.js.
4. Utilize as rotas definidas acima para acessar e manipular os dados do sistema de gerenciamento de mensagens.

---

Sinta-se à vontade para personalizar essa descrição de acordo com a estrutura do seu repositório no GitHub e suas necessidades específicas. Certifique-se de manter a documentação atualizada à medida que novas funcionalidades são adicionadas ou alterações são feitas no código.
