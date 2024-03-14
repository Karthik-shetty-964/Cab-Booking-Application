package restapi.CabBooking.models;

import java.sql.Timestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
public class Booking {
	
	@Id
	@GeneratedValue
	private int bId;
	private Timestamp bDateTime;
	private String fromLocation;
	private String toLocation;
	private double totalAmount;
	private String customerName;
	private String customerPhone;
	
	@ManyToOne
	@JoinColumn(name="vehicle_id")
	private Vehicle vehicle;
	
	
	public int getbId() {
		return bId;
	}

	public void setbId(int bId) {
		this.bId = bId;
	}

	public Timestamp getbDateTime() {
		return bDateTime;
	}

	public void setbDateTime(Timestamp bDateTime) {
		this.bDateTime = bDateTime;
	}
}
