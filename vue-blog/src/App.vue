<template>
  <div class="min-h-screen font-body-main">
    <!-- Navbar -->
    <nav
      class="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100/50 shadow-sm"
    >
      <div class="max-w-[1200px] mx-auto px-6 h-16 flex items-center gap-4">
        <router-link
          to="/"
          class="text-xl font-bold bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent flex-shrink-0"
        >
          黄小包博客
        </router-link>

        <!-- 搜索框 -->
        <div
          class="flex-1 max-w-xl mx-auto transition-all duration-300"
          :class="
            showSearch
              ? 'opacity-100 visible'
              : 'opacity-0 invisible md:opacity-100 md:visible'
          "
        >
          <div class="relative">
            <span
              class="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[18px]"
              >search</span
            >
            <input
              ref="searchInput"
              v-model="searchQuery"
              type="text"
              placeholder="搜索文章、项目..."
              class="w-full pl-10 pr-10 py-2 bg-slate-100 dark:bg-slate-800 border-0 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-700 transition-all"
              @keyup.enter="handleSearch"
            />
            <button
              v-if="searchQuery"
              @click="searchQuery = ''"
              class="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-all"
            >
              <span class="material-symbols-outlined text-slate-400 text-[16px]"
                >close</span
              >
            </button>
          </div>
          <!-- 搜索结果下拉 -->
          <div
            v-if="searchQuery && searchResults.length > 0"
            class="absolute top-full left-6 right-6 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 z-50 overflow-hidden"
          >
            <router-link
              v-for="result in searchResults"
              :key="result.id"
              :to="result.path"
              @click="searchQuery = ''"
              class="block px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
            >
              <h4 class="font-medium text-slate-900 dark:text-white">
                {{ result.title }}
              </h4>
              <p class="text-sm text-slate-500 dark:text-slate-400">
                {{ result.desc }}
              </p>
            </router-link>
          </div>
        </div>

        <div class="hidden md:flex items-center gap-8 flex-shrink-0">
          <router-link
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="text-[15px] font-medium transition-all duration-300 relative py-1 group"
            :class="
              $route.path === link.path
                ? 'text-blue-600'
                : 'text-slate-500 hover:text-blue-500'
            "
          >
            {{ link.name }}
            <div
              class="absolute bottom-0 left-0 h-0.5 bg-blue-500 rounded-full transition-all duration-300"
              :class="
                $route.path === link.path ? 'w-full' : 'w-0 group-hover:w-full'
              "
            ></div>
          </router-link>
        </div>

        <div class="flex items-center gap-2 flex-shrink-0">
          <button
            @click="toggleTheme"
            class="p-2 hover:bg-slate-50 rounded-full transition-all hover:scale-110 active:scale-95"
            :title="isDark ? '切换到浅色模式' : '切换到深色模式'"
          >
            <span
              class="material-symbols-outlined text-[22px] transition-colors"
              :class="isDark ? 'text-yellow-500' : 'text-slate-600'"
            >
              {{ isDark ? "light_mode" : "dark_mode" }}
            </span>
          </button>
          <!-- 移动端搜索按钮 -->
          <button
            @click="toggleSearch"
            class="md:hidden p-2 hover:bg-slate-50 rounded-full transition-all hover:scale-110 active:scale-95"
          >
            <span class="material-symbols-outlined text-slate-600 text-[22px]"
              >search</span
            >
          </button>

          <!-- Profile Avatar and Name -->
          <router-link
            to="/profile"
            class="flex items-center gap-2 hover:bg-slate-50 rounded-full py-1 pr-2 pl-1 transition-all"
          >
            <img
              :src="profile.avatar"
              alt="Avatar"
              class="w-8 h-8 rounded-full object-cover"
            />
            <span
              class="text-[15px] font-medium text-slate-700 dark:text-white hidden sm:block"
              >{{ profile.name }}</span
            >
          </router-link>

          <!-- Mobile Menu Button -->
          <MobileMenu />
        </div>
      </div>
    </nav>

    <!-- Content -->
    <main class="pt-16">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Footer -->
    <footer
      class="bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 py-16 mt-16"
    >
      <div class="max-w-[1200px] mx-auto px-6">
        <!-- Main Footer Content -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          <!-- Brand & Description -->
          <div class="space-y-6">
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-pink-500 flex items-center justify-center"
              >
                <span class="text-white font-bold text-lg">HB</span>
              </div>
              <span class="text-xl font-bold text-slate-900 dark:text-white"
                >黄小包博客</span
              >
            </div>
            <p
              class="text-slate-500 dark:text-slate-400 leading-relaxed text-sm"
            >
              探索数字设计的深度与前端开发的无限可能。分享技术心得，记录成长轨迹。
            </p>
            <!-- Social Links -->
            <div class="flex gap-3">
              <a
                href="mailto:huangxiaobao@example.com"
                class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-blue-500 hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="Email"
                title="发送邮件"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                  />
                </svg>
              </a>
              <a
                href="https://github.com/huangxiaobao"
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-slate-700 hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
                title="访问GitHub"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
              </a>
              <a
                href="https://twitter.com/huangxiaobao"
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-blue-400 hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
                title="访问Twitter"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                  />
                </svg>
              </a>
              <a
                href="/rss.xml"
                class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-orange-500 hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="RSS"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M6.188 8.713c1.113 0 2.017.905 2.017 2.018 0 1.112-.904 2.016-2.017 2.016-1.114 0-2.018-.904-2.018-2.016 0-1.113.904-2.018 2.018-2.018zm0-4.664C9.972 4.049 14 7.218 14 11.333c0 4.115-4.028 7.284-7.812 7.284S-.624 15.448-.624 11.333C-.624 7.218 2.401 4.049 6.188 4.049zm0 1.336c-2.67 0-4.852 2.183-4.852 4.852 0 2.67 2.182 4.853 4.852 4.853s4.852-2.183 4.852-4.853c0-2.669-2.182-4.852-4.852-4.852zm9.312 0c-2.67 0-4.852 2.183-4.852 4.852 0 2.67 2.182 4.853 4.852 4.853s4.852-2.183 4.852-4.853c0-2.669-2.182-4.852-4.852-4.852zm0-4.664c3.786 0 6.874 3.178 6.874 7.12 0 3.942-3.088 7.12-6.874 7.12s-6.874-3.178-6.874-7.12c0-3.942 3.088-7.12 6.874-7.12z"
                  />
                </svg>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="space-y-4">
            <h3 class="font-semibold text-slate-900 dark:text-white text-base">
              快速链接
            </h3>
            <ul class="space-y-3 text-sm">
              <li>
                <router-link
                  to="/"
                  class="text-slate-500 dark:text-slate-400 hover:text-blue-500 transition-colors flex items-center gap-2"
                >
                  <span
                    class="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"
                  ></span>
                  首页
                </router-link>
              </li>
              <li>
                <router-link
                  to="/articles"
                  class="text-slate-500 dark:text-slate-400 hover:text-blue-500 transition-colors flex items-center gap-2"
                >
                  <span
                    class="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"
                  ></span>
                  文章列表
                </router-link>
              </li>
              <li>
                <router-link
                  to="/profile"
                  class="text-slate-500 dark:text-slate-400 hover:text-blue-500 transition-colors flex items-center gap-2"
                >
                  <span
                    class="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"
                  ></span>
                  个人主页
                </router-link>
              </li>
              <li>
                <router-link
                  to="/about"
                  class="text-slate-500 dark:text-slate-400 hover:text-blue-500 transition-colors flex items-center gap-2"
                >
                  <span
                    class="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"
                  ></span>
                  关于本站
                </router-link>
              </li>
            </ul>
          </div>

          <!-- Resources -->
          <div class="space-y-4">
            <h3 class="font-semibold text-slate-900 dark:text-white text-base">
              资源
            </h3>
            <ul class="space-y-3 text-sm">
              <li>
                <router-link
                  to="/privacy"
                  class="text-slate-500 dark:text-slate-400 hover:text-blue-500 transition-colors flex items-center gap-2"
                >
                  <span
                    class="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"
                  ></span>
                  隐私政策
                </router-link>
              </li>
              <li>
                <a
                  href="/rss.xml"
                  class="text-slate-500 dark:text-slate-400 hover:text-blue-500 transition-colors flex items-center gap-2"
                >
                  <span
                    class="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"
                  ></span>
                  RSS订阅
                </a>
              </li>
              <li>
                <router-link
                  to="/sitemap"
                  class="text-slate-500 dark:text-slate-400 hover:text-blue-500 transition-colors flex items-center gap-2"
                >
                  <span
                    class="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"
                  ></span>
                  网站地图
                </router-link>
              </li>
              <li>
                <router-link
                  to="/contact"
                  class="text-slate-500 dark:text-slate-400 hover:text-blue-500 transition-colors flex items-center gap-2"
                >
                  <span
                    class="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"
                  ></span>
                  联系我们
                </router-link>
              </li>
            </ul>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="pt-8 border-t border-slate-200 dark:border-slate-800">
          <div
            class="flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <p class="text-xs text-slate-400">
              © 2026 黄小包博客. 保留所有权利.
            </p>
            <div class="flex items-center gap-6 text-xs text-slate-400">
              <router-link
                to="/privacy"
                class="hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >隐私政策</router-link
              >
              <router-link
                to="/terms"
                class="hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >使用条款</router-link
              >
              <router-link
                to="/cookie"
                class="hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >Cookie设置</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import { useTheme } from "./composables/useTheme";
