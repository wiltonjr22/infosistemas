import { UpdateVehicleService } from './update.service';
import { PrismaService } from '@/resources/databases/prisma/prisma.service';
import { UpdateVehicleDto } from '../../commom/dto/update.dto';

describe('UpdateVehicleService', () => {
  let service: UpdateVehicleService;
  let prisma: PrismaService;

  beforeEach(() => {
    prisma = {
      vehicle: {
        update: jest.fn(),
      },
      $queryRaw: jest.fn().mockResolvedValue([{ test: 1 }]),
    } as any;

    service = new UpdateVehicleService(prisma);
  });

  it('should call update with the correct data', async () => {
    const dto: UpdateVehicleDto = {
      id: 123,
      plate: 'DEF5678',
      chassis: 'LMN123456789',
      renavam: '987654321',
      model: 'Model Y',
      brand: 'Brand Z',
      year: 2023,
    };
    const message = { Body: JSON.stringify(dto) };

    const updateSpy = jest.spyOn(service as any, 'update');

    await service.execute(message);

    expect(updateSpy).toHaveBeenCalledWith(dto);
    expect(prisma.vehicle.update).toHaveBeenCalledWith({
      where: { id: dto.id },
      data: dto,
    });
  });

  it('should log and throw error if update fails', async () => {
    const dto: UpdateVehicleDto = { id: 456 } as any;
    const message = { Body: JSON.stringify(dto) };
    const error = new Error('DB error');
    prisma.vehicle.update = jest.fn().mockRejectedValue(error);

    await expect(service.execute(message)).rejects.toThrow('DB error');
  });

  it('should throw error if message body is invalid JSON', async () => {
    const message = { Body: '{invalidJson}' };
    await expect(service.execute(message)).rejects.toThrow();
  });
});
