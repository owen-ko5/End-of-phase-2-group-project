import React from 'react';
import { useNavigate } from 'react-router-dom';
const MovieCard = ({ movie }) => {
    const navigate = useNavigate();
    const { id, title, name, poster_path, release_date, first_air_date, overview } = movie;
}