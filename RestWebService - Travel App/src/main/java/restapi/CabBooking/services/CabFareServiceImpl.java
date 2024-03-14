package restapi.CabBooking.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import restapi.CabBooking.models.CabFare;
import restapi.CabBooking.repositories.CabFareRepo;

@Service
public class CabFareServiceImpl implements CabFareService{

	@Autowired
	CabFareRepo cabFareRepo;
	
	@Override
	public boolean addCabFare(CabFare cabFare) {
		CabFare res = cabFareRepo.save(cabFare);
		
		if(res != null) {
			return true;
		}
		return false;
	}

	@Override
	public List<CabFare> getAllCabFares() {
		return cabFareRepo.findAll();
	}

	@Override
	public CabFare getOneCabFare(int fareId) {
		Optional<CabFare> res = cabFareRepo.findById(fareId);
		
		if(res.isPresent()) {
			return res.get();
		}
		return null;
	}

	@Override
	public CabFare updateCabFare(CabFare cabFare) {
		CabFare res = cabFareRepo.saveAndFlush(cabFare);
		return res;
	}

	@Override
	public void deleteCabFare(int fareId) {
		cabFareRepo.deleteById(fareId);
	}
}
