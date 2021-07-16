import { Type } from 'class-transformer';
import { IsEmail, IsPhoneNumber, IsPostalCode, IsNotEmpty, IsInt, IsDefined, ValidateNested } from 'class-validator';
import { AddressDto } from './address.dto';

export class UserAddressDto {

    @IsInt()
    id: number;

    // @IsString()
    // @IsNotEmpty({message: 'Name can not be empty'})
    @IsNotEmpty()
    name: string;

    @IsEmail({}, {message: 'Invalid format for email'})    
    // @IsEmail()    
    email: string;

    @IsPhoneNumber('US', {message: 'Wrong phone number for US'})
    // @IsPhoneNumber('US')
    phoneNumber: string;

    // @IsNotEmpty()
    @ValidateNested({ each: true })
    @IsDefined()
    @Type(() => AddressDto)
    address: AddressDto;
    /* constructor(user: User) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.phoneNumber = user.Address.
    } */
}


