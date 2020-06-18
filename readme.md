# Note to Self

Aplicação Web Full-Stack com Java (Spring) e PostgreSQL (Banco de dados) no back end e React.js no front end.







## Uso

Antes, é necessário que:

- Tenha Java instalado em sua máquina
- Tenha Node.js instalado em sua máquina
- Seu banco de dados SQL esteja em execução.



1. Configure o seu banco de dados para a aplicação Spring (escolha o BD que preferir) em `src/main/resources/application.properties` (crie o arquivo nesse diretório, caso não exista):

    ``````
    spring.datasource.url=<url-do-banco>
    spring.datasource.username=<nome-de-usuario-do-banco>
    spring.datasource.password=<senha-do-banco>
    spring.jpa.hibernate.ddl-auto=update
    ``````
    
2. Instale as dependências necessárias:

    ``````bash
    npm run install
    ``````

3. Inicie a aplicação:

    ``````bash
    npm run start
    ``````

    O servidor e o cliente estão rodando em um ambiente de desenvolvimento disponíveis respectivamente em: `http://localhost:8080` e `http://localhost:3000`

    Faça bom uso! :smile:
