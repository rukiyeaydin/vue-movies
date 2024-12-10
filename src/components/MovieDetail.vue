<script>
export default {
  props: {
    movie: Object, 
  },
  methods: {
    closeDetail() {
      this.$emit('close-detail');
    }
  }
};
</script>

<template>
    <div class="custom-scrollbar my-2 bg-primary border dark:border-gray-700 h-[600px] overflow-y-auto shadow-shadowSidebar fixed w-1/2 top-32 sm:top-20 right-2">
      <div class="bg-gray-200 dark:bg-[#303030] w-full flex items-center justify-center relative">
        <i class="absolute top-3 left-3 fa-solid fa-xmark dark:bg-[#4f4f4f] hover:bg-slate-100 dark:hover:bg-[#626262] cursor-pointer p-2 rounded-lg" @click="closeDetail"></i>
        <img :src="movie.source || ''" alt="movie" class="h-72" v-if="movie" />
      </div>

      <div class="py-5 px-3 grid gap-3 bg-white dark:bg-[#272727]"  v-if="movie">
            <p class="text-2xl font-semibold">{{ movie.title }}</p>
            <p>
                <span class="dark:text-gray-300 font-semibold">Released: </span>
                <span class="dark:text-gray-400">{{ movie.year || 'Unknown' }}</span>
            </p>
            <p>
                <span class="dark:text-gray-300 font-semibold">Runtime: </span>
                <span class="dark:text-gray-400">{{ movie.runtime }}</span>
            </p>
            <p>
                <span class="dark:text-gray-300 font-semibold">Genres: </span>
                <span class="dark:text-gray-400">{{ movie.genres.join(', ') }}</span>
            </p>
            <p>
                <span class="dark:text-gray-300 font-semibold">Director: </span>
                <span class="dark:text-gray-400">{{ movie.director }}</span>
            </p>
            <p>
                <span class="dark:text-gray-300 font-semibold">Country: </span>
                <span class="dark:text-gray-400">{{ movie.country }}</span>
            </p>
            <p>
                <span class="dark:text-gray-300 font-semibold">Language: </span>
                <span class="dark:text-gray-400">{{ movie.language }}</span>
            </p>
            <p>
                <span class="dark:text-gray-300 font-semibold">Actors: </span>
                <span class="dark:text-gray-400">{{ movie.actors }}</span>
            </p>
            <p>
                <span class="dark:text-gray-300 font-semibold">Summary:</span>
                <br>
                <span class="dark:text-gray-400">{{ movie.overview }}</span>
            </p>

        </div>

    </div>
  </template>

<style scoped>

.custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #eab308 #303030; 
}


.custom-scrollbar::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: #303030; 
    border-radius: 8px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #eab308; 
    border-radius: 8px; 
    border: 2px solid #303030; 
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #ffdc69;
}

</style>