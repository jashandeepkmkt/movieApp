import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function Card({ movie, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        style={styles.image}
        source={{ uri: `https://image.tmdb.org/t/p/w300${movie.poster_path}` }}
      />
      <Text style={styles.title} numberOfLines={1}>{movie.title}</Text>
      <Text style={styles.rating}>⭐ {movie.vote_average}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    marginHorizontal: 10,
    width: 140,
    alignItems: 'center',
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  image: {
    width: 130,
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
    fontSize: 14,
  },
  rating: {
    color: '#ffd700',
    marginTop: 4,
    fontSize: 12,
  },
});
