import { CreateVehicleService } from '../../application/services/create.service';
import { DeleteVehicleService } from '../../application/services/delete.service';
import { UpdateVehicleService } from '../../application/services/update.service';

export const VehicleProviders = {
  Vehicle_Create_SERVICE: {
    provide: 'ICreateVehicleService',
    useClass: CreateVehicleService,
  },
  Vehicle_Update_SERVICE: {
    provide: 'IDeleteVehicleService',
    useClass: DeleteVehicleService,
  },
  Vehicle_Delete_SERVICE: {
    provide: 'IUpdateVehicleService',
    useClass: UpdateVehicleService,
  },
};
