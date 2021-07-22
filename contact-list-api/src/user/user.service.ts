import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
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
        });

        const result = await prisma.user.findMany({
            where: {
                OR: [
                    {
                        name: { in: criterias, mode: "insensitive" }
                    },
                    {
                        email: { in: criterias, mode: "insensitive" }
                    },
                    {
                        phoneNumber: { in: criterias, mode: "insensitive" }
                    },
                    {
                        address: { country: { in: criterias, mode: "insensitive" } }
                    },
                    {
                        address: { city: { in: criterias, mode: "insensitive" } }
                    },
                    {
                        address: { street: { in: criterias, mode: "insensitive" } }
                    },
                    {
                        address: { zipcode: { in: criterias, mode: "insensitive" } }
                    }
                ]
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

    async delete(id: number) {
        const user = await this.prismaService.user.delete({
            where: { id: id },
        });

        return user;
    }
}
