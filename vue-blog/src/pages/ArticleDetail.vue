<template>
  <div
    v-if="article"
    class="min-h-screen bg-[#f9fafc] dark:bg-slate-950 transition-colors duration-300"
  >
    <!-- Progress Bar -->
    <div
      class="fixed top-0 left-0 w-full h-1 z-[100] bg-slate-100 dark:bg-slate-900"
    >
      <div
        class="h-full bg-gradient-to-r from-blue-500 to-pink-500 transition-all duration-300"
        :style="{ width: scrollPercent + '%' }"
      ></div>
    </div>

    <!-- Article Header -->
    <header class="relative h-[60vh] overflow-hidden">
      <img
        :src="article.image"
        :alt="article.title"
        class="w-full h-full object-cover"
      />
      <div
        class="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-slate-950/90"
      ></div>

      <div class="absolute inset-0 flex items-center justify-center p-6">
        <div
          class="max-w-4xl w-full space-y-6 text-center animate-in fade-in slide-in-from-bottom-8 duration-700"
        >
          <router-link
            to="/articles"
            class="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-4 group"
          >
            <span
              class="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform"
              >arrow_back</span
            >
            返回文章列表
          </router-link>

          <div class="flex justify-center items-center gap-3">
            <span
              class="px-4 py-1.5 bg-blue-500/20 backdrop-blur-md text-blue-400 text-xs font-bold rounded-full uppercase tracking-widest border border-blue-500/30"
            >
              {{ article.tag }}
            </span>
          </div>

          <h1
            class="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight"
          >
            {{ article.title }}
          </h1>

          <div
            class="flex flex-wrap justify-center items-center gap-6 text-white/60 text-sm font-medium"
          >
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[18px]"
                >calendar_today</span
              >
              {{ article.date }}
            </div>
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[18px]"
                >schedule</span
              >
              {{ article.readTime }}
            </div>
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[18px]"
                >visibility</span
              >
              2.4k 阅读
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-6 -mt-20 relative z-10 pb-24">
      <div
        class="glass-panel rounded-[40px] p-8 md:p-16 space-y-10 shadow-2xl dark:shadow-none border border-white/50 dark:border-slate-800"
      >
        <!-- Abstract/Summary -->
        <div
          class="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border-l-4 border-blue-500 italic text-slate-600 dark:text-slate-400 leading-relaxed text-lg"
        >
          " {{ article.desc }} "
        </div>

        <!-- Content Body (Rich Text Placeholder) -->
        <div class="prose prose-slate dark:prose-invert max-w-none space-y-8">
          <div
            v-for="(section, idx) in article.content"
            :key="idx"
            class="space-y-4"
          >
            <h2
              v-if="section.title"
              class="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white pt-4"
            >
              {{ section.title }}
            </h2>
            <p
              v-if="section.text"
              class="text-slate-600 dark:text-slate-400 leading-[1.8] text-lg"
            >
              {{ section.text }}
            </p>
            <div v-if="section.code" class="relative group">
              <div
                class="absolute -top-3 left-4 px-3 py-1 bg-slate-800 text-white text-[10px] rounded-md font-mono z-10"
              >
                CODE
              </div>
              <pre
                class="bg-slate-900 text-blue-300 p-6 rounded-2xl overflow-x-auto font-mono text-sm border border-slate-800 shadow-inner"
              ><code>{{ section.code }}</code></pre>
            </div>
            <img
              v-if="section.image"
              :src="section.image"
              class="rounded-3xl shadow-lg w-full object-cover max-h-[400px]"
            />
          </div>
        </div>

        <!-- Footer Actions -->
        <div
          class="pt-12 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-8"
        >
          <div class="flex items-center gap-4">
            <button
              @click="handleLike"
              :class="
                isLiked
                  ? 'bg-pink-500 text-white'
                  : 'bg-slate-50 dark:bg-slate-900 text-slate-400'
              "
              class="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95"
            >
              <span class="material-symbols-outlined text-[20px]">{{
                isLiked ? "favorite" : "favorite_border"
              }}</span>
              {{ isLiked ? "已点赞" : "点赞支持" }}
            </button>
            <button
              @click="handleShare"
              class="bg-slate-50 dark:bg-slate-900 text-slate-400 flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all hover:scale-105"
            >
              <span class="material-symbols-outlined text-[20px]">share</span>
              分享
            </button>
          </div>

          <div class="flex items-center gap-3">
            <span class="text-sm text-slate-400 font-medium">标签：</span>
            <span
              class="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-bold rounded-lg hover:bg-blue-500 hover:text-white transition-all cursor-pointer"
              >#Vue3</span
            >
            <span
              class="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-bold rounded-lg hover:bg-blue-500 hover:text-white transition-all cursor-pointer"
              >#Frontend</span
            >
          </div>
        </div>
      </div>

      <!-- Author Card -->
      <section
        class="mt-12 glass-panel rounded-[32px] p-8 flex items-center gap-6 border border-white/50 dark:border-slate-800"
      >
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrP0o3oulwdlpTGuwTLrqYIca3v6uLIbBNejSfwbbBdnwPU-uDmUM7cbR1GSCabqt_ji2R7wkjS0AoXWYM3wHu6RHJPow5XUX-4c0t_98Q8kgTnK6bCS8NmHDtbbUqpJewmWgSel8hm_YTI0NH6Eq-O8QLTfBoK3YaLUr1F9B36_dWQ7vflUW7j-pHtxWFC_hT2wxtehZ6j-wjo2qGm7bGLqXMmjro8HF0cffGiaGJ08C72Qp3XI1fkCWO-DcHqUiGDe9ltZ17dQA"
          alt="Author"
          class="w-16 h-16 rounded-full border-2 border-white dark:border-slate-800 shadow-md"
        />
        <div class="flex-1">
          <div class="text-lg font-bold text-slate-900 dark:text-white">
            Alex Rivera
          </div>
          <div class="text-sm text-slate-500 dark:text-slate-400 mt-1">
            全栈开发工程师 & UI 设计师，热衷于探索前沿 Web 技术与交互之美。
          </div>
        </div>
        <button class="btn-outline px-6 text-sm">关注我</button>
      </section>
    </main>
  </div>
  <div v-else class="min-h-screen flex items-center justify-center">
    <div
      class="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const article = ref(null);
