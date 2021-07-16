import { Body, Controller, Get, Param, ParseArrayPipe, ParseIntPipe, Post, Put, Query, Redirect, UseFilters, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/core/filters/http-exception.filter';
import { UserAddressDto } from './dtos/user-address.dto';
import { UserService } from './user.service';


@UseFilters(HttpExceptionFilter)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @Get()
  async getAll(): Promise<UserAddressDto[]> {
    return await this.userService.findAll();
  }

  //https://docs.nestjs.com/controllers
  @Get('filtered')
  async getUserPaginator(
    @Query('criterias') criterias: string,
    // @Query(new ValidationPipe({transform: true})) params: {criterias: string[]},
    // @Query('skip', ParseIntPipe) skip: number,
    // @Query('take', ParseIntPipe) take: number,
    // @query('criterias', ParseArrayPipe) criterias: string[]
    // @Query(new ValidationPipe({ transform: true }) criterias: string[]
    // @Query() queryUserParams: QueryUserParameterDto 
  ): Promise<UserAddressDto[]> {
    // const criteriasArr = criterias.s;
    // criterias.forEach( c => criteriasArr.push(c));
    console.log(criterias);
    // console.log(typeof criterias);
    // const criteriasArr = Array.of(criterias);
    return await this.userService.findFilteredUsers(criterias);
    // return null;
  }

  @Put(':id')
  @Redirect('', 201)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ transform: true })) updateUserAddressDto: UserAddressDto) {
    await this.userService.update(id, updateUserAddressDto);
  }
}
