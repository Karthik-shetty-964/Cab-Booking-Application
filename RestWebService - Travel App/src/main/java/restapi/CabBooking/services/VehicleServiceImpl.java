package restapi.CabBooking.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import restapi.CabBooking.models.Vehicle;
import restapi.CabBooking.repositories.VehicleRepo;

@Service
public class VehicleServiceImpl implements VehicleService {

	@Autowired
	VehicleRepo vehicleRepo;

	@Override
	public boolean addVehicle(Vehicle vehicle) {
		Vehicle res = vehicleRepo.save(vehicle);
		
		if(res != null) {
			return true;
		}
		return false;
	}

	@Override
	public List<Vehicle> getAllVehicle() {
		return vehicleRepo.findAll();
	}

	@Override
	public Vehicle getOneVehicle(int vId) {
		Optional<Vehicle> res = vehicleRepo.findById(vId);
		
		if(res.isPresent()) {
			return res.get();
		}
		return null;
	}

	@Override
	public Vehicle updateVehicle(Vehicle vehicle) {
		Vehicle res = vehicleRepo.saveAndFlush(vehicle);
		return res;
	}

	@Override
	public void deleteVehicle(int vId) {
		vehicleRepo.deleteById(vId);
	}
}
