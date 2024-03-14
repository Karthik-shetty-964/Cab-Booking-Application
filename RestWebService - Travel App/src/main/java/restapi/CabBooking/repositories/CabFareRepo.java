package restapi.CabBooking.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import restapi.CabBooking.models.CabFare;

@Repository
public interface CabFareRepo extends JpaRepository<CabFare, Integer>{

}
