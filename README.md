# Projeto Integrador - Sistema de Gerenciamento para Pet Shop - Backend

Este projeto é um sistema para agendamento e gerenciamento de serviços em um pet shop, desenvolvida como parte da disciplina de Análise e Desenvolvimento de Sistemas (ADS). A ideia inicial é criar uma plataforma robusta e segura para controlar agendamentos de banho e tosa, com um sistema de cadastro e controle de acesso para funcionários, clientes e seus pets.

**Funcionalidades Principais**

- Agendamento de Serviços: Módulo para agendar horários para serviços de banho e tosa.

- Cadastro de Clientes e Pets: Registro de informações completas de clientes e seus animais de estimação.

- Cadastro de Funcionários: Gerenciamento de colaboradores, com controle de acesso diferenciado.

- Controle de Acesso: Autenticação segura com e-mail e senha e sistema de permissões restritas por função, garantindo que cada funcionário acesse apenas as funcionalidades necessárias.

**Tecnologias Utilizadas**

O backend do projeto foi construído com as seguintes tecnologias e bibliotecas:

**Backend:**

- JavaScript: A linguagem principal para a lógica da aplicação.

- Node.js & Express: Ambiente de execução e framework para a criação da API.

- MySQL & SQL: Banco de dados relacional para gerenciar os dados de agendamentos, clientes, pets e funcionários.

- JSON: Formato de dados para comunicação entre o servidor e o cliente.

- npm: Gerenciador de pacotes para as dependências do projeto.

**Segurança:**

- bcrypt: Criptografia de senhas para garantir a segurança dos dados dos usuários.

- jsonwebtoken (JWT): Geração de tokens de autenticação para proteger as rotas da API.

- dotenv: Gerenciamento de variáveis de ambiente de forma segura.

- cors: Para permitir requisições de diferentes domínios, facilitando a futura integração com o frontend.

**Visão do Projeto e Próximos Passos**

O projeto está em sua fase inicial e tem um grande potencial de expansão:

- Adicionar Novos Serviços: Incluir o agendamento de outros serviços, como vacinas e consultas veterinárias.

- Expansão para Gestão Completa: Evoluir para um sistema de gerenciamento total do pet shop, integrando módulos de controle de estoque, vendas e fluxo de caixa.

- Desenvolvimento do Frontend: Criar a interface de usuário para que a aplicação seja acessível via navegador ou aplicativo.


