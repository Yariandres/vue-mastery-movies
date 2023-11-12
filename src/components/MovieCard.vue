<script setup lang="ts">
import { ref } from 'vue';
import baseInput from './BaseInput.vue';
import type { Movie } from './MovieShow.vue';
import dataSource from '../dataSource.json';

const props = defineProps<{
  movie: Movie;
}>();

const rating = ref<number>(props.movie.rating);

const rateMovie = () => {
  const movies = dataSource.movies;
  const movieIndex = movies.findIndex((movie) => movie.id === props.movie.id);

  movies[movieIndex].rating = rating.value;
};
</script>

<template>
  <div
    class="bg-white font-bold shadow-sm p-8 rounded-lg flex flex-col gap-3 min-w-max"
  >
    <h2 class="text-xl text-center">{{ movie.title }}</h2>
    <p class="text-gray-500">Year: {{ movie.releaseYear }}</p>
    <p class="text-gray-500">Genre: {{ movie.genre }}</p>
    <p class="text-gray-500">Rating: {{ movie.rating }}</p>

    <form class="flex flex-col gap-2" @:submit.prevent="rateMovie">
      <base-input
        :label="'Rate it from 1 to 5:'"
        type="number"
        v-model.number="rating"
        min="1"
        max="5"
        class="border border-gray-300 rounded-md p-2 text-center"
      />
      <button
        type="submit"
        class="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  </div>
</template>
