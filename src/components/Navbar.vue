<script setup>
import { ref, watch } from 'vue'

const darkMode = ref(true)
const searchQuery = ref('') 


const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
  if (darkMode.value) {
    document.documentElement.classList.remove('dark')
  } else {
    document.documentElement.classList.add('dark')
  }
}

const clickLogo = () => {
    // relaod page
    location.reload()
}

</script>


<template>
    <nav class="fixed w-full p-4 dark:text-white dark:bg-primary bg-gray-200 text-black">
        <div class="flex items-start justify-between">
            <div class="flex flex-col sm:flex-row items-start justify-between w-full">
                <h1 class="text-2xl font-bold cursor-pointer" @click="clickLogo">Movie App</h1>
                <input type="search" name="search input" id="" class="border rounded-md px-2 py-1 outline-none border-yellow-300 bg- dark:bg-primary mt-3 sm:mt-0" placeholder="Search in movies..."
                v-model="searchQuery"
                @input="$emit('update:searchQuery', searchQuery); console.log(searchQuery)" 
                >
            </div>
            <div>
                <button @click="toggleDarkMode" class="transition-transform duration-300 ease-in-out">
                    <i 
                        :class="darkMode ? 'fa-solid fa-moon' : 'fa-solid fa-sun'" 
                        class="text-xl transform transition-all duration-500 w-12"
                        :style="{ transform: darkMode ? 'rotate(360deg)' : 'rotate(180deg)' }"
                    ></i>
                </button>
            </div>
        </div>
    </nav>
</template>
