import { DeleteVehicleService } from './delete.service';
import { PrismaService } from '@/resources/databases/prisma/prisma.service';
import { UpdateVehicleDto } from '../../commom/dto/update.dto';

describe('DeleteVehicleService', () => {
  let service: DeleteVehicleService;
  let prisma: PrismaService;

  beforeEach(() => {
    prisma = {
      vehicle: {
        update: jest.fn(),
      },
      $queryRaw: jest.fn().mockResolvedValue([{ test: 1 }]),
    } as any;

    service = new DeleteVehicleService(prisma);
  });

  it('should call delete with the correct id', async () => {
    const dto: UpdateVehicleDto = {
      id: 123,
      plate: 'ABC1234',
      chassis: 'XYZ987654321',
      renavam: '123456789',
      model: 'Model X',
      brand: 'Brand Y',
      year: 2022,
    };
    const message = { Body: JSON.stringify(dto) };

    const deleteSpy = jest.spyOn(service as any, 'delete');

    await service.execute(message);

    expect(deleteSpy).toHaveBeenCalledWith(dto.id);
    expect(prisma.vehicle.update).toHaveBeenCalledWith({
      where: { id: dto.id },
      data: { isActive: 0 },
    });
  });

  it('should log and throw error if delete fails', async () => {
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
