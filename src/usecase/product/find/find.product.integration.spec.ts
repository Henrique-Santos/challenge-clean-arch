import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import Product from "../../../domain/product/entity/product"
import FindProductUseCase from "./find.product.usecase"

describe('Integration test find product use case', () => {

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        })
        sequelize.addModels([ProductModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })
    
    it('should find a product', async () => {
        const input = { id: '1' }
        const product = new Product('1', 'Product', 100)
        const repository = new ProductRepository()
        await repository.create(product)
        const usecase = new FindProductUseCase(repository)
        const output = await usecase.execute(input)
        expect(output).toEqual({
            id: input.id,
            name: product.name,
            price: product.price
        })
    })

})