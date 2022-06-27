const knex = require('knex');
const { options } = require('../connect/connect')

class Contenedor {
    constructor(options) {
        this.knex = knex(options);
    }

    async crearTabla() {
        return this.knex.schema.dropTableIfExists('customer')
            .finally(() => {
                return this.knex.schema.createTable('customer', table => {
                    table.increments('id').primary()
                    table.varchar('name', 64).notNullable()
                    table.float('price', 10.2).notNullable()
                    table.varchar('description', 100).notNullable()
                    table.integer('stock', 64).notNullable()
                    table.varchar('thumbnail', 3000).notNullable()
                })
            })
    }


    async saveProd(articulos) {
        return this.knex('customer').insert(articulos)
    }


    async getProds() {
        return this.knex('customer').select('*')
    }
};



const archivo1 = new Contenedor(options)
module.exports = archivo1;
