import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

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
            providers: [UserApiServiceProvider],
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
});
