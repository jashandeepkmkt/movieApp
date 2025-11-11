 /*
 I Jashandeep Kaur , 000900507 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
*/

import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, ScrollView, TextInput, Picker } from 'react-native';

export default function MovieDetails({ movie, onClose, onBook }) {
  const [bookingVisible, setBookingVisible] = useState(false);
  const [bookingInfoVisible, setBookingInfoVisible] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [selectedTime, setSelectedTime] = useState('18:00');
  const [selectedLocation, setSelectedLocation] = useState('Downtown Cinema');

  const seats = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    booked: Math.random() < 0.2,
  }));

  const times = ['12:00', '15:00', '18:00', '21:00'];
  const locations = ['Downtown Cinema', 'City Mall Theater', 'Riverside Cinema', 'Grand Cineplex'];

  const toggleSeat = (seat) => {
    if (seat.booked) return;
    if (selectedSeats.includes(seat.id)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, seat.id]);
    }
  };

  const handleBooking = () => {
    setBookingVisible(false);
    setBookingInfoVisible(true);
    if (onBook) onBook(movie, selectedSeats, selectedDate, selectedTime, selectedLocation);
  };

  return (
    <Modal visible animationType="slide">
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={onClose} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <Image
          style={styles.image}
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        />
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.rating}>⭐ {movie.vote_average}</Text>
        <Text style={styles.overview}>{movie.overview}</Text>

        <TouchableOpacity style={styles.button} onPress={() => setBookingVisible(true)}>
          <Text style={styles.buttonText}>Book Seats</Text>
        </TouchableOpacity>

        {/* Booking Modal */}
        <Modal visible={bookingVisible} animationType="fade">
          <View style={styles.bookingContainer}>
            <Text style={styles.heading}>Select Location</Text>
            <Picker
              selectedValue={selectedLocation}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedLocation(itemValue)}
            >
              {locations.map((loc) => (
                <Picker.Item key={loc} label={loc} value={loc} />
              ))}
            </Picker>

            <Text style={styles.heading}>Select Date</Text>
            <TextInput
              style={styles.dateInput}
              value={selectedDate}
              onChangeText={setSelectedDate}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#888"
            />

            <Text style={styles.heading}>Select Time</Text>
            <Picker
              selectedValue={selectedTime}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedTime(itemValue)}
            >
              {times.map((t) => (
                <Picker.Item key={t} label={t} value={t} />
              ))}
            </Picker>

            <Text style={styles.heading}>Select Seats</Text>
            <View style={styles.seatContainer}>
              {seats.map((seat) => (
                <TouchableOpacity
                  key={seat.id}
                  style={[
                    styles.seat,
                    seat.booked
                      ? styles.bookedSeat
                      : selectedSeats.includes(seat.id)
                      ? styles.selectedSeat
                      : styles.availableSeat,
                  ]}
                  onPress={() => toggleSeat(seat)}
                />
              ))}
            </View>

            <TouchableOpacity style={styles.button} onPress={handleBooking}>
              <Text style={styles.buttonText}>Confirm Booking</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setBookingVisible(false)} style={styles.backButton}>
              <Text style={styles.backButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {/* Booking Info Modal */}
        <Modal visible={bookingInfoVisible} animationType="fade">
          <View style={styles.bookingContainer}>
            <Text style={styles.heading}>Booking Confirmed</Text>
            <Text style={styles.infoText}>
              Movie: {movie.title}{"\n"}
              Location: {selectedLocation}{"\n"}
              Date: {selectedDate}{"\n"}
              Time: {selectedTime}{"\n"}
              Seats: {selectedSeats.join(', ')}
            </Text>
            <TouchableOpacity
              onPress={() => setBookingInfoVisible(false)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#121212', flex: 1, padding: 15 },
  image: { width: '100%', height: 450, borderRadius: 10, marginBottom: 10 },
  title: { color: '#fff', fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  rating: { color: '#bbb', textAlign: 'center', marginBottom: 10 },
  overview: { color: '#ddd', fontSize: 16, marginBottom: 20 },
  button: { backgroundColor: '#00bfff', padding: 12, borderRadius: 8, alignItems: 'center', marginVertical: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  backButton: { backgroundColor: '#00bfff', padding: 10, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  backButtonText: { color: '#fff', fontSize: 16 },
  bookingContainer: { backgroundColor: '#121212', flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  heading: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  seatContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  seat: { width: 30, height: 30, margin: 5, borderRadius: 5 },
  availableSeat: { backgroundColor: '#444' },
  selectedSeat: { backgroundColor: '#00bfff' },
  bookedSeat: { backgroundColor: '#ff3333' },
  infoText: { color: '#fff', marginVertical: 10, textAlign: 'center' },
  dateInput: { backgroundColor: '#1c1c1c', color: '#fff', borderRadius: 8, paddingHorizontal: 10, height: 40, width: 200, textAlign: 'center', marginBottom: 10 },
  picker: { height: 50, width: 200, color: '#fff', backgroundColor: '#1c1c1c', marginBottom: 10 }
});
