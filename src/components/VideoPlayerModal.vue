<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Movie } from '@/types/tmdb'
import { tmdbFetch } from '@/api/tmdb'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { AlertCircle } from '@lucide/vue'

interface TmdbVideo {
  id: string
  key: string
  name: string
  site: string
  type: string
  official: boolean
}

interface VideoResponse {
  id: number
  results: TmdbVideo[]
}

const props = defineProps<{
  open: boolean
  movie: Movie | null
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const videoKey = ref<string | null>(null)
const isLoadingVideo = ref(false)
const videoError = ref(false)

// Watch when modal opens and movie changes to fetch its trailer
watch(
  () => [props.open, props.movie],
  async ([isOpen, currentMovie]) => {
    if (isOpen && currentMovie) {
      await loadMovieVideo((currentMovie as Movie).id)
    } else {
      videoKey.value = null
      videoError.value = false
    }
  }
)

async function loadMovieVideo(movieId: number) {
  isLoadingVideo.value = true
  videoError.value = false
  videoKey.value = null

  try {
    const data = await tmdbFetch<VideoResponse>(`/movie/${movieId}/videos`)
    
    // Look for Official Trailer on YouTube first, otherwise any YouTube video
    const trailer =
      data.results.find((v) => v.site === 'YouTube' && v.type === 'Trailer') ||
      data.results.find((v) => v.site === 'YouTube' && v.type === 'Teaser') ||
      data.results.find((v) => v.site === 'YouTube')

    if (trailer) {
      videoKey.value = trailer.key
    } else {
      videoError.value = true
    }
  } catch (err) {
    console.error('Failed to load video:', err)
    videoError.value = true
  } finally {
    isLoadingVideo.value = false
  }
}
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent class="sm:max-w-4xl p-0 overflow-hidden rounded-2xl bg-black border-zinc-800 text-white shadow-2xl">
      <!-- Player Header -->
      <DialogHeader class="p-4 sm:p-5 flex flex-row items-center justify-between border-b border-zinc-800">
        <div class="flex items-center gap-3">
          <Badge class="bg-red-600 text-white font-bold text-xs uppercase tracking-wider">
            Streaming
          </Badge>
          <DialogTitle class="text-base sm:text-lg font-bold text-white truncate max-w-md">
            {{ movie?.title }}
          </DialogTitle>
        </div>
      </DialogHeader>

      <!-- Video Player Frame Area -->
      <div class="relative w-full aspect-video bg-zinc-950 flex items-center justify-center">
        <!-- 1. Loading State -->
        <div v-if="isLoadingVideo" class="w-full h-full flex flex-col items-center justify-center space-y-3">
          <Skeleton class="w-full h-full bg-zinc-900" />
        </div>

        <!-- 2. Active YouTube Stream Player -->
        <iframe
          v-else-if="videoKey"
          :src="`https://www.youtube-nocookie.com/embed/${videoKey}?autoplay=1&rel=0&modestbranding=1`"
          title="Movie Trailer"
          class="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />

        <!-- 3. No Video / Error State -->
        <div v-else class="text-center p-8 space-y-3 text-zinc-400">
          <AlertCircle class="h-10 w-10 mx-auto text-zinc-500" />
          <p class="text-sm font-medium">No official video stream available for this title on TMDB.</p>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>