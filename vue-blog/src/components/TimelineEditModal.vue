<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
        <div class="glass-panel w-full max-w-lg rounded-[32px] p-8 space-y-8 animate-in fade-in zoom-in duration-300">
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white">{{ isEdit ? '编辑里程碑' : '添加成长足迹' }}</h2>
            <button @click="$emit('close')" class="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
              <span class="material-symbols-outlined text-slate-400">close</span>
            </button>
          </div>

          <form @submit.prevent="handleSave" class="space-y-6">
            <div class="space-y-2">
              <label class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">时间范围</label>
              <input v-model="form.date" type="text" required placeholder="如: 2023 - 至今" class="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all">
            </div>
            
            <div class="space-y-2">
              <label class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">标题</label>
              <input v-model="form.title" type="text" required placeholder="如: 资深前端开发" class="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all">
            </div>

            <div class="space-y-2">
              <label class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">详细描述</label>
              <textarea v-model="form.desc" rows="3" required placeholder="分享你的主要成就或职责..." class="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"></textarea>
            </div>

            <div class="space-y-2">
              <label class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">图标名称 (Material Icon)</label>
              <input v-model="form.icon" type="text" required placeholder="如: school, rocket_launch" class="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all">
            </div>

            <div class="grid grid-cols-2 gap-4 pt-4">
              <button type="button" @click="$emit('close')" class="py-3.5 rounded-2xl font-bold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">
                取消
              </button>
              <button type="submit" class="btn-primary">
                {{ isEdit ? '保存修改' : '确认添加' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  show: Boolean,
  isEdit: Boolean,
  initialData: Object
})

const emit = defineEmits(['close', 'save'])

const form = reactive({
  date: '',
  title: '',
  desc: '',
  icon: 'rocket_launch',
  dotColor: 'bg-blue-400',
  textColor: 'text-blue-500'
})

watch(() => props.show, (newVal) => {
  if (newVal && props.initialData) {
    Object.assign(form, props.initialData)
  } else if (newVal) {
    form.date = ''
    form.title = ''
    form.desc = ''
    form.icon = 'rocket_launch'
  }
})

const handleSave = () => {
  if (!props.isEdit) {
    const presets = [
      { dotColor: 'bg-blue-400', textColor: 'text-blue-500' },
      { dotColor: 'bg-pink-400', textColor: 'text-pink-500' },
      { dotColor: 'bg-purple-400', textColor: 'text-purple-500' }
    ]
    const randomPreset = presets[Math.floor(Math.random() * presets.length)]
    Object.assign(form, randomPreset)
  }
  
  emit('save', { ...form })
  emit('close')
}
</script>

<style scoped>
@reference "../style.css";
.modal-enter-active, .modal-leave-active { transition: opacity 0.3s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
</style>
