<template>
  <section class="rounded-[40px] p-12 md:p-20 text-center space-y-10 relative overflow-hidden bg-gradient-to-br from-[#f8f9ff] via-[#fcfdff] to-[#fff5f6] dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 border border-white dark:border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.03)] dark:shadow-none">
    <div class="relative z-10 space-y-5">
      <h2 class="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">开启一段对话</h2>
      <p class="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-[1.8] text-[15px] md:text-[16px]">
        无论是想探讨技术难题、寻求合作机会，还是仅仅想打个招呼，都随时欢迎。让我们一起创造一些有意义的事物。
      </p>
      
      <div class="flex flex-wrap justify-center items-center gap-4 pt-8">
        <!-- Main Email Button -->
        <button 
          @click="handleEmailClick"
          class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg shadow-blue-600/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 cursor-pointer"
        >
          <span class="material-symbols-outlined text-[22px]">mail</span>
          发送邮件
        </button>

        <!-- Social Icons -->
        <div class="flex gap-4">
          <button 
            v-for="item in contactItems" 
            :key="item.icon" 
            @click="handleIconClick(item)"
            class="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:bg-white dark:hover:bg-slate-800 hover:text-blue-500 hover:border-blue-100 hover:shadow-md transition-all cursor-pointer group relative"
            :title="item.label"
          >
            <span class="material-symbols-outlined text-[20px]">{{ item.icon }}</span>
            <!-- Tooltip -->
            <span class="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {{ item.label }}
            </span>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Decorative background elements (optional, subtle) -->
    <div class="absolute top-0 right-0 w-64 h-64 bg-blue-100/20 blur-3xl rounded-full -mr-32 -mt-32"></div>
    <div class="absolute bottom-0 left-0 w-64 h-64 bg-pink-100/20 blur-3xl rounded-full -ml-32 -mb-32"></div>
  </section>
</template>

<script setup>
const email = 'alex.rivera@example.com'

const contactItems = [
  { icon: 'alternate_email', label: '复制邮箱', action: 'copy' },
  { icon: 'share', label: '分享站点', action: 'share' },
  { icon: 'image', label: '联系方式二维码', action: 'qr' }
]

const handleEmailClick = () => {
  window.location.href = `mailto:${email}?subject=来自博客的咨询`
}

const handleIconClick = (item) => {
  switch (item.action) {
    case 'copy':
      navigator.clipboard.writeText(email).then(() => {
        alert('邮箱地址已复制到剪贴板！')
      })
      break
    case 'share':
      if (navigator.share) {
        navigator.share({
          title: 'Alex Rivera 的个人博客',
          text: '来看看这个超酷的玻璃拟态个人博客！',
          url: window.location.href
        }).catch(console.error)
      } else {
        alert('您的浏览器不支持原生分享，请手动复制链接。')
      }
      break
    case 'qr':
      alert('联系方式二维码功能开发中...')
      break
  }
}
</script>

<style scoped>
@reference "../style.css";
</style>
