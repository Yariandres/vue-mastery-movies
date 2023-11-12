<template>
  <div class="bg-white shadow-sm p-8 rounded-lg flex flex-col gap-3">
    <h2 class="font-semibold text-center">My Favourite movies</h2>
    <div
      v-if="movies.length === 0"
      class="bg-orange-300 rounded-lg p-3 text-white text-center"
    >
      <h3 class="">No movies in your list...</h3>
      <p class="">Add movies to you list</p>
    </div>

    <div v-for="movie in movies" :key="movie.id">
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

<script setup lang="ts">
import { ref } from 'vue';
import { Movie } from '../types';
import { useStorage } from '@vueuse/core';

const movies = ref(useStorage('myList', [] as Movie[]));
</script>
