package restapi.CabBooking.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;

//import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
//import jakarta.persistence.OneToMany;
import lombok.ToString;

@Entity
@ToString
public class Vehicle {
	
	@Id
	@GeneratedValue
	private int vId;
	private String vName;
	private String vNumber;
	private String vDriverName;
	private int totalSeats;
	private String vPhone;
	
	@OneToMany(mappedBy="vehicle", cascade=CascadeType.ALL)
	@JsonIgnore
	private List<Booking>  bookings;
	
	
		
	public int getvId() {
		return vId;
	}
	public void setvId(int vId) {
		this.vId = vId;
	}
	public String getvName() {
		return vName;
	}
	public void setvName(String vName) {
		this.vName = vName;
	}
	public String getvNumber() {
		return vNumber;
	}
	public void setvNumber(String vNumber) {
		this.vNumber = vNumber;
	}
	public String getvDriverName() {
		return vDriverName;
	}
	public void setvDriverName(String vDriverName) {
		this.vDriverName = vDriverName;
	}
	public int getTotalSeats() {
		return totalSeats;
	}
	public void setTotalSeats(int totalSeats) {
		this.totalSeats = totalSeats;
	}
	public String getvPhone() {
		return vPhone;
	}
	public void setvPhone(String vPhone) {
		this.vPhone = vPhone;
	}
	public List<Booking> getBookings() {
		return bookings;
	}
	public void setBookings(List<Booking> bookings) {
		this.bookings = bookings;
	}
}
