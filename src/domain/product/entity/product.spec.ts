import Product from "./product"

describe('Product unit tests', () => {

    it('should throw erro when id is empty', () => {
        expect(() => {
            new Product('', 'Product 1', 100)
        }).toThrow('product: Id is required')
    })

    it('should throw erro when name is empty', () => {
        expect(() => {
            new Product('1', '', 100)
        }).toThrow('product: Name is required')
    })

    it('should throw erro when price is less then 0', () => {
        expect(() => {
            new Product('1', 'Product 1', -1)
        }).toThrow('product: Price must be greater than 0')
    })

    it('should throw erro when id and name is empty', () => {
        expect(() => {
            new Product('', '', 100)
        }).toThrow('product: Id is required,product: Name is required')
    })

    it('should throw erro when id, name is empty and price is less then 0', () => {
        expect(() => {
            new Product('', '', -1)
        }).toThrow('product: Id is required,product: Name is required,product: Price must be greater than 0')
    })

    it('should change name', () => {
        const product = new Product('1', 'Rice', 10)
        product.changeName('Been')
        expect(product.name).toBe('Been')
    })

    it('should change price', () => {
        const product = new Product('1', 'Rice', 10)
        product.changePrice(20)
        expect(product.price).toBe(20)
    })
})