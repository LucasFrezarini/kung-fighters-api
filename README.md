# kung-fighters-api

Esse projeto é o backend de um E-commerce realizado para um trabalho de faculdade. O backend foi programado em NodeJS, utilizando o Hapi, e o 
banco utilizado foi o MongoDB. 

Para rodar o projeto com o docker:

1. Instale o docker (https://docs.docker.com/install/) e o docker compose (https://docs.docker.com/compose/install/)
2. Entre na pasta do projeto via terminal e rode o comando docker-compose up.

Caso não queria utilizar o docker:

1. Instalar o NodeJS versão 8.11+ e o MongoDB 3.6.3+
2. Mudar o arquivo .env para apontar para localhost ou 127.0.0.1
3. Rodar o comando **npm install**
4. Subir o projeto utilizando o comando **npm run dev**

# Documentação

Para acessar a documentação da API, basta subir o projeto e entrar na rota /documentation, a partir da url do projeto. 
Por default, está configurado para rodar no localhost:4000/documentation.
