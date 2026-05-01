<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
        <div class="glass-panel w-full max-w-lg rounded-[32px] p-8 space-y-8 animate-in fade-in zoom-in duration-300 overflow-y-auto max-h-[90vh]">
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-blue-500">notifications</span>
              <h2 class="text-2xl font-bold text-slate-900 dark:text-white">通知中心</h2>
            </div>
            <div class="flex items-center gap-2">
              <button @click="markAllAsRead" class="text-xs font-bold text-blue-500 hover:underline">全部已读</button>
              <button @click="$emit('close')" class="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
                <span class="material-symbols-outlined text-slate-400">close</span>
              </button>
            </div>
          </div>

          <div class="space-y-6">
            <!-- Tabs -->
            <div class="flex border-b border-slate-100 dark:border-slate-800">
              <button v-for="tab in tabs" :key="tab.id" 
                @click="activeTab = tab.id"
                class="px-6 py-3 text-sm font-bold transition-all relative"
                :class="activeTab === tab.id ? 'text-blue-500' : 'text-slate-400 hover:text-slate-600'">
                {{ tab.name }}
                <div v-if="activeTab === tab.id" class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-full"></div>
              </button>
            </div>

            <!-- Notifications List -->
            <div v-if="activeTab === 'all'" class="space-y-4">
              <div v-for="(notification, idx) in notifications" :key="idx" 
                class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 group hover:bg-white dark:hover:bg-slate-800 transition-all cursor-pointer relative">
                <div v-if="!notification.read" class="absolute top-4 right-4 w-2 h-2 bg-blue-500 rounded-full"></div>
                <div class="flex gap-4">
                  <div :class="notification.iconBg" class="w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-[20px]" :class="notification.iconColor">{{ notification.icon }}</span>
                  </div>
                  <div class="space-y-1 flex-1">
                    <div class="text-sm font-bold text-slate-800 dark:text-slate-200">{{ notification.title }}</div>
                    <div class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{{ notification.content }}</div>
                    <div class="text-[11px] text-slate-400 pt-1">{{ notification.time }}</div>
                  </div>
                </div>
              </div>
              <div v-if="notifications.length === 0" class="py-20 text-center space-y-4">
                <span class="material-symbols-outlined text-6xl text-slate-100 dark:text-slate-800">notifications_off</span>
                <p class="text-sm text-slate-400">暂无新通知</p>
              </div>
            </div>

            <!-- Settings Tab -->
            <div v-if="activeTab === 'settings'" class="space-y-6">
              <div class="space-y-4">
                <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider">推送偏好</h3>
                <div class="space-y-1">
                  <div v-for="setting in pushSettings" :key="setting.id" 
                    class="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                    <div class="text-sm font-medium text-slate-700 dark:text-slate-200">{{ setting.name }}</div>
                    <div @click="setting.enabled = !setting.enabled" 
                      class="w-10 h-5 rounded-full relative p-0.5 cursor-pointer transition-colors duration-300"
                      :class="setting.enabled ? 'bg-blue-500' : 'bg-slate-200 dark:bg-slate-700'">
                      <div class="w-4 h-4 bg-white rounded-full shadow-sm absolute transition-all duration-300"
                        :style="{ left: setting.enabled ? '22px' : '2px' }"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, reactive } from 'vue'

defineProps({
  show: Boolean
})

const emit = defineEmits(['close'])

const activeTab = ref('all')
const tabs = [
  { id: 'all', name: '全部通知' },
  { id: 'settings', name: '通知设置' }
]

const notifications = reactive([
  {
    title: '系统更新',
    content: '黄小包博客 v2.4.0 版本已发布，快来体验最新的玻璃拟态组件。',
    time: '10分钟前',
    icon: 'system_update',
    iconBg: 'bg-blue-50 dark:bg-blue-900/30',
    iconColor: 'text-blue-500',
    read: false
  },
  {
    title: '新评论',
    content: '@设计狮王 评论了你的文章《Vue 3 响应式原理深度解析》。',
    time: '2小时前',
    icon: 'chat_bubble',
    iconBg: 'bg-pink-50 dark:bg-pink-900/30',
    iconColor: 'text-pink-500',
    read: false
  },
  {
    title: '文章被收藏',
    content: '你的文章《玻璃拟态在 UI 设计中的应用》被 12 位用户收藏。',
    time: '昨天 18:30',
    icon: 'bookmark',
    iconBg: 'bg-amber-50 dark:bg-amber-900/30',
    iconColor: 'text-amber-500',
    read: true
  }
])

const pushSettings = reactive([
  { id: 'email', name: '邮件通知', enabled: true },
  { id: 'browser', name: '浏览器推送', enabled: true },
  { id: 'mentions', name: '@我的通知', enabled: true },
  { id: 'marketing', name: '活动与推广', enabled: false }
])

const markAllAsRead = () => {
  notifications.forEach(n => n.read = true)
  alert('已将所有通知设为已读')
}

const handleAction = (action) => {
  alert(`功能 [${action}] 正在开发中...`)
}
</script>

<style scoped>
@reference "../style.css";

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Custom scrollbar for overflow content */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}
.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  @apply bg-slate-200 dark:bg-slate-700 rounded-full;
}
</style>
