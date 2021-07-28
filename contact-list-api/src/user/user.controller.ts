import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Put, Query, Redirect, UseFilters, ValidationPipe } from '@nestjs/common';
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
  
  @Get('filtered')
  async getUserPaginator(
    @Query('criterias') criterias: string,
  ): Promise<UserAddressDto[]> {
    console.log(criterias);
    if (criterias.length === 0) return await this.userService.findAll();
    return await this.userService.findFilteredUsers(criterias);
  }

  @Put(':id')
  @Redirect('', 200)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ transform: true })) updateUserAddressDto: UserAddressDto) {
    await this.userService.update(id, updateUserAddressDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', ParseIntPipe) id: number) {
    console.log('id: ', id);

    return this.userService.delete(id);
  }
}
