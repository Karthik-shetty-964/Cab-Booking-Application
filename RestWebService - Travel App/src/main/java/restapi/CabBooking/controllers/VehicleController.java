package restapi.CabBooking.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import restapi.CabBooking.models.Vehicle;
import restapi.CabBooking.services.VehicleService;

@RestController
@RequestMapping("/api/vehicle")
public class VehicleController {
	
	@Autowired
	VehicleService vehicleService;
	
	@GetMapping("/all")
	public ResponseEntity<List<Vehicle>> getAllVehicles() {
		List<Vehicle> allVehicles = vehicleService.getAllVehicle();
		return ResponseEntity.ok(allVehicles);
	}
	
	@PostMapping("/all")
	public ResponseEntity<Object> addVehicle(@RequestBody Vehicle vehicle) {
		System.out.println(vehicle);
		if(vehicleService.addVehicle(vehicle)) {
			return ResponseEntity.ok(vehicle);
		}
		return new ResponseEntity<Object>("Vehicle record is not added", HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@GetMapping("/{vId}")
	public ResponseEntity<Object> getOneVehicle(@PathVariable int vId) {
		Vehicle vehicle = vehicleService.getOneVehicle(vId);
		
		if(vehicle != null) {
			return ResponseEntity.ok(vehicle);
		}
		return new ResponseEntity<Object>("Record for given id not found", HttpStatus.NOT_FOUND);
	}
	
	@PutMapping("/{vId}")
	public ResponseEntity<Object> updateVehicle(@PathVariable int vId, @RequestBody Vehicle vehicle) {
		Vehicle result = vehicleService.getOneVehicle(vId);
		
		if(result != null) {
			vehicle.setvId(vId);
			Vehicle updatedVehicle = vehicleService.updateVehicle(vehicle);
			if(updatedVehicle != null) {
				return ResponseEntity.ok(updatedVehicle);
			} else {
				return new ResponseEntity<Object>("Record is not updated", HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
		return new ResponseEntity<Object>("Record with given id is not found", HttpStatus.NOT_FOUND);
	}
	
	@DeleteMapping("/{vId}")
	public ResponseEntity<Object> deleteVehicle(@PathVariable int vId) {
		Vehicle result = vehicleService.getOneVehicle(vId);
		
		if(result != null) {
			vehicleService.deleteVehicle(vId);
			return ResponseEntity.ok(result);
		}
		return new ResponseEntity<Object>("Record with given id is not found", HttpStatus.NOT_FOUND);
	}
}
