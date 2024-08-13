import CustomerFactory from "../../../domain/customer/factory/customer.factory"
import Address from "../../../domain/customer/value-object/address"
import UpdateCustomerUseCase from "./update.customer.usecase"

const customer = CustomerFactory.createWithAddress('John', new Address('street', 1, 'zip', 'city'))

const input = {
    id: customer.id,
    name: 'John Doe',
    address: {
        street: 'street updated',
        city: 'city updated',
        number: 11,
        zip: 'zip updated'
    }
}

const MockRepository = () => {
    return {
      find: jest.fn().mockReturnValue(Promise.resolve(customer)),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn()
    }
} 

describe('Unit test update customer use case', () => {

    it('should create a customer', async () => {
        const customerRepository = MockRepository()
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository)
        const output = await customerUpdateUseCase.execute(input)
        expect(output).toEqual(input)
    })

})