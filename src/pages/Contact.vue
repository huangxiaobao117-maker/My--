<template>
  <div class="min-h-screen bg-white dark:bg-slate-900 py-16">
    <div class="max-w-2xl mx-auto px-6">
      <!-- Page Title -->
      <div class="text-center mb-12">
        <h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-4">联系我们</h1>
        <p class="text-slate-500 dark:text-slate-400">有任何问题或建议？欢迎与我联系</p>
      </div>

      <!-- Contact Form -->
      <div class="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm">
        <h2 class="font-semibold text-slate-900 dark:text-white mb-6">发送消息</h2>
        
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">姓名</label>
            <input
              type="text"
              id="name"
              v-model="form.name"
              class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-white"
              placeholder="请输入您的姓名"
              required
            />
          </div>
          
          <div>
            <label for="email" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">邮箱</label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-white"
              placeholder="请输入您的邮箱"
              required
            />
          </div>
          
          <div>
            <label for="subject" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">主题</label>
            <input
              type="text"
              id="subject"
              v-model="form.subject"
              class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-white"
              placeholder="请输入消息主题"
              required
            />
          </div>
          
          <div>
            <label for="message" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">消息内容</label>
            <textarea
              id="message"
              v-model="form.message"
              rows="5"
              class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-white resize-none"
              placeholder="请输入您的消息..."
              required
            ></textarea>
          </div>
          
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <svg v-if="isSubmitting" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isSubmitting ? '发送中...' : '发送消息' }}
          </button>
        </form>
        
        <!-- Success Message -->
        <div v-if="showSuccess" class="mt-6 p-4 bg-green-50 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400 text-center">
          消息发送成功！我会尽快回复您。
        </div>
      </div>

      <!-- Contact Info -->
      <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 text-center">
          <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          </div>
          <h3 class="font-medium text-slate-900 dark:text-white mb-2">邮箱</h3>
          <a href="mailto:huangxiaobao@example.com" class="text-slate-500 dark:text-slate-400 hover:text-blue-500 transition-colors">huangxiaobao@example.com</a>
        </div>
        
        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 text-center">
          <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h3 class="font-medium text-slate-900 dark:text-white mb-2">社交媒体</h3>
          <div class="flex justify-center gap-3">
            <a href="https://github.com/huangxiaobao" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 hover:bg-slate-700 hover:text-white transition-colors">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href="https://twitter.com/huangxiaobao" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 hover:bg-blue-400 hover:text-white transition-colors">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
          </div>
        </div>
        
        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 text-center">
          <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
          <h3 class="font-medium text-slate-900 dark:text-white mb-2">位置</h3>
          <p class="text-slate-500 dark:text-slate-400">中国北京市</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const isSubmitting = ref(false);
const showSuccess = ref(false);

const handleSubmit = async () => {
  isSubmitting.value = true;
  
  // 模拟发送请求
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // 重置表单
  form.name = '';
  form.email = '';
  form.subject = '';
  form.message = '';
  
  isSubmitting.value = false;
  showSuccess.value = true;
  
  // 3秒后隐藏成功消息
  setTimeout(() => {
    showSuccess.value = false;
  }, 3000);
};
</script>
