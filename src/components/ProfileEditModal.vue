<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="show"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
      >
        <div
          class="glass-panel w-full max-w-lg rounded-[32px] p-8 space-y-8 animate-in fade-in zoom-in duration-300"
        >
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white">
              编辑个人资料
            </h2>
            <button
              @click="$emit('close')"
              class="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
              <span class="material-symbols-outlined text-slate-400"
                >close</span
              >
            </button>
          </div>

          <form @submit.prevent="handleSave" class="space-y-6">
            <!-- Avatar Upload Section -->
            <div class="flex flex-col items-center gap-4">
              <div
                class="relative group cursor-pointer"
                @click="triggerFileInput"
              >
                <div
                  class="w-24 h-24 rounded-full border-4 border-white dark:border-slate-800 shadow-lg overflow-hidden relative"
                >
                  <img
                    :src="form.avatar"
                    alt="Avatar Preview"
                    class="w-full h-full object-cover"
                  />
                  <div
                    class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span class="material-symbols-outlined text-white"
                      >photo_camera</span
                    >
                  </div>
                </div>
                <input
                  type="file"
                  ref="fileInput"
                  @change="handleFileChange"
                  accept="image/*"
                  class="hidden"
                />
              </div>
              <p class="text-xs text-slate-400">点击头像上传新照片</p>
            </div>

            <div class="space-y-2">
              <label
                class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1"
                >昵称</label
              >
              <input
                v-model="form.name"
                type="text"
                class="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <div class="space-y-2">
              <label
                class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1"
                >个人简介</label
              >
              <textarea
                v-model="form.bio"
                rows="3"
                class="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              ></textarea>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <button
                type="button"
                @click="$emit('close')"
                class="py-3.5 rounded-2xl font-bold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
              >
                取消
              </button>
              <button type="submit" class="btn-primary">保存修改</button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { reactive, ref } from "vue";

const props = defineProps({
  show: Boolean,
  initialData: Object,
});

const emit = defineEmits(["close", "save"]);

const fileInput = ref(null);
const form = reactive({
  name: props.initialData.name,
  bio: props.initialData.bio,
  avatar: props.initialData.avatar,
});

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.size > 2 * 1024 * 1024) {
      alert("图片大小不能超过 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      form.avatar = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const handleSave = () => {
  emit("save", { ...form });
  emit("close");
};
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
</style>
