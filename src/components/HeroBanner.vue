<script setup lang="ts">
import type { Movie } from '@/types/tmdb'
import { getTmdbImageUrl } from '@/lib/tmdb-image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Play, Info, Star } from '@lucide/vue'

const props = defineProps<{
  movie: Movie | null
}>()

const emit = defineEmits<{
  (e: 'play', movie: Movie): void
  (e: 'more-info', movie: Movie): void
}>()
</script>

<template>
  <div v-if="movie" class="relative w-full h-[65vh] min-h-105 max-h-170 overflow-hidden bg-background">
        <!-- Background Backdrop Image -->
    <img
      :src="getTmdbImageUrl(movie.backdrop_path, 'original')"
      :alt="movie.title"
      class="absolute inset-0 h-full w-full object-cover object-center brightness-90"
    />

    <!-- Cinematic Vignette & Gradients -->
    <!-- 1. Bottom fade into page background -->
    <div class="absolute inset-0 bg-linear-to-* from-background via-background/60 to-transparent" />
    
    <!-- 2. Deep dark overlay on the left so white text is crisp -->
    <div class="absolute inset-0 bg-linear-to-* from-black/90 via-black/60 to-transparent w-full md:w-3/4" />

    <!-- 3. Subtle overall dark tint -->
    <div class="absolute inset-0 bg-black/20" />
    <!-- Content on top of backdrop -->
    <div class="container relative mx-auto h-full px-4 sm:px-8 flex flex-col justify-end pb-12 sm:pb-16 z-10">
      <div class="max-w-2xl space-y-4">
        
        <!-- Tags / Badges -->
        <div class="flex items-center gap-2">
          <Badge class="bg-red-600 text-white hover:bg-red-700 font-semibold px-2.5 py-0.5 uppercase tracking-wider text-[11px]">
            Featured
          </Badge>
          <div class="flex items-center gap-1 text-xs text-yellow-400 font-semibold">
            <Star class="h-3.5 w-3.5 fill-yellow-400" />
            <span>{{ movie.vote_average.toFixed(1) }}</span>
          </div>
          <span class="text-xs text-muted-foreground">
            {{ movie.release_date?.slice(0, 4) }}
          </span>
        </div>

        <!-- Movie Title -->
        <h1 class="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white drop-shadow-md">
          {{ movie.title }}
        </h1>

        <!-- Overview Synopsis (line-clamped for clean layout) -->
        <p class="text-sm sm:text-base text-gray-300 line-clamp-3 leading-relaxed drop-shadow">
          {{ movie.overview }}
        </p>

        <!-- Action Buttons -->
        <div class="flex items-center gap-3 pt-2">
          <Button
            size="lg"
            class="bg-white text-black hover:bg-gray-200 font-bold px-6 shadow-lg gap-2"
            @click="emit('play', movie)"
          >
            <Play class="h-4 w-4 fill-black" />
            Watch Now
          </Button>

          <Button
            size="lg"
            variant="secondary"
            class="bg-secondary/70 backdrop-blur-md hover:bg-secondary text-foreground font-semibold px-5 gap-2"
            @click="emit('more-info', movie)"
          >
            <Info class="h-4 w-4" />
            More Info
          </Button>
        </div>

      </div>
    </div>
  </div>
</template>