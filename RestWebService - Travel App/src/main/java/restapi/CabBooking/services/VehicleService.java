package restapi.CabBooking.services;

import java.util.List;

import restapi.CabBooking.models.Vehicle;

public interface VehicleService {
	public boolean addVehicle(Vehicle vehicle);
	public List<Vehicle> getAllVehicle();
	public Vehicle getOneVehicle(int vId);
	public Vehicle updateVehicle(Vehicle vehicle);
	public void deleteVehicle(int vId);
}
