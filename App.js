/*
  I Jashandeep Kaur , 000900507 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
  */
 
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, TextInput, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import Card from './card';
import MovieDetails from './MovieDetails';

const API_KEY = '38bbfacfe933b107211efd7e442ca6f1';

export default function App() {
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [popular, setPopular] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [bookings, setBookings] = useState([]);
  const [showBookings, setShowBookings] = useState(false);

  const genres = [
    { label: 'All', value: '' },
    { label: 'Action', value: '28' },
    { label: 'Comedy', value: '35' },
    { label: 'Drama', value: '18' },
    { label: 'Horror', value: '27' },
    { label: 'Romance', value: '10749' },
  ];

  useEffect(() => {
    fetchAllMovies();
  }, [genre]);

  const fetchMoviesByCategory = async (category, genre = '') => {
    let url = '';
    switch(category) {
      case 'trending':
        url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;
        break;
      case 'top_rated':
        url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=1`;
        break;
      case 'popular':
        url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=1`;
        break;
      case 'upcoming':
        url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=1`;
        break;
      case 'now_playing':
        url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=1`;
        break;
      default:
        return [];
    }
    if (genre) url += `&with_genres=${genre}`;
    try {
      const response = await axios.get(url);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching movies: ', error);
      return [];
    }
  };

  const fetchAllMovies = async () => {
    setLoading(true);
    const [trend, top, pop, upc, now] = await Promise.all([
      fetchMoviesByCategory('trending', genre),
      fetchMoviesByCategory('top_rated', genre),
      fetchMoviesByCategory('popular', genre),
      fetchMoviesByCategory('upcoming', genre),
      fetchMoviesByCategory('now_playing', genre),
    ]);
    setTrending(trend);
    setTopRated(top);
    setPopular(pop);
    setUpcoming(upc);
    setNowPlaying(now);
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#00bfff" />
      </View>
    );
  }

  const filterMovies = (list) =>
    list.filter(movie => movie.title.toLowerCase().includes(search.toLowerCase()));

  const Section = ({ title, data }) => (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.section}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {filterMovies(data).map(movie => (
          <Card
            key={movie.id}
            movie={movie}
            onPress={() => setSelectedMovie(movie)}
          />
        ))}
      </ScrollView>
    </View>
  );

  const handleBooking = (movie, seats) => {
    setBookings([...bookings, { movie, seats }]);
  };

  const BookingModal = () => (
    <Modal visible={showBookings} animationType="slide">
      <View style={styles.bookingContainer}>
        <Text style={styles.section}>My Bookings</Text>
        {bookings.length === 0 ? (
          <Text style={{ color: '#fff', fontSize: 18 }}>No bookings yet.</Text>
        ) : (
          <FlatList
            data={bookings}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.bookingItem}>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
                  {item.movie.title}
                </Text>
                <Text style={{ color: '#fff' }}>Seats: {item.seats.join(', ')}</Text>
              </View>
            )}
          />
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowBookings(false)}
        >
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🎬 Movie App</Text>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search Movies"
          placeholderTextColor="#aaa"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <Picker
        selectedValue={genre}
        style={styles.picker}
        onValueChange={(itemValue) => setGenre(itemValue)}
      >
        {genres.map((g) => (
          <Picker.Item key={g.value} label={g.label} value={g.value} />
        ))}
      </Picker>

      <TouchableOpacity
        style={[styles.button, { marginHorizontal: 20 }]}
        onPress={() => setShowBookings(true)}
      >
        <Text style={styles.buttonText}>View My Bookings</Text>
      </TouchableOpacity>

      <ScrollView>
        <Section title="Trending" data={trending} />
        <Section title="Top Rated" data={topRated} />
        <Section title="Popular" data={popular} />
        <Section title="Upcoming" data={upcoming} />
        <Section title="Now Playing" data={nowPlaying} />
      </ScrollView>

      <StatusBar style="auto" />
      {showBookings && <BookingModal />}
      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onBook={handleBooking} // pass booking function
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', paddingTop: 50 },
  header: { color: '#fff', fontSize: 28, fontWeight: 'bold', paddingLeft: 20, marginBottom: 10 },
  section: { color: '#fff', fontSize: 22, fontWeight: 'bold', paddingLeft: 20, marginVertical: 10 },
  searchContainer: { marginHorizontal: 20, marginBottom: 10 },
  searchInput: {
    backgroundColor: '#1c1c1c',
    color: '#fff',
    borderRadius: 12,
    paddingHorizontal: 20,
    height: 50,
    fontSize: 18,
  },
  picker: {
    color: '#fff',
    marginHorizontal: 20,
    marginBottom: 15,
    backgroundColor: '#1c1c1c',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#00bfff',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' },
  bookingContainer: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    alignItems: 'center',
  },
  bookingItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#1c1c1c',
    borderRadius: 8,
    width: '100%',
  },
});
