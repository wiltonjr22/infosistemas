import { VehicleController } from './vehicle.controller';
import { VehicleService } from '../../application/services/vehicle.service';
import { CreateInput } from '../dtos/create.input';
import { UpdateInput } from '../dtos/update.input';
import { VehicleEntity } from '../../commom/entities/vehicle.entity';

describe('VehicleController', () => {
  let controller: VehicleController;
  let service: jest.Mocked<VehicleService>;

  beforeEach(() => {
    service = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    } as any;

    controller = new VehicleController(service);
    // Optionally, mock logger if you want to check logs
    (controller as any).logger = { log: jest.fn() };
  });

  it('should call service.create on create', async () => {
    const input: CreateInput = {} as any;
    service.create.mockResolvedValue(undefined);
    await controller.create(input);
    expect(service.create).toHaveBeenCalledWith(input);
    expect((controller as any).logger.log).toHaveBeenCalledWith('Creating vehicle');
  });

  it('should call service.findAll on findAll', async () => {
    const vehicles: VehicleEntity[] = [{ id: 1 } as VehicleEntity];
    service.findAll.mockResolvedValue(vehicles);
    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toBe(vehicles);
    expect((controller as any).logger.log).toHaveBeenCalledWith('Listing all vehicles');
  });

  it('should call service.findOne on findOne', async () => {
    const vehicle: VehicleEntity = { id: 1 } as VehicleEntity;
    service.findOne.mockResolvedValue(vehicle);
    const result = await controller.findOne(1);
    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(result).toBe(vehicle);
    expect((controller as any).logger.log).toHaveBeenCalledWith('Getting vehicle 1');
  });

  it('should call service.update on update', async () => {
    const input: UpdateInput = {} as any;
    service.update.mockResolvedValue(undefined);
    await controller.update(1, input);
    expect(service.update).toHaveBeenCalledWith(1, input);
    expect((controller as any).logger.log).toHaveBeenCalledWith('Updating vehicle 1');
  });

  it('should call service.remove on remove', async () => {
    service.remove.mockResolvedValue(undefined);
    await controller.remove(1);
    expect(service.remove).toHaveBeenCalledWith(1);
    expect((controller as any).logger.log).toHaveBeenCalledWith('Deleting vehicle 1');
  });
});