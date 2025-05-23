import { CreateVehicleService } from './create.service';
import { PrismaService } from '@/resources/databases/prisma/prisma.service';
import { CreateVehicleDto } from '../../commom/dto/create.dto';

describe('CreateVehicleService', () => {
  let service: CreateVehicleService;
  let prisma: PrismaService;

  beforeEach(() => {
    prisma = {
      vehicle: {
        create: jest.fn(),
      },
      $queryRaw: jest.fn().mockResolvedValue([{ test: 1 }]),
    } as any;

    service = new CreateVehicleService(prisma);
  });

  it('should create a vehicle when message is valid', async () => {
    const dto: CreateVehicleDto = {
      plate: 'ABC1234',
      chassis: 'XYZ987654321',
      renavam: '123456789',
      model: 'Model X',
      brand: 'Brand Y',
      year: 2022,
    };
    const message = { Body: JSON.stringify(dto) };

    await service.execute(message);

    expect(prisma.vehicle.create).toHaveBeenCalledWith({
      data: {
        plate: dto.plate,
        chassis: dto.chassis,
        renavam: dto.renavam,
        model: dto.model,
        brand: dto.brand,
        year: dto.year,
      },
    });
  });

  it('should log and throw error if create fails', async () => {
    const dto: CreateVehicleDto = {
      plate: 'DEF5678',
      chassis: 'LMN123456789',
      renavam: '987654321',
      model: 'Model Y',
      brand: 'Brand Z',
      year: 2023,
    };
    const message = { Body: JSON.stringify(dto) };
    const error = new Error('DB error');
    prisma.vehicle.create = jest.fn().mockRejectedValue(error);

    await expect(service.execute(message)).rejects.toThrow('DB error');
  });

  it('should throw error if message body is invalid JSON', async () => {
    const message = { Body: '{invalidJson}' };
    await expect(service.execute(message)).rejects.toThrow();
  });
});
