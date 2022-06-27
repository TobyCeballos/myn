const { faker } = require('@faker-js/faker')

faker.locale = 'es'

const generator = function createRandom() {
    const products = {
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        stock: faker.random.numeric(),
        description: faker.lorem.sentence(),
        thumbnail: faker.image.imageUrl()
    }
    return products
}

module.exports = generator

