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

import restapi.CabBooking.models.CabFare;
import restapi.CabBooking.services.CabFareService;

@RestController
@RequestMapping("/api/cab-fare")
public class CabFareController {

	@Autowired
	CabFareService cabFareService;
	
	@GetMapping("/all")
	public ResponseEntity<List<CabFare>> getAllFares() {
		List<CabFare> allFares = cabFareService.getAllCabFares();
		return ResponseEntity.ok(allFares);
	}
	
	@PostMapping("/all")
	public ResponseEntity<Object> addCabFare(@RequestBody CabFare cabFare) {
		if(cabFareService.addCabFare(cabFare)) {
			return ResponseEntity.ok(cabFare);
		}
		return new ResponseEntity<Object>("CabFare record is not added", HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@GetMapping("/{fareId}")
	public ResponseEntity<Object> getOneCabFare(@PathVariable int fareId) {
		CabFare cabFare = cabFareService.getOneCabFare(fareId);
		
		if(cabFare != null) {
			return ResponseEntity.ok(cabFare);
		}
		return new ResponseEntity<Object>("Record for given id not found", HttpStatus.NOT_FOUND);
	}
	
	@PutMapping("/{fareId}")
	public ResponseEntity<Object> updateCabFare(@PathVariable int fareId, @RequestBody CabFare cabFare) {
		CabFare result = cabFareService.getOneCabFare(fareId);
		
		if(result != null) {
			cabFare.setFId(fareId);
			CabFare updatedFare = cabFareService.updateCabFare(cabFare);
			if(updatedFare != null) {
				return ResponseEntity.ok(updatedFare);
			} else {
				return new ResponseEntity<Object>("Record is not updated", HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
		return new ResponseEntity<Object>("Record with given id is not found", HttpStatus.NOT_FOUND);
	}
	
	@DeleteMapping("/{fareId}")
	public ResponseEntity<Object> deleteOneCabFare(@PathVariable int fareId) {
		CabFare result = cabFareService.getOneCabFare(fareId);
		
		if(result != null) {
			cabFareService.deleteCabFare(fareId);
			return ResponseEntity.ok(result);
		}
		return new ResponseEntity<Object>("Record with given id is not found", HttpStatus.NOT_FOUND);
	}
}
