import { IsPostalCode, IsNotEmpty } from 'class-validator';

export class AddressDto {

    @IsNotEmpty({message: 'Country can not be empty'})    
    country: string;

    @IsNotEmpty({message: 'City can not be empty'})
    city: string;
    
    @IsNotEmpty({message: 'Street can not be empty'})
    street: string;
    
    @IsPostalCode('US', {message: 'Wrong postal code for US'})
    zipcode: string
}
