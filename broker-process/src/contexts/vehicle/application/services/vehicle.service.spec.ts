import { VehicleService } from './vehicle.service';
import { PrismaService } from '@/resources/databases/prisma/prisma.service';
import { AwsSqsService } from '@/resources/aws/aws-sqs.service';
import { CreateInput } from '../../presentation/dtos/create.input';
import { UpdateInput } from '../../presentation/dtos/update.input';
import { VehicleEntity } from '../../commom/entities/vehicle.entity';
import { NotFoundException } from '@nestjs/common';

jest.mock('../../commom/entitites/vehicle-create.input.entity');
jest.mock('../../commom/entitites/vehicle-update.input.entity');
jest.mock('../../commom/entitites/vehicle-remove.input.entity');

describe('VehicleService', () => {
  let service: VehicleService;
  let prisma: jest.Mocked<PrismaService>;
  let awsSqsService: jest.Mocked<AwsSqsService>;

  beforeEach(() => {
    prisma = {
      vehicle: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
      },
      $queryRaw: jest.fn(),
    } as any;

    awsSqsService = {
      sendMessage: jest.fn(),
    } as any;

    service = new VehicleService(prisma, awsSqsService);
    (service as any).logger = { log: jest.fn(), error: jest.fn() };
  });

  describe('create', () => {
    it('should send create message and log', async () => {
      awsSqsService.sendMessage.mockResolvedValue(undefined);
      await service.create({} as CreateInput);
      expect(awsSqsService.sendMessage).toHaveBeenCalledWith('CREATE', expect.any(Object));
      expect((service as any).logger.log).toHaveBeenCalledWith('Successfully queued');
    });

    it('should log and throw on error', async () => {
      awsSqsService.sendMessage.mockRejectedValue(new Error('fail'));
      await expect(service.create({} as CreateInput)).rejects.toThrow('fail');
      expect((service as any).logger.error).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return vehicles', async () => {
      const vehicles: VehicleEntity[] = [{ id: 1 } as VehicleEntity];
      prisma.vehicle.findMany.mockResolvedValue(vehicles);
      const result = await service.findAll();
      expect(result).toBe(vehicles);
    });

    it('should log and throw on error', async () => {
      prisma.vehicle.findMany.mockRejectedValue(new Error('fail'));
      await expect(service.findAll()).rejects.toThrow('fail');
      expect((service as any).logger.error).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return vehicle', async () => {
      const vehicle: VehicleEntity = { id: 1 } as VehicleEntity;
      prisma.vehicle.findUnique.mockResolvedValue(vehicle);
      const result = await service.findOne(1);
      expect(result).toBe(vehicle);
    });

    it('should throw NotFoundException if not found', async () => {
      prisma.vehicle.findUnique.mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });

    it('should log and throw on error', async () => {
      prisma.vehicle.findUnique.mockRejectedValue(new Error('fail'));
      await expect(service.findOne(1)).rejects.toThrow('fail');
      expect((service as any).logger.error).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should send update message and log', async () => {
      awsSqsService.sendMessage.mockResolvedValue(undefined);
      await service.update(1, {} as UpdateInput);
      expect(awsSqsService.sendMessage).toHaveBeenCalledWith('UPDATE', expect.any(Object));
      expect((service as any).logger.log).toHaveBeenCalledWith('Successfully queued');
    });

    it('should log and throw on error', async () => {
      awsSqsService.sendMessage.mockRejectedValue(new Error('fail'));
      await expect(service.update(1, {} as UpdateInput)).rejects.toThrow('fail');
      expect((service as any).logger.error).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should send remove message and log', async () => {
      awsSqsService.sendMessage.mockResolvedValue(undefined);
      await service.remove(1);
      expect(awsSqsService.sendMessage).toHaveBeenCalledWith('REMOVE', expect.any(Object));
      expect((service as any).logger.log).toHaveBeenCalledWith('Successfully queued');
    });

    it('should log and throw on error', async () => {
      awsSqsService.sendMessage.mockRejectedValue(new Error('fail'));
      await expect(service.remove(1)).rejects.toThrow('fail');
      expect((service as any).logger.error).toHaveBeenCalled();
    });
  });

  describe('onModuleInit', () => {
    it('should call testConnection', async () => {
      const spy = jest.spyOn<any, any>(service as any, 'testConnection').mockResolvedValue(undefined);
      await service.onModuleInit();
      expect(spy).toHaveBeenCalled();
    });
  });
});