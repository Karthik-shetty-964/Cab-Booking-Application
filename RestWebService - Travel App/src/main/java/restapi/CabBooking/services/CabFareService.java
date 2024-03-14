package restapi.CabBooking.services;

import java.util.List;

import restapi.CabBooking.models.CabFare;

public interface CabFareService {
	public boolean addCabFare(CabFare cabFare);
	public List<CabFare> getAllCabFares();
	public CabFare getOneCabFare(int fareId);
	public CabFare updateCabFare(CabFare cabFare);
	public void deleteCabFare(int fareId);
}
