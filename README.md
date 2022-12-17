
# :soccer: Trybe Futebol Club

O TFC é um site informativo sobre partidas e classificações de futebol! soccer

Neste projeto foi passado uma aplicação em front end, e minha responsabilidade era desenvolver todo back end para seu funcionamento.
Desenvolvi uma API (utilizando o método TDD) e também integrei - através do docker-compose - as aplicações para que elas funcionem consumindo um banco de dados.

Construi um back-end dockerizado utilizando modelagem de dados através do Sequelize e fiz os relacionamentos entre as tabelas.

Link da aplicação funcionando: https://cooperative-knife-production.up.railway.app/leaderboard

![image](https://user-images.githubusercontent.com/83560101/205159385-2ec0d63e-d131-470b-8a1f-9d316d9bf7cd.png)


## ⚙️ Funcionalidades

✅ Fazer login;

✅ Buscar partidas em andamento/finalizadas;

✅ Alterar o estado da partida/placar;

✅ Consultar a classificação do campeonato;

## :hammer_and_wrench: Ferramentas 
### 🍮 BackEnd
- TypeScript;
- POO;
- SOLID;
- DOCKER;
- MySQL com Sequelize;
- NodeJS com Express;
- JWT;
- bcrypts;
- Testes (Sinon, Chai, Mocha);

# Orientações

- *Clonar o repositório:*

```
$ git clone git@github.com:Brayan-23/Clube-Futebol.git
```

- *Acessar o projeto trybe-Futebol-Clube:*

```
$ cd trybe-futebol-clube
```


- *Para acessar a aplicação:*
```
Utilizar uma senha/usuário válidos

acesso: http://localhost:3000
login: admin@admin.com
senha: secret_admin
```

<details>
  <summary><strong>🐋 Rodando no Docker vs Localmente</strong></summary><br />
  
  ## Com Docker

  > Rode o serviço `node` com o comando `npm run compose:up:dev`.
  - Esse serviço irá inicializar um 3 containers, um para o Front-end, um para o Back-end e um para o Banco de Dados.
  - A partir daqui você pode acessar o qualquer container via CLI ou abri-lo no VS Code.

  > Use o comando `docker exec -it app_backend bash` para acessar a CLI do container.

  > Instale as dependências com `npm install`
  
  ⚠ Atenção ⚠ Caso opte por utilizar o Docker, **TODOS** os comandos disponíveis no `package.json` (npm start, npm test, npm run dev, ...) devem ser executados **DENTRO** do container, ou seja, no terminal que aparece após a execução do comando `docker exec` citado acima. 

<img src="images/remote-container.png" width="800px" >  

---
  
  ## Sem Docker
  
  > Instale as dependências com `npm install`
 
  - Para rodar o projeto desta forma, obrigatoriamente você deve ter o `node` instalado em seu computador.

  <br/>
</details>
