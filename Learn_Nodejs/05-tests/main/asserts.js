var assert = require('assert')

var atual    = 100
var esperado = 200

try {
    assert.equal(esperado, atual, "os valores devem ser iguais")
} catch(e) {
    console.log(e) //Muito melhor para debugar, e o código fica lindo.
}

/*BAD CODE!
 * 
    var assert = require('assert');
    
    var atual    = 100;
    var esperado = 200;
    
    assert.equal(esperado, atual, "os valores devem ser iguais");
    
 */ 
