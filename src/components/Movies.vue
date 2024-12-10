<script>
import axios from 'axios';
import NoImage from '../assets/images/no-image-white.png';
import NoImageDark from '../assets/images/no-image-dark.png';
import MovieDetail from './MovieDetail.vue';

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export default {
  components: {
    MovieDetail
  },
  props: {
    searchQuery: {
      type: String,
      default: 'Life'
    }
  },
  data() {
    return {
      movies: [],
      isMovieDetailVisible: false,
      selectedMovie: null, 
      genres: [],
      currentPage: 1,
      totalPages: 0,
    };
  },
  computed: {
    gridClass() {
      return this.isMovieDetailVisible
        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        : 'grid grid-cols-1 xxs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6';
    },
    resultsTitle() {
        return this.searchQuery.trim() === '' ? 'Most Popular Movies' : `Results for: "${this.searchQuery}"`;
    },
  },
  methods: {
    async selectMovie(index) {
      const movieId = this.movies[index].id; 

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
        );
        const detailedMovie = response.data;

        const { director, actors } = await this.fetchMovieCredits(movieId);

        const movieGenres = detailedMovie.genres ? detailedMovie.genres.map(genre => genre.name) : ['Unknown'];

        this.selectedMovie = {
          title: detailedMovie.title,
          year: detailedMovie.release_date ? detailedMovie.release_date.split('-')[0] : 'Unknown',
          source: detailedMovie.poster_path
            ? `https://image.tmdb.org/t/p/w500${detailedMovie.poster_path}`
            : NoImage,
          id: detailedMovie.id,
          runtime: detailedMovie.runtime || 'Unknown',
          director: director,
          writer: 'Unknown', 
          country: detailedMovie.production_countries ? detailedMovie.production_countries.map(country => country.name).join(', ') : 'Unknown',
          language: detailedMovie.spoken_languages ? detailedMovie.spoken_languages.map(language => language.name).join(', ') : 'Unknown',
          actors: actors,
          overview: detailedMovie.overview,
          vote_average: detailedMovie.vote_average,
          summary: detailedMovie.overview,
          genres: movieGenres,
        };

        this.isMovieDetailVisible = true;

      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    },
    
    async fetchMovieCredits(movieId) {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
        );
        
        // Yönetmeni buluyoruz
        const director = response.data.crew.find(member => member.job === 'Director')?.name || 'Unknown';
        
        // İlk 3 aktörü alıyoruz
        const actors = response.data.cast.slice(0, 3).map(actor => actor.name).join(', ') || 'Unknown';
        
        return { director, actors };
      } catch (error) {
        console.error("Error fetching movie credits:", error);
        return { director: 'Unknown', actors: 'Unknown' };
      }
    },

    closeDetail() {
      this.isMovieDetailVisible = false;
      this.selectedMovie = null;
    },

    async fetchMovies() {
      try {
        let url = '';
        if (this.searchQuery.trim() === '') {
          // searchQuery boşsa popüler filmleri al
          url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${this.currentPage}`;
        } else {
          // searchQuery varsa arama yap
          url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${this.searchQuery}&page=${this.currentPage}`;
        }

        const response = await axios.get(url);
        this.movies = response.data.results.map(movie => ({
          title: movie.title,
          year: movie.release_date ? movie.release_date.split('-')[0] : 'Unknown',
          source: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : NoImageDark,
          id: movie.id,
          runtime: movie.runtime,
          director: movie.director || 'Unknown',
          country: movie.production_countries ? movie.production_countries.map(country => country.name).join(', ') : 'Unknown',
          language: movie.spoken_languages ? movie.spoken_languages.map(language => language.name).join(', ') : 'Unknown',
          actors: movie.cast ? movie.cast.slice(0, 3).map(actor => actor.name).join(', ') : 'Unknown',
          overview: movie.overview,
          vote_average: movie.vote_average,
          summary: movie.overview,
        }));
        this.totalPages = response.data.total_pages; // Toplam sayfa sayısını güncelle
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    },

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage += 1; 
      this.fetchMovies();
    }
  },

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.fetchMovies(); 
    }
  },

  },

  watch: {
    searchQuery: function(newQuery) {
      // Reset currentPage to 1 when searchQuery changes
      this.currentPage = 1;
      this.fetchMovies();
    }
  },

  mounted() {
    this.fetchMovies();
  },
};
</script>

<template>
  <div class="flex flex-col w-full p-4 bg-white dark:bg-[#272727] dark:text-white">
    <p class="text-xl mt-28 sm:mt-16">{{ resultsTitle }}</p>
    <p class="mb-5">Page: {{ currentPage }}/{{ totalPages }}</p>
    <div class="flex">
      <div class="w-full">
        <div :class="gridClass" class="gap-3">
          <div
            v-for="(movie, index) in movies"
            :key="index"
            @click="selectMovie(index)"
            :class="[ 'w-full rounded-md block cursor-pointer', selectedMovie === movie && isMovieDetailVisible ? 'bg-slate-700' : '' ]"
          >
            <img
              :src="movie.source"
              alt="movie"
              class="rounded-md mb-2 w-full h-64 object-cover object-center"
            />
            <h2 class="text-lg font-semibold">{{ movie.title }}</h2>
            <p class="text-sm text-gray-400">{{ movie.year }}</p>
          </div>
        </div>
        
        <div class="flex justify-start mt-4">
          <button 
            v-if="currentPage > 1"
            @click="previousPage"
            class="px-4 py-1 mr-3 bg-gray-800 dark:bg-slate-300 text-white dark:text-black rounded-md"
          >
            Previous
          </button>
          
          <button 
            v-if="currentPage < totalPages"
            @click="nextPage"
            class="px-4 py-1 bg-gray-800 dark:bg-slate-300 dark:text-black text-white rounded-md"
          >
            Next
          </button>
        </div>
      </div>

      <div v-if="isMovieDetailVisible" class="w-full ml-10">
        <MovieDetail :movie="selectedMovie" @close-detail="closeDetail" />
      </div>
    </div>
  </div>
</template>