import Notification from "./notification";

describe('Unit test for notifications', () => {

    it('should create errors', () => {
        const notification = new Notification()
        const error1 = {
            message: 'error message 1',
            context: 'customer'
        }
        const error2 = {
            message: 'error message 2',
            context: 'customer'
        }
        const error3 = {
            message: 'error message 3',
            context: 'order'
        }
        notification.addError(error1)
        expect(notification.messages('customer')).toBe('customer: error message 1,')
        notification.addError(error2)
        expect(notification.messages('customer')).toBe('customer: error message 1,customer: error message 2,')
        notification.addError(error3)
        expect(notification.messages('customer')).toBe('customer: error message 1,customer: error message 2,')
        expect(notification.messages()).toBe('customer: error message 1,customer: error message 2,order: error message 3,')
    })

    it('should check if notification has at least one error', () => {
        const notification = new Notification()
        const error = {
            message: 'error message',
            context: 'customer'
        }
        notification.addError(error)
        expect(notification.hasErrors()).toBeTruthy()
    })

    it('should get all errors props', () => {
        const notification = new Notification()
        const error = {
            message: 'error message',
            context: 'customer'
        }
        notification.addError(error)
        expect(notification.errors).toEqual([error])
    })

})