<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { tmdbFetch } from '@/api/tmdb'
import type { Movie, TmdbPaginatedResponse } from '@/types/tmdb'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import HeroBanner from '@/components/HeroBanner.vue'
import MovieCard from '@/components/MovieCard.vue'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import MovieDetailsDialog from '@/components/MovieDetailsDialog.vue'
import VideoPlayerModal from '@/components/VideoPlayerModal.vue'

// 1. Reactive state
const movies = ref<Movie[]>([])
const isLoading = ref(true)
const errorMessage = ref<string | null>(null)
const currentCategory = ref('Popular Movies')

const selectedTab = ref('popular')

const categories = [
  { id: 'popular', label: 'Popular', endpoint: '/movie/popular' },
  { id: 'top_rated', label: 'Top Rated', endpoint: '/movie/top_rated' },
  { id: 'now_playing', label: 'Now Playing', endpoint: '/movie/now_playing' },
  { id: 'upcoming', label: 'Upcoming', endpoint: '/movie/upcoming' },
]

const isDetailsOpen = ref(false)
const selectedMovie = ref<Movie | null>(null)

const isPlayerOpen = ref(false)
const playingMovie = ref<Movie | null>(null)

function handleMoreInfo(movie: Movie) {
  selectedMovie.value = movie
  isDetailsOpen.value = true
}

function handleTabChange(tabId: string | number) {
  selectedTab.value = String(tabId)
  const category = categories.find((c) => c.id === tabId)
  if (category) {
    currentCategory.value = category.label
    fetchMovies(category.endpoint)
  }
}

// 2. Featured movie for the Hero Banner (the first movie in the list)
const featuredMovie = computed(() => {
  return movies.value.length > 0 ? movies.value[0] : null
})

// 3. Fetch movies (supports popular or search)
async function fetchMovies(endpoint = '/movie/popular', params: Record<string, string | number> = {}) {
  isLoading.value = true
  errorMessage.value = null

  try {
    const data = await tmdbFetch<TmdbPaginatedResponse<Movie>>(endpoint, params)
    movies.value = data.results
  } catch (err) {
    errorMessage.value = err instanceof Error ? err.message : 'Failed to load movies'
    console.error('Fetch error:', err)
  } finally {
    isLoading.value = false
  }
}

// 4. Handle search from Navbar
function handleSearch(query: string) {
  if (query) {
    currentCategory.value = `Search Results for "${query}"`
    fetchMovies('/search/movie', { query })
  } else {
    currentCategory.value = 'Popular Movies'
    fetchMovies('/movie/popular')
  }
}

// 5. Placeholder actions for Watch / More Info
function handlePlay(movie: Movie) {
  playingMovie.value = movie
  isPlayerOpen.value = true
  // Close the details modal if it was open so the player takes focus
  isDetailsOpen.value = false
}  

onMounted(() => {
  fetchMovies()
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-red-500 selection:text-white">
    <!-- 1. Header / Navbar -->
    <Navbar @search="handleSearch" />

    <!-- 2. Hero Banner (or Loading Skeleton for Banner) -->
    <div v-if="isLoading && movies.length === 0" class="w-full h-[60vh] max-h-162.5:">
      <Skeleton class="h-full w-full rounded-none" />
    </div>
    <HeroBanner
      v-else-if="featuredMovie"
      :movie="featuredMovie"
      @play="handlePlay"
      @more-info="handleMoreInfo"
    />

    <!-- 3. Main Content Area -->
    <main class="container mx-auto flex-1 px-4 sm:px-8 py-10">
      
            <!-- Section Title & Category Filter Tabs -->
      <div class="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-5">
        <div>
          <h2 class="text-2xl sm:text-3xl font-bold tracking-tight">
            {{ currentCategory }}
          </h2>
          <p class="text-sm text-muted-foreground mt-1">
            Explore curated titles, high-definition streams, and top releases
          </p>
        </div>

        <!-- Shadcn Tabs Switcher -->
        <Tabs :model-value="selectedTab" @update:model-value="handleTabChange" class="w-auto">
          <TabsList class="grid grid-cols-4 h-10 bg-muted/60 p-1">
            <TabsTrigger
              v-for="cat in categories"
              :key="cat.id"
              :value="cat.id"
              class="text-xs sm:text-sm font-medium px-3 sm:px-4 cursor-pointer"
            >
              {{ cat.label }}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <!-- Error State -->
      <div v-if="errorMessage" class="rounded-xl border border-destructive/50 bg-destructive/10 p-8 text-center space-y-4 max-w-md mx-auto my-12">
        <p class="text-destructive font-medium">{{ errorMessage }}</p>
        <Button variant="outline" @click="() => fetchMovies()">Try Again</Button>
      </div>

      <!-- Loading Skeletons for Grid -->
      <div
        v-else-if="isLoading"
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
      >
        <div v-for="n in 10" :key="n" class="space-y-3">
          <Skeleton class="aspect-2/3 w-full rounded-xl" />
          <Skeleton class="h-4 w-3/4 rounded" />
          <Skeleton class="h-3 w-1/3 rounded" />
        </div>
      </div>

      <!-- Empty Search Results -->
      <div v-else-if="movies.length === 0" class="text-center py-20 space-y-3">
        <p class="text-lg font-semibold">No movies found</p>
        <p class="text-sm text-muted-foreground">Try searching for a different title or keyword.</p>
        <Button variant="secondary" @click="() => handleSearch('')">Reset to Popular</Button>
      </div>

      <!-- Movie Grid -->
      <div
        v-else
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
      >
        <MovieCard
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
          @click="handleMoreInfo(movie)"
        />
      </div>

    </main>

    <!-- 4. Footer -->
    <Footer />
  </div>
      <!-- Movie Details Modal -->
    <MovieDetailsDialog
      v-model:open="isDetailsOpen"
      :movie="selectedMovie"
      @play="handlePlay"
    />
        <!-- Video / Stream Player Modal -->
    <VideoPlayerModal
      v-model:open="isPlayerOpen"
      :movie="playingMovie"
    />
</template>