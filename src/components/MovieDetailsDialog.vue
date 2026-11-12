<script setup lang="ts">
import type { Movie } from '@/types/tmdb'
import { getTmdbImageUrl } from '@/lib/tmdb-image'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, Calendar, Users, Play } from '@lucide/vue'

const props = defineProps<{
  open: boolean
  movie: Movie | null
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'play', movie: Movie): void
}>()

function closeDialog() {
  emit('update:open', false)
}
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent class="sm:max-w-2xl p-0 overflow-hidden rounded-2xl bg-card border-border shadow-2xl">
      <div v-if="movie" class="flex flex-col">
        
        <!-- Header Banner with Backdrop Image -->
        <div class="relative h-64 sm:h-80 w-full overflow-hidden bg-muted">
          <img
            :src="getTmdbImageUrl(movie.backdrop_path || movie.poster_path, 'original')"
            :alt="movie.title"
            class="h-full w-full object-cover object-center"
          />
          <!-- Gradient so text and buttons pop -->
          <div class="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
          
          <!-- Rating badge pinned on image -->
          <div class="absolute bottom-4 left-6 flex items-center gap-2">
            <Badge class="bg-yellow-500/90 text-black font-bold text-xs gap-1 px-2.5 py-1 backdrop-blur-md">
              <Star class="h-3.5 w-3.5 fill-black" />
              {{ movie.vote_average.toFixed(1) }} / 10
            </Badge>
            <Badge variant="secondary" class="backdrop-blur-md bg-background/80 text-xs">
              <Users class="h-3 w-3 mr-1" />
              {{ movie.vote_count.toLocaleString() }} votes
            </Badge>
          </div>
        </div>

        <!-- Details Content -->
        <div class="p-6 sm:p-8 space-y-6">
          <DialogHeader class="space-y-2 text-left">
            <DialogTitle class="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {{ movie.title }}
            </DialogTitle>
            <div class="flex items-center gap-3 text-xs text-muted-foreground">
              <span class="flex items-center gap-1 font-medium">
                <Calendar class="h-3.5 w-3.5" />
                Released: {{ movie.release_date || 'Unknown' }}
              </span>
            </div>
          </DialogHeader>

          <!-- Synopsis -->
          <div class="space-y-2">
            <h4 class="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Storyline
            </h4>
            <p class="text-sm sm:text-base leading-relaxed text-foreground/90">
              {{ movie.overview || 'No synopsis available for this title.' }}
            </p>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-end gap-3 pt-4 border-t border-border/50">
            <Button variant="outline" @click="closeDialog">
              Close
            </Button>
            <Button
              class="bg-red-600 hover:bg-red-700 text-white font-semibold gap-2 shadow-md"
              @click="emit('play', movie)"
            >
              <Play class="h-4 w-4 fill-white" />
              Watch Stream
            </Button>
          </div>

        </div>

      </div>
    </DialogContent>
  </Dialog>
</template>