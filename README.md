# Conta Bancaria API

API com CRUD de contas bancarias e realização de depósitos e saques.

## Execução da aplicação

### Pré-requisitos
- Node.js v16.20.0
- NPM v8.19.4
- Docker
- Docker Compose

## Clone o repositório:
```bash
git clone https://github.com/ivanferreirajr/bank-account-crud.git
cd bank-account-crud
```

## Instação das dependências

```bash
$ npm install
```

Os comandos iniciarão a aplicação Nest.js e a disponibilizará em http://localhost:3333.

```bash
# development
$ npm run start

# watch mode
$ npm run dev

# production mode
$ npm run start:prod
```

## Documentação
A documentação completa está disponível na rota /docs da API. Exemplo: http://localhost:3333/docs.

## Execução dos testes

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docker
Se preferir, pode executar a API em container Docker. Para isso, siga as instruções abaixo:

```bash
# build
$ docker run -d -p 3333:3333 --name bankaccount-api bankaccount:latest

# executar
$ docker run -d -p 3333:3333 --name bankaccount-api bankaccount:latest
```

## Docker Compose
Com o docker Compose é possivel executar a aplicação sem nenhuma configuração prévia. Basta ter o Docker compose instalado na máquina.

```bash
docker-compose up -d
```

Abra o navegador e acesse http://localhost:3333 para visualizar a aplicação Nest.js.

Para parar a aplicação, pressione Ctrl+C no terminal onde o docker-compose up está sendo executado.

Para executar a aplicação em modo de produção, utilize o seguinte comando:

Para parar e remover os contêineres, redes e volumes criados pelo docker-compose up, execute:

```bash
docker-compose down
```