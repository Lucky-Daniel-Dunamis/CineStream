<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Film, Search, Bell, Sun, Moon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/composables/useTheme'

const emit = defineEmits<{
  (e: 'search', query: string): void
}>()

const searchQuery = ref('')
const { isDark, toggleTheme, initTheme } = useTheme()
/* const isSearchOpen = ref(false) */

onMounted(() => {
  initTheme()
})

function handleSearch() {
  emit('search', searchQuery.value.trim())
}
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md transition-all">
    <div class="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
      
      <!-- Brand Logo & Main Nav Links -->
      <div class="flex items-center gap-8">
        <a href="#" class="flex items-center gap-2 group">
          <div class="h-9 w-9 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Film class="h-5 w-5" />
          </div>
          <span class="text-xl font-bold tracking-tight bg-gradient-to-r from-red-500 to-rose-400 bg-clip-text text-transparent">
            CineStream
          </span>
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="#" class="text-foreground transition-colors hover:text-primary">Home</a>
          <a href="#" class="text-muted-foreground transition-colors hover:text-foreground">Movies</a>
          <a href="#" class="text-muted-foreground transition-colors hover:text-foreground">TV Shows</a>
          <a href="#" class="text-muted-foreground transition-colors hover:text-foreground">Trending</a>
        </nav>
      </div>

      <!-- Right Actions: Search & Profile -->
      <div class="flex items-center gap-3">
        <!-- Search bar (Expandable) -->
        <div class="relative flex items-center">
          <form @submit.prevent="handleSearch" class="flex items-center">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search movies..."
              class="h-9 w-36 sm:w-60 rounded-full border border-border/60 bg-muted/50 px-4 pl-9 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all focus:w-48 sm:focus:w-72"
            />
            <Search class="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
          </form>
        </div>

        <!-- Notification Bell -->
        <Button variant="ghost" size="icon" class="h-9 w-9 text-muted-foreground hover:text-foreground">
          <Bell class="h-4 w-4" />
        </Button>

                <!-- Dark / Light Mode Toggle Button -->
        <Button
          variant="ghost"
          size="icon"
          class="h-9 w-9 text-muted-foreground hover:text-foreground transition-transform active:scale-95"
          @click="toggleTheme"
          :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
        >
          <Sun v-if="isDark" class="h-4 w-4 text-yellow-400 transition-all rotate-0 scale-100" />
          <Moon v-else class="h-4 w-4 text-slate-700 transition-all rotate-0 scale-100" />
        </Button>

        <!-- User Profile Avatar Pill -->
        <div class="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-rose-500 flex items-center justify-center text-xs font-bold text-white shadow cursor-pointer hover:opacity-90 transition-opacity">
          U
        </div>
      </div>

    </div>
  </header>
</template>