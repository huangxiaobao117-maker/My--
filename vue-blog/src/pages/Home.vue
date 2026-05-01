<template>
  <div class="max-w-[1200px] mx-auto px-4 md:px-10 py-12 md:py-20 space-y-24">
    <!-- Hero Section -->
    <section class="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
      <div class="flex-1 space-y-8 text-center lg:text-left">
        <div
          class="inline-block px-4 py-1.5 rounded-full bg-pink-50 text-pink-400 text-[12px] font-bold tracking-widest uppercase"
        >
          Welcome to My Creative Space
        </div>
        <h1
          class="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight"
        >
          欢迎光临我的博客！<br />
          倾听<span class="text-gradient">代码的诗意</span>
        </h1>
        <p
          class="text-[16px] text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed"
        >
          在这里，我分享关于前端开发、交互设计以及对数字世界的思考。通过代码构建未来，通过文字沉淀感悟，欢迎来到我的数字花园。
        </p>
        <div class="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
          <router-link to="/articles" class="btn-primary px-10"
            >阅读最新文章</router-link
          >
          <router-link
            to="/about"
            class="btn-outline px-10 border-blue-50 shadow-sm"
            >了解更多</router-link
          >
        </div>
      </div>
      <div class="flex-1 relative w-full max-w-2xl">
        <div
          class="aspect-square rounded-[40px] overflow-hidden glass-panel p-5 shadow-2xl shadow-blue-100/50 border border-white/50 cursor-pointer group"
          @click="triggerFileInput"
        >
          <LazyImage
            :src="currentImage"
            alt="Creative Space"
            className="rounded-[30px] transition-transform duration-500 group-hover:scale-105"
          />
          <div
            class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-[40px]"
          >
            <span class="material-symbols-outlined text-white text-4xl"
              >upload</span
            >
          </div>
        </div>
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          class="hidden"
          @change="handleImageUpload"
        />
        <p class="text-center text-sm text-slate-400 mt-3">
          点击图片上传本地图片
        </p>
        <!-- Floating Widget -->
        <div
          class="absolute -bottom-8 -left-32 glass-panel p-6 rounded-3xl shadow-xl border border-white/80 hidden xl:block animate-float"
        >
          <div class="flex items-center gap-5">
            <div
              class="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30"
            >
              <span class="material-symbols-outlined text-[24px]">bolt</span>
            </div>
            <div>
              <div class="font-bold text-slate-800">保持高效</div>
              <div class="text-xs text-slate-400 mt-0.5">
                探索最新的开发技术
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tech Stack Section -->
    <section
      class="glass-panel rounded-[40px] p-12 md:p-16 text-center border border-white/40 shadow-sm"
    >
      <h2 class="text-2xl font-bold text-slate-800 mb-12">技术栈与工具</h2>
      <div class="flex flex-wrap justify-center gap-8 md:gap-16">
        <div
          v-for="tech in techs"
          :key="tech.name"
          class="group flex flex-col items-center gap-4 cursor-pointer"
        >
          <div
            class="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-slate-50 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:border-blue-100"
          >
            <span
              class="material-symbols-outlined text-3xl"
              :class="tech.color"
              >{{ tech.icon }}</span
            >
          </div>
          <span
            class="text-sm font-medium text-slate-500 group-hover:text-blue-500 transition-colors"
            >{{ tech.name }}</span
          >
        </div>
      </div>
    </section>

    <!-- Latest Articles Section -->
    <section class="space-y-12">
      <div class="flex justify-between items-end">
        <div class="space-y-2">
          <h2 class="text-3xl font-bold text-slate-900">最新文章</h2>
          <p class="text-slate-400 text-sm">分享技术见解与生活点滴</p>
        </div>
        <router-link
          to="/articles"
          class="flex items-center gap-2 text-blue-500 font-bold text-sm hover:gap-3 transition-all"
        >
          查看全部文章
          <span class="material-symbols-outlined text-[18px]"
            >arrow_forward</span
          >
        </router-link>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article
          v-for="(post, idx) in articles"
          :key="idx"
          class="glass-panel rounded-[28px] overflow-hidden group hover:-translate-y-2 transition-all duration-500 border border-slate-50"
        >
          <div class="aspect-video relative overflow-hidden rounded-t-[28px]">
            <LazyImage
              :src="post.image"
              :alt="post.title"
              className="transition-transform duration-700 group-hover:scale-110"
            />
            <div class="absolute top-4 left-4">
              <span
                class="px-3 py-1 bg-blue-500/80 text-white text-[11px] font-bold rounded-lg backdrop-blur-md"
              >
                {{ post.tag }}
              </span>
            </div>
          </div>
          <div class="p-8 space-y-4">
            <div
              class="flex items-center gap-2 text-slate-300 text-[12px] font-medium uppercase tracking-wider"
            >
              <span class="material-symbols-outlined text-[16px]"
                >calendar_today</span
              >
              {{ post.date }}
            </div>
            <h3
              class="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug"
            >
              {{ post.title }}
            </h3>
            <p class="text-slate-400 text-[14px] line-clamp-2 leading-relaxed">
              {{ post.desc }}
            </p>
            <div class="pt-4 flex justify-end">
              <router-link
                :to="`/article/${idx}`"
                class="text-blue-500 text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all"
              >
                立即阅读
                <span class="material-symbols-outlined text-sm"
                  >arrow_forward</span
                >
              </router-link>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from "vue";
