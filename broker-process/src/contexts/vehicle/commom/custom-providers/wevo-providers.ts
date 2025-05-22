import { VehicleService } from "../../application/services/vehicle.service";

export const VehicleProviders = {
  Vehicle_SERVICE: {
    provide: "IVehicleService",
    useClass: VehicleService,
  },
};
