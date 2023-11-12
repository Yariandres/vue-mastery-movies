import { ref, computed } from 'vue';
import { useStorage } from '@vueuse/core';
import { Movie } from '../types';

export default function useMovieFilter() {
  const movies = ref(useStorage('movies', [] as Movie[]));
  const search = ref('');
  const genres = ref('');

  const filteredMovies = computed(() => {
    if (search.value !== '') {
      return movies.value.filter((movie) => {
        return (
          movie.title.toLowerCase().includes(search.value.toLowerCase()) ||
          movie.release_year.toString() === search.value
        );
      });
    } else if (genres.value !== '') {
      return movies.value.filter((movie) => {
        return movie.genre.toLowerCase().includes(genres.value.toLowerCase());
      });
    } else {
      return movies.value;
    }
  });

  return { movies, search, genres, filteredMovies };
}
