//create
db.herois.insert({ 
    nome: 'Mulher-gavião',
    poder: 'Metal Nth', 
    dataNascimento: '1999-12-17'
})

//read
db.herois.find()

//update - Afetam um único registro por vez por default
db.herois.update({ _id: ObjectId("5cfee88cca00aee9dd2c8184")}, { nome: 'Homem-gabirú' }) //oxente
db.herois.update({ _id: ObjectId('5cfee88cca00aee9dd2c8184')},  {$set: {poder: 'Metal Nth', dataNascimento: '1999-12-17'}}) //começando a entender
db.herois.update({ _id: ObjectId("5cfee88cca00aee9dd2c8184")}, { $set: {nome: 'Homem-gabiru'} }) // :)

//delete
db.herois.remove({}) //Deleta todos os registros da coleção
db.herois.remove({_id: ObjectId("5cfee88cca00aee9dd2c8184")}) 