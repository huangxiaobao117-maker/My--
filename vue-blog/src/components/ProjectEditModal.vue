<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
        <div class="glass-panel w-full max-w-2xl rounded-[32px] p-8 space-y-8 animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white">{{ isEdit ? '编辑项目' : '上传新项目' }}</h2>
            <button @click="$emit('close')" class="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
              <span class="material-symbols-outlined text-slate-400">close</span>
            </button>
          </div>

          <form @submit.prevent="handleSave" class="space-y-6">
            <!-- Project Image -->
            <div class="space-y-2">
              <label class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">项目封面</label>
              <div class="relative group cursor-pointer aspect-video rounded-2xl overflow-hidden border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center bg-slate-50 dark:bg-slate-800" @click="triggerFileInput">
                <img v-if="form.image" :src="form.image" class="w-full h-full object-cover">
                <div v-else class="flex flex-col items-center text-slate-400">
                  <span class="material-symbols-outlined text-4xl">add_photo_alternate</span>
                  <span class="text-xs mt-2">点击上传封面图</span>
                </div>
                <div v-if="form.image" class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span class="material-symbols-outlined text-white">photo_camera</span>
                </div>
              </div>
              <input type="file" ref="fileInput" @change="handleFileChange" accept="image/*" class="hidden">
            </div>

            <div class="space-y-2">
              <label class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">项目名称</label>
              <input v-model="form.title" type="text" required placeholder="输入项目名称" class="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all">
            </div>

            <div class="space-y-2">
              <label class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">项目描述</label>
              <textarea v-model="form.desc" rows="4" required placeholder="简要描述项目内容..." class="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"></textarea>
            </div>

            <div class="space-y-2">
              <label class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">项目分类</label>
              <input v-model="form.category" type="text" required placeholder="如: 前端开发, 后端服务" class="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all">
            </div>

            <!-- Project Code/Folder Upload (Simplified for now) -->
            <div class="space-y-2">
              <label class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">项目代码/文件夹 (可选项)</label>
              <input type="file" webkitdirectory directory multiple @change="handleFolderChange" class="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all">
              <p v-if="form.code" class="text-xs text-slate-500 dark:text-slate-400 mt-1">已选择文件/文件夹: {{ form.code.length }} 个文件</p>
            </div>

            <div class="grid grid-cols-2 gap-4 pt-4">
              <button type="button" @click="$emit('close')" class="py-3.5 rounded-2xl font-bold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">
                取消
              </button>
              <button type="submit" class="btn-primary">
                {{ isEdit ? '保存修改' : '上传项目' }}
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
  isEdit: Boolean,
  initialData: Object
})

const emit = defineEmits(['close', 'save'])

const fileInput = ref(null)
const form = reactive({
  title: '',
  desc: '',
  image: '',
  category: '',
  code: null // To store file/folder data
})

watch(() => props.show, (newVal) => {
  if (newVal && props.initialData) {
    Object.assign(form, props.initialData)
  } else if (newVal) {
    // Reset for new entry
    form.title = ''
    form.desc = ''
    form.image = ''
    form.category = ''
    form.code = null
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
      form.image = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const handleFolderChange = (event) => {
  form.code = event.target.files; // Store the FileList object
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
</style>
