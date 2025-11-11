import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, TextInput } from 'react-native';
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
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
      if (genre) url += `&with_genres=${genre}`;
      const response = await axios.get(url);
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching movies: ', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (selectedMovie) {
    return (
      <MovieDetails
        movie={selectedMovie}
        onBack={() => setSelectedMovie(null)}
      />
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

      <StatusBar style="auto" />

      <Text style={styles.section}>All Movies</Text>
      <ScrollView>
        {filteredMovies.map(movie => (
          <Card key={movie.id} movie={movie} onPress={() => setSelectedMovie(movie)} />
        ))}
      </ScrollView>

      <Text style={styles.section}>Trending Movies</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {filteredMovies.map(movie => (
          <Card key={movie.id} movie={movie} onPress={() => setSelectedMovie(movie)} />
        ))}
      </ScrollView>

      <Text style={styles.section}>Top Rated Movies</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {filteredMovies.map(movie => (
          <Card key={movie.id} movie={movie} onPress={() => setSelectedMovie(movie)} />
        ))}
      </ScrollView>

      <Text style={styles.section}>Upcoming Movies</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {filteredMovies.map(movie => (
          <Card key={movie.id} movie={movie} onPress={() => setSelectedMovie(movie)} />
        ))}
      </ScrollView>

      <Text style={styles.section}>Now Playing Movies</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {filteredMovies.map(movie => (
          <Card key={movie.id} movie={movie} onPress={() => setSelectedMovie(movie)} />
        ))}
      </ScrollView>

      <Text style={styles.section}>Popular Movies</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {filteredMovies.map(movie => (
          <Card key={movie.id} movie={movie} onPress={() => setSelectedMovie(movie)} />
        ))}
      </ScrollView>

      <Text style={styles.section}>🆕 Newly Launched</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {filteredMovies.filter(movie => {
          const release = new Date(movie.release_date);
          const today = new Date();
          const diff = (today - release) / (1000 * 3600 * 24);
          return diff <= 30;
        }).map(movie => (
          <Card key={movie.id} movie={movie} onPress={() => setSelectedMovie(movie)} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    margin: 10,
  },
  picker: {
    marginHorizontal: 10,
  },
  section: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
    marginLeft: 10,
  },
});
