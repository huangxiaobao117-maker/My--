<template>
  <div>
    <div class="max-w-[1200px] mx-auto px-4 md:px-10 py-16 space-y-12">
      <!-- Header Section -->
      <header class="text-center space-y-4 max-w-2xl mx-auto">
        <div class="flex justify-center items-center gap-4">
          <h1
            class="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            精选文章
          </h1>
          <button
            @click="isEditMode = !isEditMode"
            :class="
              isEditMode
                ? 'bg-blue-500 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
            "
            class="px-4 py-2 rounded-xl text-sm font-bold transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <span class="material-symbols-outlined text-[18px]">{{
              isEditMode ? "check_circle" : "edit_note"
            }}</span>
            {{ isEditMode ? "完成编辑" : "管理文章" }}
          </button>
        </div>
        <p class="text-slate-500 dark:text-slate-400 text-lg">
          探索数字设计的深度与前端开发的无限可能。
        </p>
      </header>

      <!-- Category Filter -->
      <div class="flex flex-wrap items-center justify-center gap-3">
        <button
          @click="selectedCategory = 'all'"
          :class="[
            'px-5 py-2.5 rounded-full text-sm font-semibold transition-all',
            selectedCategory === 'all'
              ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700',
          ]"
        >
          全部
        </button>
        <button
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category"
          :class="[
            'px-5 py-2.5 rounded-full text-sm font-semibold transition-all',
            selectedCategory === category
              ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700',
          ]"
        >
          {{ category }}
        </button>
      </div>

      <!-- Articles Grid -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
      >
        <!-- Loading Skeletons -->
        <ArticleSkeleton
          v-if="isLoading"
          v-for="n in 6"
          :key="'skeleton-' + n"
        />

        <!-- Empty State -->
        <div v-else-if="filteredArticles.length === 0" class="col-span-full">
          <EmptyState
            icon="article"
            title="暂无文章"
            description="该分类下还没有文章，试试其他分类吧！"
            action-text="发布文章"
            @action="openEditModal(null)"
          />
        </div>

        <!-- Add New Article Card (Only in Edit Mode) -->
        <div
          v-if="isEditMode && filteredArticles.length > 0"
          @click="openEditModal(null)"
          class="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[32px] flex flex-col items-center justify-center p-12 group cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
        >
          <div
            class="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
          >
            <span class="material-symbols-outlined text-3xl">add</span>
          </div>
          <span
            class="font-bold text-slate-400 group-hover:text-blue-500 transition-colors"
            >发布新文章</span
          >
        </div>

        <!-- Article Cards -->
        <article
          v-for="(article, index) in filteredArticles"
          :key="index"
          class="glass-panel rounded-[32px] overflow-hidden group hover:-translate-y-2 transition-all duration-500 relative flex flex-col h-full"
        >
          <!-- Edit Actions Overlay -->
          <div v-if="isEditMode" class="absolute top-4 right-4 z-10 flex gap-2">
            <button
              @click.stop="openEditModal(index)"
              class="w-9 h-9 rounded-full bg-white/90 dark:bg-slate-900/90 text-blue-500 shadow-lg flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all"
            >
              <span class="material-symbols-outlined text-[18px]">edit</span>
            </button>
            <button
              @click.stop="removeArticle(index)"
              class="w-9 h-9 rounded-full bg-white/90 dark:bg-slate-900/90 text-pink-500 shadow-lg flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all"
            >
              <span class="material-symbols-outlined text-[18px]">delete</span>
            </button>
          </div>

          <!-- Cover Image -->
          <div class="aspect-[16/10] overflow-hidden relative">
            <LazyImage
              :src="article.image"
              :alt="article.title"
              className="group-hover:scale-110 transition-transform duration-700"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
            ></div>
          </div>

          <!-- Content -->
          <div class="p-8 flex flex-col flex-1 space-y-5">
            <div class="flex items-center gap-3">
              <span
                class="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[11px] font-bold rounded-full uppercase tracking-wider"
                >{{ article.tag }}</span
              >
              <span class="text-slate-400 text-[11px] font-medium">{{
                article.date
              }}</span>
            </div>

            <h3
              class="text-xl font-bold text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2"
            >
              {{ article.title }}
            </h3>

            <p
              class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-3"
            >
              {{ article.desc }}
            </p>

            <!-- Footer -->
            <div
              class="pt-6 mt-auto border-t border-slate-50 dark:border-slate-800 flex justify-between items-center"
            >
              <div class="flex items-center gap-2 text-slate-400">
                <span class="material-symbols-outlined text-[16px]"
                  >schedule</span
                >
                <span class="text-[12px] font-medium">{{
                  article.readTime
                }}</span>
              </div>
              <router-link
                :to="`/article/${index}`"
                class="text-blue-500 text-[13px] font-bold flex items-center gap-1 hover:gap-2 transition-all"
              >
                阅读更多
                <span class="material-symbols-outlined text-[18px]"
                  >arrow_right_alt</span
                >
              </router-link>
            </div>
          </div>
        </article>
      </div>
    </div>

    <!-- Edit Modal -->
    <ArticleEditModal
      :show="showEditModal"
      :is-edit="currentEditIndex !== null"
      :initial-data="currentEditData"
      @close="showEditModal = false"
      @save="saveArticle"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import ArticleEditModal from "../components/ArticleEditModal.vue";
import ArticleSkeleton from "../components/ArticleSkeleton.vue";
import EmptyState from "../components/EmptyState.vue";
import LazyImage from "../components/LazyImage.vue";
import { useArticles } from "../composables/useArticles";

const { articles, addArticle, updateArticle, removeArticle } = useArticles();

const isEditMode = ref(false);
const showEditModal = ref(false);
const currentEditIndex = ref(null);
const currentEditData = ref(null);
const isLoading = ref(true);
const selectedCategory = ref("all");

// 从文章中提取所有分类
const categories = computed(() => {
  const tags = new Set();
  articles.forEach((article) => {
    if (article.tag) {
      tags.add(article.tag);
    }
  });
  return Array.from(tags);
});

// 根据分类筛选文章
const filteredArticles = computed(() => {
  if (selectedCategory.value === "all") {
    return articles;
  }
  return articles.filter((article) => article.tag === selectedCategory.value);
});

// 模拟加载延迟
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 800);
});

const openEditModal = (index) => {
  currentEditIndex.value = index;
  currentEditData.value = index !== null ? { ...articles[index] } : null;
  showEditModal.value = true;
};

const saveArticle = (data) => {
  if (currentEditIndex.value !== null) {
    updateArticle(currentEditIndex.value, data);
  } else {
    addArticle(data); // New articles go to top
  }
};

const removeArticleConfirm = (index) => {
  if (confirm("确定要删除这篇文章吗？")) {
    removeArticle(index);
  }
};
</script>

<style scoped>
@reference "../style.css";

.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>
