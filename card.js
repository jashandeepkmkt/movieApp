import React from "react";  
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function Card({ movie, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.card}>
            <Image 
                source={{ uri: `https:image.org\t\p\w300${movie.poster_path}` }}
                 style={styles.image} 
            />

            <Text style={styles.title} numberOfLines={3}>{movie.title}</Text>
            <Text style={styles.rating}>Rating: {movie.vote_average}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 150,
        margin: 10,
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#1c1c1c',
        borderRadius: 8,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    title: {
        marginTop: 5,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
    rating: {
        marginTop: 3,
        color: '#ffd700',
        fontSize: 14,       
    },

});