<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
        <div class="glass-panel w-full max-w-2xl rounded-[32px] p-8 space-y-8 animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white">编辑简介信息</h2>
            <button @click="$emit('close')" class="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
              <span class="material-symbols-outlined text-slate-400">close</span>
            </button>
          </div>

          <form @submit.prevent="handleSave" class="space-y-8">
            <!-- Avatar Upload Section -->
            <div class="flex flex-col items-center gap-4">
              <div class="relative group cursor-pointer" @click="triggerFileInput">
                <div class="w-32 h-40 rounded-3xl border-4 border-white dark:border-slate-800 shadow-xl overflow-hidden relative">
                  <img :src="form.avatar" alt="Avatar Preview" class="w-full h-full object-cover">
                  <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span class="material-symbols-outlined text-white text-3xl">photo_camera</span>
                  </div>
                </div>
                <input type="file" ref="fileInput" @change="handleFileChange" accept="image/*" class="hidden">
              </div>
              <p class="text-sm font-medium text-slate-500">点击图片更换主图 (建议比例 4:5)</p>
            </div>

            <div class="space-y-6">
              <div class="space-y-2">
                <label class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">显示名称</label>
                <input v-model="form.name" type="text" required placeholder="请输入您的名字" class="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all">
              </div>

              <div class="space-y-4">
                <div class="flex justify-between items-center">
                  <label class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">个人简介 (多段落)</label>
                  <button type="button" @click="addParagraph" class="text-xs font-bold text-blue-500 hover:text-blue-600 flex items-center gap-1">
                    <span class="material-symbols-outlined text-[16px]">add</span>
                    添加段落
                  </button>
                </div>
                
                <div v-for="(p, index) in form.bio" :key="index" class="relative group">
                  <textarea v-model="form.bio[index]" rows="3" required placeholder="输入简介内容..." class="w-full px-5 py-3 pr-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"></textarea>
                  <button v-if="form.bio.length > 1" type="button" @click="removeParagraph(index)" class="absolute top-3 right-3 p-1.5 rounded-lg bg-pink-50 text-pink-500 opacity-0 group-hover:opacity-100 hover:bg-pink-100 transition-all">
                    <span class="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4 pt-4 sticky bottom-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md pb-2">
              <button type="button" @click="$emit('close')" class="py-3.5 rounded-2xl font-bold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">
                取消
              </button>
              <button type="submit" class="btn-primary">
                保存资料
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'

const props = defineProps({
  show: Boolean,
  initialData: Object
})

const emit = defineEmits(['close', 'save'])

const fileInput = ref(null)
const form = reactive({
  name: '',
  avatar: '',
  bio: ['']
})

watch(() => props.show, (newVal) => {
  if (newVal && props.initialData) {
    form.name = props.initialData.name
    form.avatar = props.initialData.avatar
    form.bio = [...props.initialData.bio]
  }
})

const triggerFileInput = () => {
  fileInput.value.click()
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.size > 2 * 1024 * 1024) {
      alert('图片大小不能超过 2MB')
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      form.avatar = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const addParagraph = () => {
  form.bio.push('')
}

const removeParagraph = (index) => {
  form.bio.splice(index, 1)
}

const handleSave = () => {
  emit('save', { ...form })
  emit('close')
}
</script>

<style scoped>
@reference "../style.css";
.modal-enter-active, .modal-leave-active { transition: opacity 0.3s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }

/* Custom scrollbar for the modal content */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}
.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
.dark .overflow-y-auto::-webkit-scrollbar-thumb {
  background: #334155;
}
</style>