import { useProfile } from "./composables/useProfile";
import { useArticles } from "./composables/useArticles";
import MobileMenu from "./components/MobileMenu.vue";

const { isDark, toggleTheme } = useTheme();
const { profile } = useProfile();
const { articles } = useArticles();

const searchInput = ref(null);
const searchQuery = ref("");
const showSearch = ref(false);
const searchResults = ref([]);

// 监听搜索关键词变化
watch(searchQuery, (query) => {
  if (!query.trim()) {
    searchResults.value = [];
    return;
  }
  // 搜索文章标题和描述
  searchResults.value = articles
    .filter(
      (article, index) =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.desc.toLowerCase().includes(query.toLowerCase()) ||
        article.tag.toLowerCase().includes(query.toLowerCase()),
    )
    .map((article, index) => {
      // 找到实际的索引
      const actualIndex = articles.findIndex(
        (a) => a.title === article.title && a.desc === article.desc,
      );
      return {
        id: actualIndex,
        title: article.title,
        desc: article.desc,
        path: `/article/${actualIndex}`,
      };
    });
});

// 切换搜索框显示（移动端）
const toggleSearch = () => {
  showSearch.value = !showSearch.value;
  if (showSearch.value) {
    nextTick(() => {
      searchInput.value?.focus();
    });
  }
};

const handleSearch = () => {
  // 搜索逻辑已在 watch 中处理
};

const navLinks = [
  { name: "首页", path: "/" },
  { name: "文章", path: "/articles" },
  { name: "个人", path: "/profile" },
  { name: "关于", path: "/about" },
];
</script>

<style>
@reference "./style.css";

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