const scrollPercent = ref(0);
const isLiked = ref(false);

const handleScroll = () => {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  scrollPercent.value = (winScroll / height) * 100;
};

const handleLike = () => {
  isLiked.value = !isLiked.value;
};

const handleShare = async () => {
  const shareData = {
    title: article.value?.title || "黄小包博客",
    text: article.value?.desc || "探索数字设计的深度与前端开发的无限可能",
    url: window.location.href,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      alert("分享成功！");
    } catch (err) {
      // 用户取消分享
    }
  } else {
    // 降级方案：复制链接到剪贴板
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("链接已复制到剪贴板！");
    } catch (err) {
      // 显示链接供用户手动复制
      prompt("复制链接:", window.location.href);
    }
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);

  // Simulate fetching article data
  const savedArticles = localStorage.getItem("blog_articles");
  if (savedArticles) {
    const allArticles = JSON.parse(savedArticles);
    // For now, we use index as ID or title matching
    const id = route.params.id;
    article.value = allArticles[id] || allArticles[0];

    // Add detailed content if it doesn't exist (Fallback for new articles)
    if (!article.value.content) {
      article.value.content = [
        {
          title: "一、核心架构的演进",
          text: "该文章的详细内容正在编写中... 在现代 Web 开发中，架构的选择往往决定了项目的上限。",
        },
      ];
    }
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
@reference "../style.css";

/* Custom scrollbar for better read experience */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
.dark ::-webkit-scrollbar-thumb {
  background: #334155;
}
</style>
