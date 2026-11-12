<script setup lang="ts">
import type { Movie } from '@/types/tmdb'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getTmdbImageUrl } from '@/lib/tmdb-image'

const props = defineProps<{
  movie: Movie
}>()

// Format rating to 1 decimal place (e.g. 7.8)
const formattedRating = props.movie.vote_average.toFixed(1)

// Extract 4-digit year from "2024-05-12"
const releaseYear = props.movie.release_date ? props.movie.release_date.slice(0, 4) : 'N/A'
</script>

<template>
  <Card class="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/50 cursor-pointer">
    <!-- Movie Poster Container with aspect ratio -->
    <div class="relative aspect-[2/3] w-full overflow-hidden bg-muted">
      <img
        :src="getTmdbImageUrl(movie.poster_path, 'w500')"
        :alt="movie.title"
        class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />

      <!-- Floating Rating Badge -->
      <Badge
        variant="secondary"
        class="absolute top-2.5 right-2.5 font-semibold backdrop-blur-md bg-background/20 shadow-sm text-yellow-500"
      >
        ★ {{ formattedRating }}
      </Badge>
    </div>

    <!-- Movie Details -->
    <CardContent class="p-4 space-y-1">
      <h3 class="font-semibold text-base leading-tight truncate text-foreground group-hover:text-primary transition-colors" :title="movie.title">
        {{ movie.title }}
      </h3>
      <p class="text-xs text-muted-foreground">
        {{ releaseYear }}
      </p>
    </CardContent>
  </Card>
</template>