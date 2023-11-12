<script setup lang="ts">
import { ref, computed } from 'vue';
import BaseInput from './BaseInput.vue';
import BaseSelect from './BaseSelect.vue';
import MovieCard from './MovieCard.vue';
import dataSource from '../dataSource.json';

export interface Movie {
  id: number;
  title: string;
  releaseYear: number;
  genre: string;
  rating: number;
}

const movies = ref<Movie[]>(dataSource.movies);
const search = ref<string>('');
const genres = ref<string>('');

const filteredMovies = computed(() => {
  if (search.value !== '') {
    return movies.value.filter((movie) => {
      return (
        movie.title.toLowerCase().includes(search.value.toLowerCase()) ||
        movie.releaseYear.toString() === search.value
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
</script>

<template>
  <div class="px-8 md:px-40 my-16">
    <h1 class="text-3xl font-bold mb-8 text-center">Movies</h1>

    <div class="flex flex-col gap-6 bg-slate-100 px-8 py-12 rounded-lg">
      <div class="flex gap-4 mb-4 w-96 mx-auto">
        <base-input
          v-model="search"
          type="text"
          placeholder="Search for a movie"
          class="border border-gray-300 rounded-md p-2 flex-grow"
        />
        <base-select v-model="genres" />
      </div>

      <div
        class="rounded-xl grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        <movie-card
          v-for="movie in filteredMovies"
          :key="movie.title"
          :filtered-movies="filteredMovies"
          :movie="movie"
        />
      </div>

      <div v-if="filteredMovies.length === 0" class="text-center">
        <p class="text-xl">
          No movies found for <span class="font-bold">{{ genres }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
