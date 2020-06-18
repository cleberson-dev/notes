# Note to Self

Aplicação Web Full-Stack com Java (Spring) e PostgreSQL (Banco de dados) no back end e React.js no front end.



## Uso

### Pré-requerimentos

- Tenha Java instalado em sua máquina
- Tenha Node.js instalado em sua máquina
- Assegure que seu banco de dados SQL esteja rodando no momento da utilização do app.



1. Configure o seu banco de dados para o projeto (escolha o BD que preferir) em `src/main/resources/application.properties` (crie o arquivo nesse diretório, caso não exista):

    ``````
    spring.datasource.url=<url-do-banco>
    spring.datasource.username=<nome-de-usuario-do-banco>
    spring.datasource.password=<senha-do-banco>
    spring.jpa.hibernate.ddl-auto=update
    ``````
    
2. Instale as dependências para o cliente, no diretório do cliente em ():

3. Execute a aplicação Spring na linha de comandos:

    ``````bash
    ./gradlew bootRun
    ``````
