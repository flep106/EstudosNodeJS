o arquivo 
## strategy.js
    -> tem o arquivo base/contexStrategy.js
        *Classe usada para fazer a injeção de dependência quando for chamar os metodos
## Isso é uma injenção de dependencia
        * const contextMongo = new contexStrategy(new mongoDB())
    -> tem o arquivo interface/interfaceCrud.js
        * classe Interface que implementa os metodos ICRUD 
        * classe de error de metodos não implementados caso nao chame os metodos do contrato
    -> tem o arquivo mongodb.js
        * os metodos CRUD para mongo
    -> tem o arquivo postgres.js
        * os metodos CRUD para Postgres
    -> tem o arquivo index.js
        * o arquivo que executa as coisas
