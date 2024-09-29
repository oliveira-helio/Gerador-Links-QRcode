# Documentação do Projeto: Gerador de QR Code

## Descrição
O "Gerador de QR Code" é uma aplicação web que permite aos usuários gerar QR Codes a partir de URLs fornecidas. O projeto inclui funcionalidades de autenticação de usuários, armazenamento de QR Codes em um banco de dados PostgreSQL e a opção de download dos QR Codes gerados.

##cTecnologias Utilizadas

- Node.js: Ambiente de execução para JavaScript no servidor.
- Express: Framework para criar aplicações web em Node.js.
- PostgreSQL: Banco de dados relacional para armazenar QR Codes e informações de usuários.
- Sequelize: ORM para interagir com o PostgreSQL.
- QRCode: Biblioteca para geração de QR Codes.
- Bcrypt.js: Biblioteca para hash de senhas.
- Express-Session: Middleware para gerenciamento de sessões.
- EJS: Motor de template para renderização de HTML.
- Dotenv: Para carregar variáveis de ambiente.

## Estrutura do Projeto

```
qr-code-generator/
├── package.json
├── server.js
├── .env
├── .gitignore
├── routes/
│   └── qr.js
├── models/
│   ├── QRCode.js
│   └── User.js
├── public/
│   ├── styles.css
│   └── script.js
└── views/
    ├── login.ejs
    ├── register.ejs
    └── index.ejs
```

## Funcionalidades

1. Geração de QR Code: Usuários podem inserir uma URL e gerar um QR Code correspondente.. 
2. Autenticação de Usuários: Usuários podem se registrar e fazer login.
3. Armazenamento de QR Codes: QR Codes gerados são armazenados no PostgreSQL.
4. Download de QR Codes: Usuários podem baixar os QR Codes gerados.
5. Logout: Usuários podem sair de suas contas.

## Configuração do Ambiente

### Pré-requisitos

- Node.js e npm instalados.
- PostgreSQL em execução.

### Instalação
1. Clone o repositório:
```
git clone <URL do repositório>
cd qr-code-generator
```

2. Instale as dependências:
```
npm install
```

3. Configure o banco de dados PostgreSQL e crie um banco de dados para o projeto.

4. Crie um arquivo .env na raiz do projeto com a seguinte estrutura:
```
DATABASE_URL=postgres://username:password@localhost:5432/nome_do_banco
```
> Substitua username, password e nome_do_banco pelos valores correspondentes ao seu ambiente PostgreSQL.

5. Inicie o servidor:
```
npm run dev
```

6. Acesse a aplicação no navegador: 

[http://localhost:3000](http://localhost:3000)

## Endpoints da API

1. Registro de Usuário

- Método: POST
- Rota: /register
- Corpo da Requisição: JSON
```
{
  "username": "string",
  "password": "string"
}
```

2. Login de Usuário

- Método: POST
- Rota: /login
- Corpo da Requisição: JSON
```
{
  "username": "string",
  "password": "string"
}
```

3. Logout de Usuário

- Método: POST
- Rota: /logout

4. Geração de QR Code

- Método: POST
- Rota: /qr/generate
- Corpo da Requisição: JSON
```
{
  "url": "string"
}
```
- Resposta: JSON
```
{
  "code": "dataURL"
}
```

5. Download de QR Code

- Método: GET
- Rota: /qr/download/

6. Visualização de QR Codes

- Método: GET
- Rota: /qr/codes
- Middleware de Autenticação: O middleware isAuthenticated garante que apenas usuários autenticados possam acessar as rotas protegidas. Se o usuário não estiver autenticado, ele é redirecionado para a página de login.
**Exemplo do Middleware**
```
const isAuthenticated = async (req, res, next) => {
    if (req.session.userId) {
        const user = await User.findByPk(req.session.userId);
        if (user) {
            return next();
        }
    }
    res.redirect('/login');
};
```

## Melhorias Futuras

- Implementar Proteção CSRF: Para aumentar a segurança nas rotas que alteram o estado.
- Melhorar a Interface: Tornar o design mais responsivo e visualmente atraente.
- Adicionar Validações: Incluir validações para entradas de URL e campos de registro/login.
- Histórico de QR Codes: Permitir que os usuários visualizem um histórico de QR Codes gerados.