DROP TABLE IF EXISTS TB_HEROIS;
CREATE TABLE TB_HEROIS (
    ID INT GENERATED ALWAYS AS IDENDITY PRIMARY KEY NOT NULL,
    NOME TEXT NOT NULL,
    PODER TEXT NOT NULL
)
--operação do create
INSERT INTO TB_HEROIS (NOME, PODER)
VALUES
    ('Flash', 'Super-velocidade'),
    ('Batman', 'Dinheiro'),
    ('Ciborgue', 'Tecnologia')
--operação do read
SELECT NOME FROM TB_HEROIS;
SELECT PODER FROM TB_HEROIS WHERE NOME = 'Ciborgue';
--operação do update
UPDATE TB_HEROIS
SET NOME = 'Tocha humana', PODER = 'Fogo'
WHERE ID = 1;
--operação do delete
DELETE FROM TB_HEROIS WHERE ID = 2;