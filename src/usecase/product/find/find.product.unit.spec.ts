import Product from "../../../domain/product/entity/product"
import FindProductUseCase from "./find.product.usecase"

const product = new Product('1', 'Product', 100)

const input = { id: '1' }

const MockRepository = () => {
    return {
      find: jest.fn().mockReturnValue(Promise.resolve(product)),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    }
}

describe('Unit test find product use case', () => {

    it('should find a product', async () => {
        const repository = MockRepository()
        const usecase = new FindProductUseCase(repository)
        const output = await usecase.execute(input)
        expect(output).toEqual({
            id: input.id,
            name: product.name,
            price: product.price
        })
    })
})