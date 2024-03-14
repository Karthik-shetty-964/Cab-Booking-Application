package restapi.CabBooking.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import restapi.CabBooking.models.Booking;

@Repository
public interface BookingRepo extends JpaRepository<Booking, Integer>{

}
