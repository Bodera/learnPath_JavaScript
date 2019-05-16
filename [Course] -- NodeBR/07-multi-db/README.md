# O quanto você gosta de containers e baleias?
### Postgres
Use o comando:
```bash
sudo docker ps
```
Para listar os containers que estão rodando localmente. Lembre que o run cria um novo container, o start inicializa um já existente.

Um exemplo do comando utilizado pela nossa aplicação ficaria assim para preparar o ambiente:
```bash
sudo docker run\
    --name postgres \
    -e POSTGRES_USER=aquelebode \
    -e POSTGRES_PASSWORD=interludiocoexistencial \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres
```
__Obs:__ utiliza-se '-d' (--detach) para executar o container em segundo plano. Especificamos o nome da imagem ao final do comando.

Para executar usamos:
```bash
sudo docker ps 
sudo docker exec -it postgres /bin/bash
root# ls && psql
```

Agora que tal adicionarmos uma instância concorrente? Para a imagem de interface do BD ficaria assim:
```bash
sudo docker run\
    --name adminer \
    -p 8080:8080 \
    --link postgres:postgres \
    -d \
    adminer
```
Acesse 127.0.0.1:8080 para fornecer as credenciais no painel do Adminer.
Sistema: PostgreSQL
Servidor: postgres
usuário: POSTGRES_USER
senha: POSTGRES_PASSWORD
base de dados: heroes

### MongoDB
Agora vamos setar o container do mongodb 
```bash
sudo docker run\
    --name mongodb \
    -e MONGO_INITDB_ROOT_USERNAME=sysadmin \
    -e MONGO_INITDB_ROOT_PASSWORD=pneumoultramicroscopicossilicovulcanoconiotico \
    -p 27017:27017 \
    -d \
    mongo:4
```

Vamos agora configurar um cliente para facilitar nossa interação com o mongo.
```bash
sudo docker run\
    --name mongoclient \
    -p 3000:3000 \
    --link mongodb:mongodb \
    -d \
    mongoclient/mongoclient
```
__Obs:__ espaços em branco irão ocasionar dor de cabeça.

Para acesso eu preenchi o formulário de nova conexão assim:

-Connection
Hostname: mongodb
Database name: admin
-Authentication
Scram-Sha-1
username: MONGO_INITDB_ROOT_USERNAME
password: MONGO_INITDB_ROOT_PASSWORD
Authentication db: admin

Configurando um pouco mais além a execução automática do mongoDB:
```bash
sudo docker exec -it mongodb\
    mongo --host localhost -u sysadmin -p pneumoultramicroscopicossilicovulcanoconiotico --authenticationDatabase admin \
    --eval "db.getSiblingDB('herois').createUser({user: 'aquelebode', pwd: 'interludiocoexistencial', roles: [{role: 'readWrite', db: 'herois'}]})"
```
Para acesso eu preenchi o formulário de nova conexão assim:

-Connection
Hostname: mongodb
Database name: herois
-Authentication
Scram-Sha-1
username: aquelebode
password: interludiocoexistencial
Authentication db: herois

## Você agora só precisa saber
Trecho extraído de um blog, créditos ao autor: "While docker stop $(docker ps -a -q) stops all running containers. A more direct way is to use docker kill my_container, which does not attempt to shut down the process gracefully first."

sudo docker start postgres
sudo docker start adminer
sudo docker start mongodb
sudo docker start mongoclient

## Introdução ao projeto

Iniciamos um projeto com o `npm init -y`, em seguida criamos a pasta `src` que irá conter todo os códigos de exemplo para seguirmos adiante na implementação dos serviços. Como o projeto será multi banco de dados criamos a pasta `bd` que contém estratégias separadas na pasta `strategies`, arquivos que são reutilizados pelos serviços na pasta `base` e os contratos de implementação para funcionamento da estratégia na pasta `interfaces`.

#### Bancos de dados estruturados
Seguem uma estrutura fixa, e garantem a consistência do dado. Quando quisermos referenciar uma tabela para localização de um dado iremos consultar o respectivo identificador único da linha propiciando sua reutilização. Assim que as relações são estabelecidas seguimos regras conhecidas: constraint e chaves estrangeiras por exemplo.

Seguindo as boas práticas de programação, vamos então adicionar um método que testa a conexão do nosso serviço ao banco de dados. Altere o seu arquivo `InterfaceCrud.js` para contemplar o seguinte:
```javascript
isConnect() {//boolean
    return this._database.isConnected()
}
```

Criamos em seguida a pasta `scripts` dentro da pasta `src`. Iniciamos nosso arquivo `postgresql.sql` da seguinte maneira:
```sql
DROP TABLE IF EXISTS TB_HEROIS;
CREATE TABLE TB_HEROIS (
    ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    NOME TEXT NOT NULL,
    PODER TEXT NOT NULL
)
```
Agora acesse o container do Adminer e execute o comando SQL acima.

Para adicionarmos itens, use:
```sql
INSERT INTO TB_HEROIS (NOME, PODER)
VALUES
    ('Flash', 'Super-velocidade'),
    ('Batman', 'Dinheiro'),
    ('Ciborgue', 'Tecnologia')
```
E para listar:
```sql
SELECT NOME FROM TB_HEROIS;
SELECT PODER FROM TB_HEROIS WHERE NOME = 'Ciborgue';
```
E para atualizar atualizar:
```sql
SELECT * FROM TB_HEROIS WHERE ID = 1;
UPDATE TB_HEROIS
SET NOME = 'Tocha humana', PODER = 'Fogo'
WHERE ID = 1;
SELECT * FROM TB_HEROIS WHERE ID = 1;
```
E para remover itens:
```sql
DELETE FROM TB_HEROIS WHERE ID = 2;
SELECT * FROM TB_HEROIS;
```
#### Bancos de dados semi-estruturados