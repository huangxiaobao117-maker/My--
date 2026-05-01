<template>
  <div class="min-h-screen bg-white dark:bg-slate-900 py-16">
    <div class="max-w-4xl mx-auto px-6">
      <!-- Page Title -->
      <div class="text-center mb-12">
        <h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          网站地图
        </h1>
        <p class="text-slate-500 dark:text-slate-400">
          探索黄小包博客的所有内容
        </p>
      </div>

      <!-- Sitemap Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Main Pages -->
        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <h2
            class="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2"
          >
            <svg
              class="w-5 h-5 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            主要页面
          </h2>
          <ul class="space-y-3">
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
        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <h2
            class="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2"
          >
            <svg
              class="w-5 h-5 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            资源链接
          </h2>
          <ul class="space-y-3">
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
                to="/terms"
                class="text-slate-500 dark:text-slate-400 hover:text-blue-500 transition-colors flex items-center gap-2"
              >
                <span
                  class="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"
                ></span>
                使用条款
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

        <!-- Categories -->
        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <h2
            class="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2"
          >
            <svg
              class="w-5 h-5 text-purple-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
            文章分类
          </h2>
          <ul class="space-y-3">
            <li>
              <a
                href="/articles?category=前端开发"
                class="text-slate-500 dark:text-slate-400 hover:text-blue-500 transition-colors flex items-center gap-2"
              >
                <span
                  class="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"
                ></span>
                前端开发
              </a>
            </li>
            <li>
              <a
                href="/articles?category=UI设计"
                class="text-slate-500 dark:text-slate-400 hover:text-blue-500 transition-colors flex items-center gap-2"
              >
                <span
                  class="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"
                ></span>
                UI设计
              </a>
            </li>
            <li>
              <a
                href="/articles?category=技术分享"
                class="text-slate-500 dark:text-slate-400 hover:text-blue-500 transition-colors flex items-center gap-2"
              >
                <span
                  class="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"
                ></span>
                技术分享
              </a>
            </li>
            <li>
              <a
                href="/articles?category=生活随笔"
                class="text-slate-500 dark:text-slate-400 hover:text-blue-500 transition-colors flex items-center gap-2"
              >
                <span
                  class="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"
                ></span>
                生活随笔
              </a>
            </li>
            <li>
              <a
                href="/articles?category=二次元"
                class="text-slate-500 dark:text-slate-400 hover:text-blue-500 transition-colors flex items-center gap-2"
              >
                <span
                  class="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"
                ></span>
                二次元
              </a>
            </li>
            <li>
              <a
                href="/articles?category=游戏攻略"
                class="text-slate-500 dark:text-slate-400 hover:text-blue-500 transition-colors flex items-center gap-2"
              >
                <span
                  class="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"
                ></span>
                游戏攻略
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Site Info -->
      <div class="mt-12 text-center text-slate-400 text-sm">
        <p>© 2026 黄小包博客. 保留所有权利.</p>
      </div>
    </div>
  </div>
</template>
