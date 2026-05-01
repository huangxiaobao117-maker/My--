<template>
  <div
    class="glass-panel rounded-[32px] overflow-hidden animate-pulse flex flex-col h-full"
  >
    <!-- Cover Image Skeleton -->
    <div class="aspect-[16/10] bg-slate-100 dark:bg-slate-800"></div>

    <!-- Content Skeleton -->
    <div class="p-8 flex flex-col flex-1 space-y-5">
      <div class="flex items-center gap-3">
        <div class="w-16 h-6 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
        <div class="w-20 h-4 bg-slate-100 dark:bg-slate-800 rounded"></div>
      </div>

      <div class="w-full h-8 bg-slate-100 dark:bg-slate-800 rounded"></div>
      <div class="w-full h-5 bg-slate-100 dark:bg-slate-800 rounded"></div>
      <div class="w-3/4 h-5 bg-slate-100 dark:bg-slate-800 rounded"></div>

      <!-- Footer Skeleton -->
      <div
        class="pt-6 mt-auto border-t border-slate-50 dark:border-slate-800 flex justify-between items-center"
      >
        <div class="w-24 h-4 bg-slate-100 dark:bg-slate-800 rounded"></div>
        <div class="w-20 h-6 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
