import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React from 'react';
import MovieDetails from './MovieDetails';
import Card from './card';
import axios from 'axios';

const API_KEY = '38bbfacfe933b107211efd7e442ca6f1';

export default function App() {
  const [movies, setMovies] = React.useState([]);
  const [selectedMovie, setSelectedMovie] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState('');
  const [genre, setGenre] = React.useState('');
  const [bookings, setBookings] = React.useState([]);
  const [viewBookings, setViewBookings] = React.useState(false);

  const genres = [
    { label: 'All', value: '' },
    { label: 'Action', value: '28' },
    { label: 'Comedy', value: '35' },
    { label: 'Drama', value: '18' },
    { label: 'Horror', value: '27' },
    { label: 'Romance', value: '10749' },
  ];

  React.useEffect(() => {
    fetchMovies();
  }, [genre]);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=1`;
      if (genre) url += `&with_genres=${genre}`;
      const response = await axios.get(url);
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching movies: ', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = (movie, seats, date, time, location) => {
    const newBooking = { movie, seats, date, time, location };
    setBookings([...bookings, newBooking]);
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#00bfff" />
      </View>
    );
  }

  if (selectedMovie) {
    return (
      <MovieDetails
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
        onBook={handleBook}
      />
    );
  }

  if (viewBookings) {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => setViewBookings(false)} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.header}>My Bookings</Text>
        {bookings.length === 0 ? (
          <Text style={{ color: '#fff', textAlign: 'center', marginTop: 20 }}>No bookings yet.</Text>
        ) : (
          bookings.map((b, index) => (
            <View key={index} style={styles.bookingCard}>
              <Text style={styles.bookingTitle}>{b.movie.title}</Text>
              <Text style={styles.bookingText}> Date: {b.date}</Text>
              <Text style={styles.bookingText}> Time: {b.time}</Text>
              <Text style={styles.bookingText}> Location: {b.location}</Text>
              <Text style={styles.bookingText}> Seats: {b.seats.join(', ')}</Text>
            </View>
          ))
        )}
      </ScrollView>
    );
  }

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🎬 Movie App</Text>

      <TextInput
        placeholder="Search Movies"
        placeholderTextColor="#888"
        style={styles.searchInput}
        value={search}
        onChangeText={setSearch}
      />

      <Picker
        selectedValue={genre}
        style={styles.picker}
        onValueChange={(itemValue) => setGenre(itemValue)}
      >
        {genres.map((g) => (
          <Picker.Item key={g.value} label={g.label} value={g.value} />
        ))}
      </Picker>

      <TouchableOpacity onPress={() => setViewBookings(true)} style={styles.button}>
        <Text style={styles.buttonText}>View My Bookings</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {filteredMovies.map(movie => (
          <Card key={movie.id} movie={movie} onPress={() => setSelectedMovie(movie)} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', paddingTop: 40 },
  header: { color: '#fff', fontSize: 28, fontWeight: 'bold', paddingLeft: 20, marginBottom: 10 },
  searchInput: {
    backgroundColor: '#1c1c1c',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 45,
    marginHorizontal: 20,
    marginBottom: 10,
    fontSize: 16,
  },
  picker: { color: '#fff', marginHorizontal: 20, marginBottom: 10, backgroundColor: '#1c1c1c', height: 50 },
  button: { backgroundColor: '#00bfff', padding: 12, borderRadius: 8, alignItems: 'center', marginHorizontal: 20, marginVertical: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' },
  backButton: { backgroundColor: '#00bfff', padding: 10, borderRadius: 8, alignItems: 'center', margin: 20 },
  backButtonText: { color: '#fff', fontSize: 16 },
  bookingCard: { backgroundColor: '#1E1E1E', marginHorizontal: 20, marginVertical: 10, padding: 15, borderRadius: 10 },
  bookingTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  bookingText: { color: '#ccc', fontSize: 14, marginBottom: 3 },
});
