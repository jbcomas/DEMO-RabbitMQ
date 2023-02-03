const js = require('./index.json')
const js1 = require('./cars/cars.json')
const js2 = require('./products/products.json')
const js3 = require('./usuarios/usuarios.json')

const concatJson = () =>{
    js.paths = {...js.paths , ...js1, ...js2, ...js3}

}

module.exports = {
    concatJson
}