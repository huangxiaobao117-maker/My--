<template>
  <!-- 搜索遮罩 -->
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
      @click="isOpen = false"
    ></div>
  </Transition>

  <!-- 搜索面板 -->
  <Transition name="slide-down">
    <div
      v-if="isOpen"
      class="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg"
    >
      <div class="max-w-[600px] mx-auto p-6">
        <!-- 搜索框 -->
        <div class="relative">
          <button
            @click="isOpen = false"
            class="absolute left-0 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-100 rounded-full transition-all"
          >
            <span class="material-symbols-outlined text-slate-400"
              >arrow_back</span
            >
          </button>
          <input
            ref="searchInput"
            v-model="searchQuery"
            type="text"
            placeholder="搜索文章、项目..."
            class="w-full pl-12 pr-12 py-3 bg-slate-50 border-0 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            @keyup.enter="handleSearch"
          />
          <button
            v-if="searchQuery"
            @click="searchQuery = ''"
            class="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-200 rounded-full transition-all"
          >
            <span class="material-symbols-outlined text-slate-400">close</span>
          </button>
        </div>

        <!-- 搜索建议 -->
        <div class="mt-4">
          <div v-if="!searchQuery" class="space-y-2">
            <p class="text-sm text-slate-400 mb-3">热门搜索</p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="tag in hotTags"
                :key="tag"
                @click="searchQuery = tag"
                class="px-4 py-2 bg-slate-100 text-slate-600 rounded-full text-sm hover:bg-blue-50 hover:text-blue-600 transition-all"
              >
                {{ tag }}
              </button>
            </div>
          </div>

          <!-- 搜索结果 -->
          <div v-else-if="searchResults.length > 0" class="space-y-3">
            <p class="text-sm text-slate-400 mb-3">搜索结果</p>
            <router-link
              v-for="result in searchResults"
              :key="result.id"
              :to="result.path"
              class="block p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all"
              @click="isOpen = false"
            >
              <h4 class="font-medium text-slate-900">{{ result.title }}</h4>
              <p class="text-sm text-slate-500 mt-1">{{ result.desc }}</p>
            </router-link>
          </div>

          <!-- 无结果 -->
          <div v-else class="text-center py-8">
            <span class="material-symbols-outlined text-slate-300 text-4xl"
              >search_off</span
            >
            <p class="mt-3 text-slate-400">未找到相关内容</p>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import { useArticles } from "../composables/useArticles";
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["close"]);
const searchInput = ref(null);
const searchQuery = ref("");
const { articles } = useArticles();
// 热门搜索标签
const hotTags = [
  "Vue 3",
  "前端开发",
  "TypeScript",
  "UI设计",
  "React",
  "二次元",
  "动漫",
  "游戏",
];
// 搜索结果
const searchResults = ref([]);
// 监听搜索关键词变化
watch(searchQuery, (query) => {
  if (!query.trim()) {
    searchResults.value = [];
    return;
  }
  // 模拟搜索逻辑
  searchResults.value = articles.value
    .filter(
      (article) =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.desc.toLowerCase().includes(query.toLowerCase()),
    )
    .map((article) => ({
      id: article.id,
      title: article.title,
      desc: article.desc,
      path: `/article/${article.id}`,
    }));
});
// 监听弹窗打开，自动聚焦输入框
watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      searchQuery.value = "";
      nextTick(() => {
        searchInput.value?.focus();
      });
    }
  },
);
const handleSearch = () => {
  // 搜索逻辑已在 watch 中处理
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-100%);
}
</style>
