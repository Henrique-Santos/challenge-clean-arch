import Product from "../../../domain/product/entity/product"
import UpdateProductUseCase from "./update.product.usecase"

const product = new Product('1', 'Product', 100)

const input = {
    id: '1',
    name: 'New Product',
    price: 200
}

const MockRepository = () => {
    return {
      find: jest.fn().mockReturnValue(Promise.resolve(product)),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    }
}

describe('Unit test create product use case', () => {

    it('should create a product', async () => {
        const repository = MockRepository()
        const usecase = new UpdateProductUseCase(repository)
        const output = await usecase.execute(input)
        expect(output).toEqual(input)
    })
})