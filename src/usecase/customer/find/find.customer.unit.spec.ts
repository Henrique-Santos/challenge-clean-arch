import Customer from "../../../domain/customer/entity/customer"
import Address from "../../../domain/customer/value-object/address"
import FindCustomerUseCase from "./find.customer.usecase"

const customer = new Customer('1', 'John')
const address = new Address('street', 1, '89220-000', 'city')
customer.changeAddress(address)

const MockRepository = () => {
    return {
      find: jest.fn().mockReturnValue(Promise.resolve(customer)),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    }
}

describe('Test find customer use case', () => {

    it('should find a customer', async () => {
        const customerRepository = MockRepository()
        const usecase = new FindCustomerUseCase(customerRepository)
        const input = { id: '1' }
        const output = {
            id: '1',
            name: 'John',
            address: {
                street: 'street',
                city: 'city',
                number: 1,
                zip: '89220-000'
            }
        }
        const result = await usecase.execute(input)
        expect(result).toEqual(output)
    })

    it('should not find a customer', async () => {
        const customerRepository = MockRepository()
        customerRepository.find.mockImplementation(() => { throw new Error('Customer not found') })
        const usecase = new FindCustomerUseCase(customerRepository)
        const input = { id: '1' }
        expect(() => usecase.execute(input)).rejects.toThrow('Customer not found');
    })
})