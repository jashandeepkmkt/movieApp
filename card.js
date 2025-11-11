import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function Card({ movie, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        style={styles.image}
        source={{ uri: `https://image.tmdb.org/t/p/w300${movie.poster_path}` }}
      />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.rating}>⭐ {movie.vote_average}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    marginBottom: 15,
    width: 200,
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 180,
    height: 270,
    borderRadius: 8,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
  rating: {
    color: '#bbb',
    marginTop: 4,
  },
});
