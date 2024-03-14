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

import restapi.CabBooking.models.Booking;
import restapi.CabBooking.models.Vehicle;
import restapi.CabBooking.services.BookingService;
import restapi.CabBooking.services.VehicleService;

@RestController
@RequestMapping("/api/booking")
public class BookingController {
	
	@Autowired
	BookingService bookingService;
	@Autowired
	VehicleService vehicleService;
	
	@GetMapping("/all")
	public ResponseEntity<List<Booking>> getAllBookings() {
		List<Booking> allBookings = bookingService.getAllBookings();
		return ResponseEntity.ok(allBookings);
	}
	
	@PostMapping("/all")
	public ResponseEntity<Object> addBooking(@RequestBody Booking booking) {
		System.out.println(booking);
		Vehicle vehicle = vehicleService.getOneVehicle(booking.getVehicle().getvId());
		if(vehicle == null) {
			return new ResponseEntity<Object>("Vehicle with given id is not found", HttpStatus.NOT_FOUND);
		}
		
		booking.setVehicle(vehicle);
		if(bookingService.addBooking(booking)) {
			return ResponseEntity.ok(booking);
		}
		return new ResponseEntity<Object>("Booking record is not added", HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@GetMapping("/{bId}")
	public ResponseEntity<Object> getOneBooking(@PathVariable int bId) {
		Booking booking = bookingService.getOneBooking(bId);
		
		if(booking != null) {
			return ResponseEntity.ok(booking);
		}
		return new ResponseEntity<Object>("Record for given id not found", HttpStatus.NOT_FOUND);
	}
	
	@PutMapping("/{bId}")
	public ResponseEntity<Object> updateBooking(@PathVariable int bId, @RequestBody Booking booking) {
		Booking result = bookingService.getOneBooking(bId);
		
		if(result != null) {
			Vehicle vehicle = vehicleService.getOneVehicle(booking.getVehicle().getvId());
			if(vehicle == null) {
				return new ResponseEntity<Object>("Vehicle with given id is not found", HttpStatus.NOT_FOUND);
			}
			
			booking.setbId(bId);
			booking.setVehicle(vehicle);
			Booking updatedBooking = bookingService.updateBooking(booking);
			if(updatedBooking != null) {
				return ResponseEntity.ok(updatedBooking);
			} else {
				return new ResponseEntity<Object>("Record is not updated", HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
		return new ResponseEntity<Object>("Record with given id is not found", HttpStatus.NOT_FOUND);
	}
	
	@DeleteMapping("/{bId}")
	public ResponseEntity<Object> deleteBooking(@PathVariable int bId) {
		Booking result = bookingService.getOneBooking(bId);
		
		if(result != null) {			
			bookingService.deleteBooking(bId);
			return ResponseEntity.ok(result);
		}
		return new ResponseEntity<Object>("Record with given id is not found", HttpStatus.NOT_FOUND);
	}
}
