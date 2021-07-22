export class User {

    id: number;
    name: string;
    phoneNumber: string;
    email: string;
    address: Address;

    constructor() {
        this.id = -1;
        this.name = '';
        this.phoneNumber = '';
        this.email = '';
        this.address = new Address();
    }
}

export class Address {

    country: string;
    city: string;
    street: string;
    zipcode: string;

    constructor() {
        this.country = '';
        this.city = '';
        this.street = '';
        this.zipcode = '';
    }
}
