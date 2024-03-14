package restapi.CabBooking.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import restapi.CabBooking.models.Booking;
import restapi.CabBooking.repositories.BookingRepo;


@Service
public class BookingServiceImpl implements BookingService{
	
	@Autowired
	BookingRepo bookingRepo;

	@Override
	public boolean addBooking(Booking booking) {
		Booking res = bookingRepo.save(booking);
		
		if(res != null) {
			return true;
		}
		return false;
	}

	@Override
	public List<Booking> getAllBookings() {
		return bookingRepo.findAll();
	}

	@Override
	public Booking getOneBooking(int bId) {
		Optional<Booking> res = bookingRepo.findById(bId);
		
		if(res.isPresent()) {
			return res.get();
		}
		return null;
	}

	@Override
	public Booking updateBooking(Booking booking) {
		Booking res = bookingRepo.saveAndFlush(booking);
		return res;
	}

	@Override
	public void deleteBooking(int bId) {
		bookingRepo.deleteById(bId);
	}
}
