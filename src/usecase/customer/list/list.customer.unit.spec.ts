import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress('John', new Address('street 1', 1, 'zip 1', 'city 1'))

const customer2 = CustomerFactory.createWithAddress('Jane', new Address('street 2', 2, 'zip 2', 'city 2'))

const MockRepository = () => {
    return {
      find: jest.fn(),
      findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
      create: jest.fn(),
      update: jest.fn()
    }
} 

describe('Unit test listing customer use case', () => {

    it('should list a customer', async () => {
        const customerRepository = MockRepository()
        const usecase = new ListCustomerUseCase(customerRepository)
        const output = await usecase.execute({})
        expect(output.customers.length).toBe(2);
        expect(output.customers[0].id).toBe(customer1.id);
        expect(output.customers[0].name).toBe(customer1.name);
        expect(output.customers[0].address.street).toBe(customer1.address.street);
        expect(output.customers[1].id).toBe(customer2.id);
        expect(output.customers[1].name).toBe(customer2.name);
        expect(output.customers[1].address.street).toBe(customer2.address.street);
    })

})