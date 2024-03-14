		/**
 * 
 */
package restapi.CabBooking.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class CabFare {
	
	@Id
	@GeneratedValue
	private int fId;
	
	private String fromLocation;
	private String toLocation;
	private double fare;
}
