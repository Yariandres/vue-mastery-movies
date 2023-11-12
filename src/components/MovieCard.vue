<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import baseInput from './BaseInput.vue';
import type { Movie, Reviews } from '../types';
import { useStorage } from '@vueuse/core';

interface Review {
  id: number;
  username: string;
  comment: string;
  rating: number;
}

const props = defineProps<{
  movie: Movie;
}>();

const checked = ref<boolean>(false);
const myList = ref(useStorage('myList', [] as Movie[]));
const isFavourite = ref<boolean>();
const ratingScore = ref<number>(0);

const newReview = reactive<Review>({
  id: Math.floor(Math.random() * 1000),
  username: '',
  comment: '',
  rating: 0,
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

const addReview = () => {
  props.movie.reviews.push(newReview);
  checked.value = false;
  averageRating(props.movie.reviews);
};

const averageRating = (reviews: Reviews[]) => {
  const ratings = reviews.map((review) => review.rating);
  const score = ratings.reduce((a, b) => a + b, 0) / ratings.length;
  ratingScore.value = Number(score.toFixed(1));
};

onMounted(() => {
  isInMyList();
  averageRating(props.movie.reviews);
});
</script>

<template>
  <div class="bg-white shadow-sm p-8 rounded-lg flex flex-col gap-3">
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
      Rating Score: <span class="font-light">{{ ratingScore }} / 10</span>
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

    <div class="flex justify-end">
      <div class="flex items-center">
        <input
          type="checkbox"
          class="form-checkbox h-5 w-5 text-blue-600"
          v-model="checked"
        />
        <label class="ml-2 text-gray-700">Review & Rate</label>
      </div>
    </div>

    <form
      v-if="checked"
      class="flex flex-col gap-2"
      @submit.prevent="addReview"
    >
      <base-input
        v-model="newReview.username"
        label="Name"
        placeholder="Enter your Name"
        class="p-2 font-light"
        required
      />
      <base-input
        v-model="newReview.comment"
        label="Comment"
        placeholder="Enter your comment"
        class="p-2 font-light"
        required
      />
      <base-input
        type="number"
        min="1"
        max="5"
        v-model.number="newReview.rating"
        label="Your rating score?"
        placeholder="Enter your rating"
        class="p-2 font-light"
        required
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
