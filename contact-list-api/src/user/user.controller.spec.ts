import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from './../core/prisma.service';

describe('AppController', () => {
    let appController: UserController;
    let spyService: UserService;

    beforeEach(async () => {
        const UserApiServiceProvider = {
            provide: UserService,
            useFactory: () => ({
                findAll: jest.fn(() => []),
                findFilteredUsers: jest.fn(() => [])
            }),
        };

        const app: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserApiServiceProvider, PrismaService/* ,
                {
                    provide: APP_FILTER,
                    useClass: HttpExceptionFilter,
                  } */],
        }).compile();

        appController = app.get<UserController>(UserController);
        spyService = app.get<UserService>(UserService);
    });

    describe('getUserPaginator', () => {
        it('should call findAll for empty criterias', async () => {
          const criterias = '';          
          appController.getUserPaginator(criterias);
          expect(spyService.findAll).toHaveBeenCalled();
        });
      });

      describe('getUserPaginator', () => {
        it('should call findFilteredUsers for non empty criterias', async () => {
          const criterias = 'Values';
          appController.getUserPaginator(criterias);
          expect(spyService.findFilteredUsers).toHaveBeenCalled();
        });
      });
    /* describe('root', () => {
        it('should return "Hello World!"', () => {
            expect(appController.getHello()).toBe('Hello World!');
        });
    }); */
});
