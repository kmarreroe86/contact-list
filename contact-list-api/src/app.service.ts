import { Injectable, Get } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from './core/prisma.service';
import { UserAddressDto } from './user/dtos/user-address.dto';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) { }


  async getHello(/* params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByInput;
  } */): Promise<UserAddressDto[]> {
    // const { skip, take, cursor, where, orderBy } = params;
    /* return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    }); */
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber:true,
        address: {
          select: {
            country: true,
            city: true,
            street: true,
            zipcode: true
          }
          
        }
      }
      /* include: {
        address: true
      } */

      /* select: {
        name: true,
        email: true,
        phoneNumber: true,
        address: {
          select: {
            country: true,
          city: true,
          street: true,
          zipcode: true,
          userId: true
          }          
        }
      }, */
    });

    /* let kaka: UserAddressDto[] = [];
     users.forEach(u => {
       kaka.push({u['id'], u.name, u.email, u.phoneNumber, u.address.country, u.address.city, u.address.street, u.address.zipcode});
     }); */
    const kaka: UserAddressDto[] = users.map(u => {
      return {
        id: u.id, name: u.name, email: u.name, phoneNumber: u.phoneNumber,
        address: { country: u.address.country, city: u.address.city, street: u.address.street, zipcode: u.address.zipcode }
      } = u;
    });

    /* const kaka = users.map(u: any => {
      const {'name': u['name']};
    }); */
    // console.log('kaka: ', kaka);
    /* console.log('users: ', users);
    const usersDto: UserAddressDto[] = users;
    return usersDto; */

    console.log(kaka);
    return kaka;
  }

  /* async update(userAddressDto: UserAddressDto): Promise<User> {


  } */

}
