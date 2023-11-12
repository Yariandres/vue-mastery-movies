<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import baseInput from './BaseInput.vue';
import type { Movie } from './MovieShow.vue';
import dataSource from '../dataSource.json';
import { useStorage } from '@vueuse/core';

interface Review {
  id?: number;
  username: string;
  comment: string;
  rating: string;
}

const props = defineProps<{
  movie: Movie;
}>();

const checked = ref<boolean>(false);
const myList = ref(useStorage('myList', [] as Movie[]));
const isFavourite = ref<boolean>();

const newReview = ref<Review>({
  id: 1, //todo: match it to the user id
  username: '',
  comment: '',
  rating: '',
});

const isInMyList = () => {
  const isFav = myList.value.some((movie) => movie.id === props.movie.id);
  if (isFav) {
    isFavourite.value = true;
  } else if (!isFav) {
    isFavourite.value = false;
  }
};

const addToMyList = () => {
  myList.value.push(props.movie);
  useStorage('myList', myList.value);
  isInMyList();
};

const removeFromMyList = () => {
  myList.value = myList.value.filter((movie) => movie.id !== props.movie.id);
  useStorage('myList', myList.value);
  isInMyList();
};

onMounted(() => {
  isInMyList();
});
</script>

<template>
  <div
    class="bg-white font-bold shadow-sm p-8 rounded-lg flex flex-col gap-3 min-w-max"
  >
    <div class="flex justify-end">
      <svg
        v-if="!isFavourite"
        xmlns="http://www.w3.org/2000/svg"
        class="h-7 w-7 text-green-600 cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        @click="addToMyList"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
      <!-- remove svg -->
      <svg
        v-if="isFavourite"
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-red-900 hover:text-yellow-600 cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        @click="removeFromMyList"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>

    <h2 class="text-xl text-center">{{ movie.title }}</h2>
    <p class="font-medium">
      Year: <span class="font-light">{{ movie.release_year }}</span>
    </p>
    <p class="font-medium">
      Genre: <span class="font-light">{{ movie.genre }}</span>
    </p>
    <p class="font-medium">
      Rating Score: <span class="font-light">{{ movie.rating_score }}</span>
    </p>
    <hr />
    <h2 class="text-xl text-center">Reviews</h2>

    <div v-for="review in movie.reviews" :key="review.id">
      <div class="flex justify-between">
        <div>
          <p class="font-medium">{{ review.username }}:</p>
          <p class="font-light">"{{ review.comment }}"</p>
        </div>
        <p class="font-medium">
          Reted: <span class="font-light">{{ review.rating }}</span>
        </p>
      </div>
      <hr />
    </div>
    <!-- edit input field when checked displys form -->
    <div class="flex justify-end">
      <div class="flex items-center">
        <input
          type="checkbox"
          class="form-checkbox h-5 w-5 text-blue-600"
          v-model="checked"
        />
        <label class="ml-2 text-gray-700">Add Review</label>
      </div>
    </div>

    <form v-if="checked" class="flex flex-col gap-2">
      <base-input
        v-model="newReview.username"
        label="Username"
        placeholder="Enter your username"
        class="p-2"
      />
      <base-input
        v-model="newReview.comment"
        label="Comment"
        placeholder="Enter your comment"
        class="p-2"
      />
      <base-input
        type="number"
        min="1"
        max="5"
        v-model="newReview.rating"
        label="Your rating score?"
        placeholder="Enter your rating"
        class="p-2"
      />
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  </div>
</template>