import LazyImage from "../components/LazyImage.vue";

const techs = [
  { name: "Vue 3", icon: "deployed_code", color: "text-emerald-500" },
  { name: "TypeScript", icon: "terminal", color: "text-blue-500" },
  { name: "Vite", icon: "electric_bolt", color: "text-amber-400" },
  { name: "Tailwind", icon: "architecture", color: "text-indigo-500" },
];

const articles = reactive([]);

// Hero图片相关
const fileInput = ref(null);
const defaultHeroImage =
  "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=anime%20style%20beautiful%20landscape%20cherry%20blossom%20spring%20mountains%20lake%20reflection%20peaceful&image_size=landscape_16_9";

const savedHeroImage = localStorage.getItem("hero_image");
const currentImage = ref(
  savedHeroImage && savedHeroImage.startsWith("http")
    ? savedHeroImage
    : defaultHeroImage,
);

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleImageUpload = (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const imageDataUrl = e.target?.result;
    if (imageDataUrl) {
      currentImage.value = imageDataUrl;
      localStorage.setItem("hero_image", imageDataUrl);
    }
  };
  reader.readAsDataURL(file);
};

onMounted(() => {
  const savedArticles = localStorage.getItem("blog_articles");
  if (savedArticles) {
    const allArticles = JSON.parse(savedArticles);
    // Only show the latest 3 articles on home page
    Object.assign(articles, allArticles.slice(0, 3));
  } else {
    // Fallback if no articles in localStorage yet
    const defaultArticles = [
      {
        title: "Vue 3 响应式原理深度解析",
        desc: "从 Proxy 到 Dependency Tracking，深入浅出地拆解 Vue 3 的核心响应式系统。我们将...",
        date: "2026-10-24",
        tag: "技术方案",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAtD3pzyxKPmHmQ7cZymbgJHbmcIrLYHAkE-fXuPqj8pgsuxvn4izZ8EsivMYswXyvojwFCnbm3MIvrNnXDZ8_ImVcnFLNKt_r4CCRhCpr_SaNvGtUAZ2zN20y9zVPqkZuHNbSOk5jUwHOaQrZDMSz1zQp4mUortWKT4fHoIernEth8D2HVO0NVbYxmI8_0ciXsdQ96rck18_hXdqQlRHXGcLVRNoUwRpSlToXhIQTW5qijTrX_PxBHAWvQDhQc-IHa0JQmhifNtDA",
      },
      {
        title: "玻璃拟态在 UI 设计中的应用",
        desc: "探索如何通过毛玻璃效果、透明度和层叠关系打造轻盈现代的数字界面，同时兼顾可访问...",
        date: "2026-10-15",
        tag: "设计规范",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDz0yK2jEr7dJpXVUc2S2OH-Al1bYDGgXxlxSnJCYoxQTfyM-dR2BICBU3bvYJq5Pq2Qmz3Bd2rNLzswkZER14HvjbsWTPHx6bb_HlnGlV_HAFuZtMePp_yQwzUQcMDrvDbsw_rr5GFrG6pPRhh8DdyhNEFxF4uWx3AUp-ZPdFpBAMHYQNmf3qiZ15DUdrjda4z4asVzKM_EQUUlxZS_xMesaU1HPeVoreERKib8HsjKGO8eBHH7GG5pgHjt9rTEXUKEtsp1HDoZP4",
      },
      {
        title: "代码之外：开发者的专注力养成",
        desc: "分享在信息爆炸时代如何建立个人知识体系，并通过极简主义的工作流提升核心生产力和...",
        date: "2026-10-02",
        tag: "生活感悟",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDsT3IWhPvUzm-5h_MGj66HAOCVd5V_bDenOYl6Vm3wKOKs9VABgIGZ8-54H1I2VZB94k2cZ5MMiHhyYzraz7jR1W9SOz9uHQ_VCLfy-i3451D7ySuDFQK67r-BySaXj7qJSYzL_b6WmO4mg97hlAxmdKBbcLpENCnz4DA1eKrAKw43k508y_XURPNLHy6g_i0JIQ-cdK5HBmFNfNAyzuZyYhZOxvxQG07edGIKx3NGx9gYHXHgqLlVXGPg_goJKPO2XsOtSuKqZDE",
      },
    ];
    Object.assign(articles, defaultArticles);
  }
});
</script>

<style scoped>
@reference "../style.css";

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}
.animate-float {
  animation: float 5s ease-in-out infinite;
}
</style>
