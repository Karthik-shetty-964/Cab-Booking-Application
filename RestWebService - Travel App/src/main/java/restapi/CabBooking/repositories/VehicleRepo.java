package restapi.CabBooking.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import restapi.CabBooking.models.Vehicle;

@Repository
public interface VehicleRepo extends JpaRepository<Vehicle, Integer>{

}
