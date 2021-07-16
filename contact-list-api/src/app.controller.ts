/* import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { UserAddressDto } from './user/dtos/user-address.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Promise<UserAddressDto[]> {
    return this.appService.getHello();
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateUserDto: UserAddressDto) {
      return 'this action permor an update';
  }
}
 */