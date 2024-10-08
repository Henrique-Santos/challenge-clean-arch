import Entity from "../../@shared/entity/entity.abstract"
import NotificationError from "../../@shared/notification/notification.error"
import ProductFactoryValidator from "../factory/product.validator.factory"
import ProductInterface from "./product.interface"

export default class Product extends Entity implements ProductInterface {
    
    private _name: string
    private _price: number

    constructor(readonly id: string, name: string, price: number) {
        super()
        this.id = id
        this._name = name
        this._price = price
        this.validate()
        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.errors)
        }
    }

    validate() {
        ProductFactoryValidator.execute().validate(this)
    }

    changeName(name: string) {
        this._name = name
        this.validate()
    }

    changePrice(price: number) {
        this._price = price
        this.validate()
    }

    get name(): string {
        return this._name
    }

    get price(): number {
        return this._price
    }
}