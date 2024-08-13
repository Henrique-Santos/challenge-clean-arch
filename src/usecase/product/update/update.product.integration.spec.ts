import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import UpdateProductUseCase from "./update.product.usecase"
import Product from "../../../domain/product/entity/product"

describe('Integration test update product use case', () => {

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
    
    it('should update a product', async () => {
        const input = {
            id: '1',
            name: 'New Product',
            price: 200
        }
        const product = new Product('1', 'Product', 100)
        const repository = new ProductRepository()
        await repository.create(product)
        const usecase = new UpdateProductUseCase(repository)
        const output = await usecase.execute(input)
        expect(output).toEqual(input)
    })

})