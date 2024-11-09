import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesService } from './employees.service';
import { DatabaseService } from 'src/database/database.service';
import { mockDatabaseService } from 'src/employees/mocks/database.service.mock';

describe('EmployeesService', () => {
  let service: EmployeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeesService,
        {
          provide: DatabaseService,
          useValue: mockDatabaseService,
        },
      ],
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
