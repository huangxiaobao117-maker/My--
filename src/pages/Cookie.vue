<template>
  <div class="min-h-screen bg-white dark:bg-slate-900 py-16">
    <div class="max-w-2xl mx-auto px-6">
      <div class="text-center mb-12">
        <h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-4">Cookie设置</h1>
        <p class="text-slate-500 dark:text-slate-400">管理您的Cookie偏好设置</p>
      </div>

      <div class="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm space-y-6">
        <div>
          <h2 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">Cookie类型</h2>

          <div class="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 mb-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-medium text-slate-900 dark:text-white">必要Cookie</h3>
                <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">这些Cookie对于网站的基本功能是必需的，无法禁用。</p>
              </div>
              <div class="w-10 h-6 bg-green-500 rounded-full flex items-center justify-end px-1">
                <div class="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          <div class="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 mb-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-medium text-slate-900 dark:text-white">分析Cookie</h3>
                <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">帮助我们了解访客如何与网站互动。</p>
              </div>
              <button
                @click="toggleAnalytics"
                :class="[
                  'w-10 h-6 rounded-full flex items-center transition-colors',
                  analyticsEnabled ? 'bg-blue-500 justify-end px-1' : 'bg-slate-300 dark:bg-slate-600 justify-start px-1'
                ]"
              >
                <div class="w-4 h-4 bg-white rounded-full"></div>
              </button>
            </div>
          </div>

          <div class="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-medium text-slate-900 dark:text-white">营销Cookie</h3>
                <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">用于个性化广告和营销内容。</p>
              </div>
              <button
                @click="toggleMarketing"
                :class="[
                  'w-10 h-6 rounded-full flex items-center transition-colors',
                  marketingEnabled ? 'bg-blue-500 justify-end px-1' : 'bg-slate-300 dark:bg-slate-600 justify-start px-1'
                ]"
              >
                <div class="w-4 h-4 bg-white rounded-full"></div>
              </button>
            </div>
          </div>
        </div>

        <div>
          <h2 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">关于Cookie</h2>
          <div class="space-y-3 text-slate-600 dark:text-slate-300">
            <p>Cookie是存储在您设备上的小型文本文件，用于改善您的浏览体验。</p>
            <p>必要Cookie用于网站基本功能，如登录和导航。分析Cookie帮助我们了解网站使用情况。营销Cookie用于提供个性化内容。</p>
            <p>您可以随时返回此页面修改您的Cookie偏好设置。</p>
          </div>
        </div>

        <div class="flex gap-4 pt-4">
          <button
            @click="acceptAll"
            class="flex-1 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
          >
            接受全部
          </button>
          <button
            @click="rejectAll"
            class="flex-1 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-lg transition-colors"
          >
            拒绝全部（必要除外）
          </button>
        </div>
      </div>

      <div v-if="showMessage" class="mt-6 p-4 bg-green-50 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400 text-center">
        Cookie设置已保存！
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const analyticsEnabled = ref(false);
const marketingEnabled = ref(false);
const showMessage = ref(false);

onMounted(() => {
  const savedSettings = localStorage.getItem('cookieSettings');
  if (savedSettings) {
    const settings = JSON.parse(savedSettings);
    analyticsEnabled.value = settings.analytics || false;
    marketingEnabled.value = settings.marketing || false;
  }
});

const saveSettings = () => {
  localStorage.setItem('cookieSettings', JSON.stringify({
    analytics: analyticsEnabled.value,
    marketing: marketingEnabled.value
  }));
  showMessage.value = true;
  setTimeout(() => {
    showMessage.value = false;
  }, 3000);
};

const toggleAnalytics = () => {
  analyticsEnabled.value = !analyticsEnabled.value;
  saveSettings();
};

const toggleMarketing = () => {
  marketingEnabled.value = !marketingEnabled.value;
  saveSettings();
};

const acceptAll = () => {
  analyticsEnabled.value = true;
  marketingEnabled.value = true;
  saveSettings();
};

const rejectAll = () => {
  analyticsEnabled.value = false;
  marketingEnabled.value = false;
  saveSettings();
};
</script>
