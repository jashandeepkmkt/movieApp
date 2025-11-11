import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';

export default function MovieDetails({ movie, onClose }) {
  const [bookingVisible, setBookingVisible] = useState(false);
  const [bookingInfoVisible, setBookingInfoVisible] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const seats = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    booked: Math.random() < 0.2,
  }));

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
            <Text style={styles.heading}>Booking Confirmed 🎟️</Text>
            <Text style={styles.infoText}>You have booked seats: {selectedSeats.join(', ')}</Text>
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
  container: {
    backgroundColor: '#121212',
    flex: 1,
    padding: 15,
  },
  image: {
    width: '100%',
    height: 450,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rating: {
    color: '#bbb',
    textAlign: 'center',
    marginBottom: 10,
  },
  overview: {
    color: '#ddd',
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00bfff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#00bfff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  bookingContainer: {
    backgroundColor: '#121212',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  seatContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  seat: {
    width: 30,
    height: 30,
    margin: 5,
    borderRadius: 5,
  },
  availableSeat: {
    backgroundColor: '#444',
  },
  selectedSeat: {
    backgroundColor: '#00bfff',
  },
  bookedSeat: {
    backgroundColor: '#ff3333',
  },
  infoText: {
    color: '#fff',
    marginVertical: 10,
  },
});
