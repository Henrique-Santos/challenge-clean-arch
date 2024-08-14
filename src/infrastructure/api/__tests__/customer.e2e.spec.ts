import { sequilize, app } from "../express";
import request from "supertest";

describe('E2E test for customer', () => {

    beforeEach(async () => {
        await sequilize.sync({ force: true })
    })

    afterAll(async () => {
        await sequilize.close()
    })

    it('should create a customer', async () => {
        const response = await request(app)
        .post('/customer')
        .send({
            name: 'John',
            address: {
                street: 'street',
                city: 'city',
                number: 1,
                zip: '89220-000'
            }
        })
        expect(response.status).toBe(200)
        expect(response.body.name).toBe('John')
        expect(response.body.address.street).toBe('street')
        expect(response.body.address.city).toBe('city')
        expect(response.body.address.number).toBe(1)
        expect(response.body.address.zip).toBe('89220-000')
    })

    it('should not create a customer', async () => {
        const response = await request(app)
        .post('/customer')
        .send({ name: 'John' })
        expect(response.status).toBe(500)
    })

    it('should list all customers', async () => {
        await request(app)
        .post('/customer')
        .send({
            name: 'John',
            address: {
                street: 'street 1',
                city: 'city 1',
                number: 1,
                zip: '89220-001'
            }
        })
        await request(app)
        .post('/customer')
        .send({
            name: 'Jane',
            address: {
                street: 'street 2',
                city: 'city 2',
                number: 1,
                zip: '89220-002'
            }
        })
        const response = await request(app).get('/customer').send()
        const customer1 = response.body.customers[0]
        const customer2 = response.body.customers[1]
        expect(response.status).toBe(200)
        expect(response.body.customers.length).toBe(2)
        expect(customer1.name).toBe('John')
        expect(customer1.address.street).toBe('street 1')
        expect(customer2.name).toBe('Jane')
        expect(customer2.address.street).toBe('street 2')
    })
})