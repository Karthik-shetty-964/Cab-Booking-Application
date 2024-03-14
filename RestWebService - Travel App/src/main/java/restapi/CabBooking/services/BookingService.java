package restapi.CabBooking.services;

import java.util.List;

import restapi.CabBooking.models.Booking;

public interface BookingService {
	public boolean addBooking(Booking booking);
	public List<Booking> getAllBookings();
	public Booking getOneBooking(int bId);
	public Booking updateBooking(Booking booking);
	public void deleteBooking(int bId);
}
