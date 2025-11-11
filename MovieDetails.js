import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TurboModuleRegistry, TextInput} from 'react-native';
import { Modal, ScrollView } from 'react-native-web';

export default function MovieDetails({ movie, onBack }) {
    const [bookingName, setBookingName] = useState(false);
    const[bookinfInfo, setBookingInfo] = useState(false);

    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedDate, setSelectedDate] = useState([]);
    const [ticketBooked, setTicketBooked] = useState(false);
    const [bookingData, setBookingData] = useState({
        name: '',
        seats: '',
        date: '',
    });

    const seats = Array.from({ length: 30 }, (_, i) => ({ id: i + 1, booked: Math.random() < 0.3 })); 
    
    const totalSeats = (seats) => {
        if(seats.booked){
            return 'booked';
        }

        if(selectedSeats.includes(seats.id)){
            setSelectedSeats(selectedSeats.filter(id => id !== seats.id));
        } else {
            setSelectedSeats([...selectedSeats, seats.id]);
        }   
    };

    const handleBooking = () => {
        if(!bookingData.name || selectedSeats.length === 0 || !selectedDate){
            Alert.alert('Error', 'Please fill all booking details');
            return;
        }

        const data = {
            movie: movie.title,
            name: bookingData.name,
            seats: selectedSeats,
            date: selectedDate,
        };

        setBookingData(data);
        setTicketBooked(true);
        setBookingVisible(false);
        setSelectedDate('');
        setSelectedSeats([]);

        Alert.alert('Success', 'Your tickets have been booked!');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity> 

            <Image 
                source={{ uri: `https:image.org\t\p\w500${movie.poster_path}` }} 
                style={styles.poster} 
            />

            <Text style={styles.title}>{movie.title}</Text>        
            <Text style={styles.info}>Release Date: {movie.release_date}</Text>
            <Text style={styles.info}>Rating: {movie.vote_average} / 10 </Text>
            <Text style={styles.overview}>{movie.overview}</Text>

            <TouchableOpacity style = {[styles.bookButton, ticketBooked && {backgroundColor: '#0c7424ff'}]} onPress={() => ticketBooked ? setBookingInfoVisible(true) : setBookingVisible(true)}>
                <Text style={styles.bookButtonText}>{ticketBooked ? 'View Booking' : 'Book Tickets'}</Text>
            </TouchableOpacity>

            <Modal visible={bookingName} animationType="slide" transparent={true}>
                <ScrollView style = {{ flex: 1, backgroundColor: 'rgba(12, 51, 92, 0.5)', padding: 20}}>
                    <Text style = {styles.modalTitle}>Booking Details</Text>
                    <Text style ={styles.heading}> select Date: </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="YYYY-MM-DD"
                        placeholderTextColor="#999"
                        value={selectedDate}
                        onChangeText={(text) => setSelectedDate(text)}
                    />
                    <Text style ={styles.heading}> Select Seats: </Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {seats.map((seat) => (
                            <TouchableOpacity
                                key={seat.id}   
                                onPress={() => totalSeats(seat)}
                                style={{
                                    width: 40,
                                    height: 40,
                                    margin: 5,
                                    backgroundColor: seat.booked ? '#ff4d4d' : selectedSeats.includes(seat.id) ? '#4caf50' : '#ccc',
                                    borderRadius: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={{ color: seat.booked ? '#fff' : '#000' }}>{seat.id}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                        <TouchableOpacity style={[styles.backButton, { marginTop: 20 }]} onPress={confirmBooking}>
                            <Text style ={styles.buttonText}> confirmBooking  </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.button, {backgroundColor: '#ff4d4d', marginTop: 10}]} onPress={() => setBookingVisible(false)}>
                            <Text style ={styles.buttonText}> Close </Text>
                        </TouchableOpacity>
                </ScrollView>
            </Modal>

            <Modal visible={bookingInfo} animationType="slide" transparent={true}>
                <View style = {{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.8)', justifyContent: 'center', alignItems: 'center', padding: 20}}>
                    <Text style = {styles.modalTitle}>Your Booking Info</Text>
                    <Text style ={styles.infoText}>Movie: {bookingData.movie}</Text>
                    <Text style ={styles.infoText}>Name: {bookingData.name}</Text>
                    <Text style ={styles.infoText}>Date: {bookingData.date}</Text>
                    <Text style ={styles.infoText}>Seats: {bookingData.seats.join(', ')}</Text>
                    <TouchableOpacity style={[styles.backButton, { marginTop: 20 }]} onPress={() => setBookingInfoVisible(false)}>
                        <Text style ={styles.buttonText}> Close </Text>
                    </TouchableOpacity>
                    </View>
            </Modal>
            </View>
                    

      
    );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 20 },
  back: { color: '#00bfff', fontSize: 16, marginBottom: 10 },
  image: { width: '100%', height: 400, borderRadius: 10 },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginVertical: 10 },
  subTitle: { color: '#ffcc00', fontSize: 16 },
  overview: { color: '#ccc', fontSize: 16, marginVertical: 15 },
  button: { backgroundColor: '#00bfff', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16 },
  heading: { color: '#fff', fontSize: 20, marginVertical: 10 },
  input: { backgroundColor: '#1c1c1c', color: '#fff', borderRadius: 8, paddingHorizontal: 15, height: 40, marginBottom: 10 }
});

