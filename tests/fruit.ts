export class Fruit {
    public type: string;
    public color: string;
    public shippingDate: string | Date;
    public amount: number | string;

    constructor(type: string, color: string, shippingDate: string | Date, amount: number | string) {
        this.type = type;
        this.color = color;
        this.shippingDate = shippingDate;
        this.amount = amount;
    }
}