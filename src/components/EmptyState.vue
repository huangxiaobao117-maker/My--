<template>
  <div class="text-center py-20">
    <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
      <span class="material-symbols-outlined text-slate-300 text-5xl">{{ icon }}</span>
    </div>
    <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">{{ title }}</h3>
    <p class="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">{{ description }}</p>
    <button
      v-if="actionText"
      @click="$emit('action')"
      class="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/20 hover:scale-105 active:scale-95 transition-all"
    >
      {{ actionText }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: 'inbox'
  },
  title: {
    type: String,
    default: '暂无内容'
  },
  description: {
    type: String,
    default: '这里还没有任何内容，快来添加吧！'
  },
  actionText: {
    type: String,
    default: ''
  }
});

defineEmits(['action']);
</script>
