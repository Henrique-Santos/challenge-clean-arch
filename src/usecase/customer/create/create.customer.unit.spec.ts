import CreateCustomerUseCase from "./create.customer.usecase"

const input = {
    name: 'John',
    address: {
        street: 'street',
        city: 'city',
        number: 1,
        zip: '89220-000'
    }
}

const MockRepository = () => {
    return {
      find: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    }
} 

describe('Unit test create customer use case', () => {

    it('should create a customer', async () => {
        const customerRepository = MockRepository()
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository)
        const output = await customerCreateUseCase.execute(input)
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                city: input.address.city,
                number: input.address.number,
                zip: input.address.zip
            }
        })
    })

    it('should thrown an error when name is missing', async () => {
        const customerRepository = MockRepository()
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository)
        input.name = ''
        await expect(customerCreateUseCase.execute(input)).rejects.toThrow('Name is required')
    })

    it('should thrown an error when street is missing', async () => {
        const customerRepository = MockRepository()
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository)
        input.address.street = ''
        await expect(customerCreateUseCase.execute(input)).rejects.toThrow('Street is required')
    })
})