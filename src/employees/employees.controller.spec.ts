import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { DatabaseService } from 'src/database/database.service';
import { mockDatabaseService } from './mocks/database.service.mock';

describe('EmployeesController', () => {
  let controller: EmployeesController;
  let employeesService: EmployeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [
        EmployeesService,
        {
          provide: DatabaseService,
          useValue: mockDatabaseService,
        },
      ],
    }).compile();

    controller = module.get<EmployeesController>(EmployeesController);
    employeesService = module.get<EmployeesService>(EmployeesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return user data in the correct format', async () => {
    const mockEmployee = {
      id: 3,
      name: 'Logan',
      email: 'lcarmelito@gmail.com',
      role: 'ENGINEER',
      createdAt: new Date('2024-11-09T18:04:49.480Z'),
      updatedAt: new Date('2024-11-09T18:08:14.463Z'),
    };

    mockDatabaseService.employee.findUnique.mockResolvedValue(mockEmployee);
    const result = await employeesService.findOne(3);

    expect(result).toEqual(mockEmployee);
  });
});
