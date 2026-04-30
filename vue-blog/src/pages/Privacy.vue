<template>
  <div
    class="min-h-screen bg-[#f9fafc] dark:bg-slate-950 transition-colors duration-300"
  >
    <!-- Header -->
    <header
      class="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-50"
    >
      <div
        class="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between"
      >
        <router-link to="/" class="text-xl font-bold text-gradient"
          >黄小包博客</router-link
        >
        <nav class="hidden md:flex items-center gap-8">
          <router-link
            v-for="link in navLinks"
            :key="link.name"
            :to="link.path"
            class="text-slate-600 dark:text-slate-300 hover:text-blue-500 transition-colors font-medium"
          >
            {{ link.name }}
          </router-link>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-3xl mx-auto px-6 py-16">
      <div class="glass-panel rounded-[32px] p-8 md:p-12 space-y-10">
        <h1
          class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white"
        >
          隐私政策
        </h1>

        <section class="space-y-6">
          <h2 class="text-xl font-bold text-slate-800 dark:text-slate-200">
            1. 引言
          </h2>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
            欢迎访问黄小包博客（以下简称"本站"）。我们重视您的隐私，并承诺保护您的个人信息。本隐私政策说明了我们如何收集、使用、存储和保护您的信息。
          </p>
        </section>

        <section class="space-y-6">
          <h2 class="text-xl font-bold text-slate-800 dark:text-slate-200">
            2. 信息收集
          </h2>
          <div class="space-y-4">
            <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>自动收集的信息：</strong
              >当您访问本站时，我们可能会自动收集某些信息，包括但不限于：
            </p>
            <ul
              class="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400"
            >
              <li>您的IP地址</li>
              <li>浏览器类型和版本</li>
              <li>访问时间和日期</li>
              <li>访问的页面</li>
            </ul>
            <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>自愿提供的信息：</strong
              >您可以选择向我们提供个人信息，例如在评论或联系表单中提交的信息。
            </p>
          </div>
        </section>

        <section class="space-y-6">
          <h2 class="text-xl font-bold text-slate-800 dark:text-slate-200">
            3. 信息使用
          </h2>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
            我们收集的信息用于以下目的：
          </p>
          <ul
            class="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400"
          >
            <li>提供和维护本站服务</li>
            <li>改进和优化用户体验</li>
            <li>分析网站流量和使用模式</li>
            <li>与您沟通（如果您选择提供联系方式）</li>
          </ul>
        </section>

        <section class="space-y-6">
          <h2 class="text-xl font-bold text-slate-800 dark:text-slate-200">
            4. 信息共享
          </h2>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
            我们不会向第三方出售、出租或分享您的个人信息，除非：
          </p>
          <ul
            class="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400"
          >
            <li>法律要求或法院命令</li>
            <li>保护我们的合法权益</li>
            <li>您明确同意</li>
          </ul>
        </section>

        <section class="space-y-6">
          <h2 class="text-xl font-bold text-slate-800 dark:text-slate-200">
            5. Cookie使用
          </h2>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
            本站使用Cookie来改善用户体验。您可以通过浏览器设置拒绝Cookie，但这可能会影响某些功能的使用。
          </p>
        </section>

        <section class="space-y-6">
          <h2 class="text-xl font-bold text-slate-800 dark:text-slate-200">
            6. 数据安全
          </h2>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
            我们采取合理的安全措施保护您的信息，但请理解，没有任何安全措施是绝对安全的。
          </p>
        </section>

        <section class="space-y-6">
          <h2 class="text-xl font-bold text-slate-800 dark:text-slate-200">
            7. 隐私政策变更
          </h2>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
            我们可能会不时更新本隐私政策。更新后的政策将在本站发布，您应定期查看。
          </p>
        </section>

        <section class="space-y-6">
          <h2 class="text-xl font-bold text-slate-800 dark:text-slate-200">
            8. 联系我们
          </h2>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
            如果您对本隐私政策有任何疑问，请通过以下方式联系我们：
          </p>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
            <strong>邮箱：</strong>contact@nextgen-blog.com
          </p>
        </section>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white dark:bg-slate-900 py-16 mt-10">
      <div
        class="max-w-[1200px] mx-auto px-6 flex flex-col items-center gap-8 text-center"
      >
        <div class="text-lg font-bold text-slate-900 dark:text-white">
          黄小包博客
        </div>
        <div
          class="flex flex-wrap justify-center gap-x-10 gap-y-4 text-[14px] text-slate-500 dark:text-slate-400 font-medium"
        >
          <router-link to="/about" class="hover:text-blue-500 transition-colors"
            >关于本站</router-link
          >
          <router-link
            to="/privacy"
            class="hover:text-blue-500 transition-colors"
            >隐私政策</router-link
          >
          <a href="/rss.xml" class="hover:text-blue-500 transition-colors"
            >RSS订阅</a
          >
          <a href="#" class="hover:text-blue-500 transition-colors">社交媒体</a>
        </div>
        <div class="text-[13px] text-slate-400">
          © 2026 黄小包博客. 保留所有权利.
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const navLinks = [
  { name: "首页", path: "/" },
  { name: "文章", path: "/articles" },
  { name: "个人", path: "/profile" },
  { name: "关于", path: "/about" },
];
</script>
