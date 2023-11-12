<script setup lang="ts">
import { ref, computed } from 'vue';
import dataSource from '../dataSource.json';
import { useStorage } from '@vueuse/core';
import { Movie } from '../types';

const movies = ref(dataSource.movies);
const myFavMovies = ref(useStorage('myList', [] as Movie[]));

const getMovies = computed(() => {
  const movies = myFavMovies.value;
  const genres = movies.map((movie) => movie.genre);
  const genre = genres[Math.floor(Math.random() * genres.length)];
  const suggestedMovies = movies.filter((movie) => movie.genre === genre);
  return suggestedMovies;
});
</script>
<template>
  <div class="bg-white shadow-sm p-8 rounded-lg flex flex-col gap-3">
    <h2 class="font-semibold text-center">Movies you might like</h2>
    <div
      v-if="movies.length === 0"
      class="bg-orange-300 rounded-lg p-3 text-white text-center"
    >
      <h3 class="">No movies in your list...</h3>
      <p class="">Add movies to you list</p>
    </div>

    <div v-for="movie in getMovies" :key="movie.id">
      <div
        class="flex gap-3 bg-slate-50 p-3 rounded-lg items-center font-thin justify-between"
      >
        <p>{{ movie.title }}</p>
        <div class="flex gap-2">
          <p>{{ movie.genre }}</p>
          |
          <p>{{ movie.rating_score }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
