<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
        <div class="glass-panel w-full max-w-lg rounded-[32px] p-8 space-y-8 animate-in fade-in zoom-in duration-300 overflow-y-auto max-h-[90vh]">
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-blue-500">lock</span>
              <h2 class="text-2xl font-bold text-slate-900 dark:text-white">账号安全</h2>
            </div>
            <button @click="$emit('close')" class="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
              <span class="material-symbols-outlined text-slate-400">close</span>
            </button>
          </div>

          <div class="space-y-6">
            <!-- Password Section -->
            <div class="space-y-4">
              <h3 class="text-sm font-bold text-slate-400 uppercase tracking-wider">登录密码</h3>
              <div class="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                <div class="flex items-center gap-4">
                  <span class="material-symbols-outlined text-slate-400">password</span>
                  <div>
                    <div class="text-sm font-bold text-slate-700 dark:text-slate-200">修改密码</div>
                    <div class="text-xs text-slate-400 mt-0.5">定期修改密码以保护账号安全</div>
                  </div>
                </div>
                <button @click="handleAction('change_password')" class="text-blue-500 text-sm font-bold hover:underline">修改</button>
              </div>
            </div>

            <!-- Bindings Section -->
            <div class="space-y-4">
              <h3 class="text-sm font-bold text-slate-400 uppercase tracking-wider">安全绑定</h3>
              <div class="space-y-3">
                <div v-for="item in bindings" :key="item.label" class="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                  <div class="flex items-center gap-4">
                    <span class="material-symbols-outlined text-slate-400">{{ item.icon }}</span>
                    <div>
                      <div class="text-sm font-bold text-slate-700 dark:text-slate-200">{{ item.label }}</div>
                      <div class="text-xs text-slate-400 mt-0.5">{{ item.value || '未绑定' }}</div>
                    </div>
                  </div>
                  <button @click="handleAction('bind_' + item.id)" class="text-blue-500 text-sm font-bold hover:underline">
                    {{ item.value ? '更换' : '绑定' }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Two-Factor Auth -->
            <div class="space-y-4">
              <h3 class="text-sm font-bold text-slate-400 uppercase tracking-wider">高级保护</h3>
              <div class="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                <div class="flex items-center gap-4">
                  <span class="material-symbols-outlined text-slate-400">verified_user</span>
                  <div>
                    <div class="text-sm font-bold text-slate-700 dark:text-slate-200">两步验证 (2FA)</div>
                    <div class="text-xs text-slate-400 mt-0.5">登录时需要额外的验证码</div>
                  </div>
                </div>
                <div @click="toggle2FA" class="w-10 h-5 rounded-full relative p-0.5 cursor-pointer transition-colors duration-300"
                  :class="is2FAEnabled ? 'bg-blue-500' : 'bg-slate-200 dark:bg-slate-700'">
                  <div class="w-4 h-4 bg-white rounded-full shadow-sm absolute transition-all duration-300"
                    :style="{ left: is2FAEnabled ? '22px' : '2px' }"></div>
                </div>
              </div>
            </div>

            <!-- Login History -->
            <div class="space-y-4">
              <h3 class="text-sm font-bold text-slate-400 uppercase tracking-wider">最近登录活动</h3>
              <div class="space-y-2">
                <div v-for="(log, idx) in loginLogs" :key="idx" class="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div class="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                    <span class="material-symbols-outlined text-[18px] text-blue-500">{{ log.icon }}</span>
                  </div>
                  <div class="flex-1">
                    <div class="text-[13px] font-bold text-slate-700 dark:text-slate-200">{{ log.device }}</div>
                    <div class="text-[11px] text-slate-400">{{ log.time }} · {{ log.location }}</div>
                  </div>
                  <div v-if="log.current" class="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">当前会话</div>
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
import { ref } from 'vue'

defineProps({
  show: Boolean
})

const emit = defineEmits(['close'])

const is2FAEnabled = ref(false)

const bindings = [
  { id: 'email', label: '电子邮箱', icon: 'mail', value: 'alex****@gmail.com' },
  { id: 'phone', label: '手机号码', icon: 'smartphone', value: '138****8888' }
]

const loginLogs = [
  { device: 'Windows PC · Chrome', time: '2分钟前', location: '上海, 中国', icon: 'desktop_windows', current: true },
  { device: 'iPhone 15 Pro · Safari', time: '5小时前', location: '杭州, 中国', icon: 'smartphone', current: false },
  { device: 'MacBook Pro · Edge', time: '昨天 14:20', location: '上海, 中国', icon: 'laptop_mac', current: false }
]

const toggle2FA = () => {
  is2FAEnabled.value = !is2FAEnabled.value
  alert(is2FAEnabled.value ? '两步验证已开启' : '两步验证已关闭')
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
  background-color: #e2e8f0;
  border-radius: 9999px;
}
.dark .overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #334155;
}
</style>
