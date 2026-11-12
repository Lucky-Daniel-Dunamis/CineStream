<script setup lang="ts">
import { Film } from '@lucide/vue'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="w-full border-t border-border/40 bg-card/50 text-muted-foreground mt-20">
    <div class="container mx-auto px-4 sm:px-8 py-12">
      <!-- Grid Columns -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        
        <!-- Brand & Tagline -->
        <div class="space-y-4 md:col-span-1">
          <div class="flex items-center gap-2">
            <div class="h-8 w-8 rounded-lg bg-red-600 flex items-center justify-center text-white shadow">
              <Film class="h-4 w-4" />
            </div>
            <span class="text-lg font-bold tracking-tight text-foreground">
              CineStream
            </span>
          </div>
          <p class="text-xs leading-relaxed">
            Your destination for discovering trending movies, reviews, and high-definition streams from around the globe.
          </p>
        </div>

        <!-- Navigation Links -->
        <div class="space-y-3">
          <h4 class="text-sm font-semibold text-foreground">Browse</h4>
          <ul class="space-y-2 text-xs">
            <li><a href="#" class="hover:text-foreground transition-colors">Popular Movies</a></li>
            <li><a href="#" class="hover:text-foreground transition-colors">Top Rated</a></li>
            <li><a href="#" class="hover:text-foreground transition-colors">Now Playing</a></li>
            <li><a href="#" class="hover:text-foreground transition-colors">Upcoming Releases</a></li>
          </ul>
        </div>

        <!-- Support / Account -->
        <div class="space-y-3">
          <h4 class="text-sm font-semibold text-foreground">Help & Account</h4>
          <ul class="space-y-2 text-xs">
            <li><a href="#" class="hover:text-foreground transition-colors">Help Center</a></li>
            <li><a href="#" class="hover:text-foreground transition-colors">Account Settings</a></li>
            <li><a href="#" class="hover:text-foreground transition-colors">Supported Devices</a></li>
            <li><a href="#" class="hover:text-foreground transition-colors">Terms of Service</a></li>
          </ul>
        </div>

        <!-- TMDB Attribution Notice -->
        <div class="space-y-3">
          <h4 class="text-sm font-semibold text-foreground">Data Attribution</h4>
          <p class="text-xs leading-relaxed">
            This product uses the <a href="https://www.themoviedb.org/" target="_blank" class="underline hover:text-foreground">TMDB API</a> but is not endorsed or certified by TMDB.
          </p>
          <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-muted/80 text-[10px] font-medium text-foreground">
            <span>Powered by TMDB API</span>
          </div>
        </div>

      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-border/30 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs gap-4">
        <p>© {{ currentYear }} CineStream. All rights reserved.</p>
        <p class="flex items-center gap-1">
          Built with Vue 3, Vite, Tailwind CSS & shadcn-vue
        </p>
      </div>
    </div>
  </footer>
</template>