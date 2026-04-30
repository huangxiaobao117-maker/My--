<template>
  <div class="relative overflow-hidden bg-slate-100 dark:bg-slate-800 rounded-inherit">
    <!-- 加载占位符 -->
    <div
      v-if="!isLoaded"
      class="absolute inset-0 flex items-center justify-center"
    >
      <div class="w-8 h-8 border-2 border-slate-300 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
    
    <!-- 实际图片 -->
    <img
      :src="src"
      :alt="alt"
      :class="[
        className,
        isLoaded ? 'opacity-100' : 'opacity-0',
        'transition-opacity duration-500'
      ]"
      :loading="loading"
      @load="handleLoad"
      @error="handleError"
    />
    
    <!-- 错误占位 -->
    <div
      v-if="hasError"
      class="absolute inset-0 flex items-center justify-center bg-slate-100"
    >
      <span class="material-symbols-outlined text-slate-400 text-4xl">broken_image</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  className: {
    type: String,
    default: 'w-full h-full object-cover'
  },
  loading: {
    type: String,
    default: 'lazy'
  }
});

const isLoaded = ref(false);
const hasError = ref(false);

const handleLoad = () => {
  isLoaded.value = true;
};

const handleError = () => {
  hasError.value = true;
  isLoaded.value = true;
};
</script>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
