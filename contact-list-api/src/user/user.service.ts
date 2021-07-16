import { Injectable } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import { PrismaService } from "src/core/prisma.service";
import { PaginatedDto } from "./dtos/paginated.dto";
import { UserAddressDto } from "./dtos/user-address.dto";

@Injectable()
export class UserService {

    constructor(private prismaService: PrismaService) { }

    async findAll(): Promise<UserAddressDto[]> {
        const users = await this.prismaService.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                phoneNumber: true,
                address: {
                    select: {
                        country: true,
                        city: true,
                        street: true,
                        zipcode: true
                    }

                }
            },
            orderBy: { name: 'asc' }
        });

        const userDtos: UserAddressDto[] = users.map(u => {
            return {
                id: u.id, name: u.name, email: u.email, phoneNumber: u.phoneNumber,
                address: { country: u.address.country, city: u.address.city, street: u.address.street, zipcode: u.address.zipcode }
            } = u;
        });

        return userDtos;
    }

    async findFilteredPaginatedUsers(paginator: PaginatedDto<UserAddressDto>): Promise<PaginatedDto<UserAddressDto>> {
        const result = await this.prismaService.user.findMany({
            skip: paginator.skip,
            take: paginator.take,
            where: {
                OR: [
                    {
                        name: { in: paginator.criterias }
                    },
                    {
                        email: { in: paginator.criterias }
                    },
                    {
                        phoneNumber: { in: paginator.criterias }
                    }
                ],
                address: {
                    OR: [
                        {
                            country: { in: paginator.criterias }
                        },
                        {
                            city: { in: paginator.criterias }
                        },
                        {
                            street: { in: paginator.criterias }
                        },
                        {
                            zipcode: { in: paginator.criterias }
                        }
                    ]
                }
            },
            select: {
                id: true,
                name: true,
                email: true,
                phoneNumber: true,
                address: {
                    select: {
                        country: true,
                        city: true,
                        street: true,
                        zipcode: true
                    }

                }
            },
            orderBy: {
                name: 'asc'
            }
        });

        const userDtos: UserAddressDto[] = result.map(u => {
            return {
                id: u.id, name: u.name, email: u.email, phoneNumber: u.phoneNumber,
                address: { country: u.address.country, city: u.address.city, street: u.address.street, zipcode: u.address.zipcode }
            } = u;
        });

        paginator.data = userDtos;
        return paginator;
    }

    async findFilteredUsers(criterias: string): Promise<UserAddressDto[]> {
        const prisma = new PrismaClient({
            log: ['query', 'info', `warn`, `error`],
          })
        console.log('criterias: ', criterias);
          
        const result = await prisma.user.findMany({            
            where: {
                OR: [
                    {
                        name: { in: criterias }
                        // name: { contains: criterias }
                    },
                    {
                        email: { in: criterias }
                        // email: { contains: criterias }
                    },
                    {
                        phoneNumber: { in: criterias }
                        // phoneNumber: { contains: criterias }
                    },
                    {
                        address: { country: { in: criterias } }
                    },
                    {
                        address: { city: { in: criterias } }
                    },
                    {
                        address: { street: { in: criterias } }
                    },
                    {
                        address: { zipcode: { in: criterias } }
                    }
                ] /* ,
                address: {
                    OR: [
                        {
                            country: { in: criterias }
                            // country: { contains: criterias }
                        },
                        {
                            city: { in: criterias }
                            // city: { contains: criterias }
                        },
                        {
                            street: { in: criterias }
                            // street: { contains: criterias }
                        },
                        {
                            zipcode: { in: criterias }
                            // zipcode: { contains: criterias }
                        }
                    ]
                } */
            },
            select: {
                id: true,
                name: true,
                email: true,
                phoneNumber: true,
                address: {
                    select: {
                        country: true,
                        city: true,
                        street: true,
                        zipcode: true
                    }

                }
            },
            orderBy: {
                name: 'asc'
            }
        });

        console.log('result: ', result);
        
        const userDtos: UserAddressDto[] = result.map(u => {
            return {
                id: u.id, name: u.name, email: u.email, phoneNumber: u.phoneNumber,
                address: { country: u.address.country, city: u.address.city, street: u.address.street, zipcode: u.address.zipcode }
            } = u;
        });

        return userDtos;
    }


    async update(id: number, userAddress: UserAddressDto): Promise<boolean> {
        const updated = await this.prismaService.user.update({
            where: {
                id: id
            },
            data: {
                name: userAddress.name,
                email: userAddress.email,
                phoneNumber: userAddress.phoneNumber,
                address: {
                    update: {
                        country: userAddress.address.country,
                        city: userAddress.address.city,
                        street: userAddress.address.street,
                        zipcode: userAddress.address.zipcode
                    }
                }

            }
        });

        return updated !== null;
    }
}
