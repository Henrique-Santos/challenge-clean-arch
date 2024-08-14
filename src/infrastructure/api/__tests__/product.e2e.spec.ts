import { sequilize, app } from "../express";
import request from "supertest";

describe('E2E test for product', () => {

    beforeEach(async () => {
        await sequilize.sync({ force: true })
    })

    afterAll(async () => {
        await sequilize.close()
    })

    it('should create a product', async () => {
        const response = await request(app)
        .post('/product')
        .send({
            name: 'Product',
            price: 100
        })
        expect(response.status).toBe(200)
        expect(response.body.name).toBe('Product')
        expect(response.body.price).toBe(100)
    })

    it('should not create a product', async () => {
        const response = await request(app)
        .post('/product')
        .send({ name: 'Product' })
        expect(response.status).toBe(500)
    })

    it('should list all products', async () => {
        await request(app)
        .post('/product')
        .send({
            name: 'Product 1',
            price: 100
        })
        await request(app)
        .post('/product')
        .send({
            name: 'Product 2',
            price: 200
        })
        const response = await request(app).get('/product').send()
        const product1 = response.body.products[0]
        const product2 = response.body.products[1]
        expect(response.status).toBe(200)
        expect(response.body.products.length).toBe(2)
        expect(product1.name).toBe('Product 1')
        expect(product1.price).toBe(100)
        expect(product2.name).toBe('Product 2')
        expect(product2.price).toBe(200)
    })
})