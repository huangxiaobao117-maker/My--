<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="show"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
      >
        <div
          class="glass-panel w-full max-w-2xl rounded-[32px] p-8 space-y-8 animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto"
        >
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white">
              {{ isEdit ? "编辑文章" : "发布新文章" }}
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
            <!-- Cover Image -->
            <div class="space-y-2">
              <label
                class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1"
                >文章封面</label
              >
              <div
                class="relative group cursor-pointer aspect-video rounded-2xl overflow-hidden border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center bg-slate-50 dark:bg-slate-800"
                @click="triggerFileInput"
              >
                <img
                  v-if="form.image"
                  :src="form.image"
                  class="w-full h-full object-cover"
                />
                <div v-else class="flex flex-col items-center text-slate-400">
                  <span class="material-symbols-outlined text-4xl"
                    >add_photo_alternate</span
                  >
                  <span class="text-xs mt-2">点击上传封面图</span>
                </div>
                <div
                  v-if="form.image"
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

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label
                  class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1"
                  >文章标题</label
                >
                <input
                  v-model="form.title"
                  type="text"
                  required
                  placeholder="输入引人注目的标题"
                  class="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div class="space-y-2">
                <label
                  class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1"
                  >分类标签</label
                >
                <input
                  v-model="form.tag"
                  type="text"
                  required
                  placeholder="如: 技术方案"
                  class="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label
                  class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1"
                  >发布日期</label
                >
                <input
                  v-model="form.date"
                  type="date"
                  required
                  class="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div class="space-y-2">
                <label
                  class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1"
                  >预计阅读时间</label
                >
                <input
                  v-model="form.readTime"
                  type="text"
                  required
                  placeholder="如: 8 min read"
                  class="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>

            <div class="space-y-2">
              <label
                class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1"
                >文章摘要</label
              >
              <textarea
                v-model="form.desc"
                rows="4"
                required
                placeholder="简要描述文章内容..."
                class="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              ></textarea>
            </div>

            <!-- Article Content -->
            <div class="space-y-2">
              <label
                class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1"
                >文章内容</label
              >
              <textarea
                v-model="form.content"
                rows="10"
                placeholder="在这里手写文章内容..."
                class="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              ></textarea>
            </div>

            <div class="grid grid-cols-2 gap-4 pt-4">
              <button
                type="button"
                @click="$emit('close')"
                class="py-3.5 rounded-2xl font-bold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
              >
                取消
              </button>
              <button type="submit" class="btn-primary">
                {{ isEdit ? "保存修改" : "立即发布" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import { escapeHtml, isValidUrl } from "../utils/sanitize";

const props = defineProps({
  show: Boolean,
  isEdit: Boolean,
  initialData: Object,
});

const emit = defineEmits(["close", "save"]);

const fileInput = ref(null);
const form = reactive({
  title: "",
  tag: "",
  date: new Date().toISOString().split("T")[0],
  readTime: "5 min read",
  desc: "",
  image: "",
  content: "", // Add content field
});

watch(
  () => props.show,
  (newVal) => {
    if (newVal && props.initialData) {
      Object.assign(form, props.initialData);
      // Convert content array to a single string for editing
      if (
        props.initialData.content &&
        Array.isArray(props.initialData.content)
      ) {
        form.content = props.initialData.content
          .map((block) => block.text || block.code || "")
          .join("\n\n");
      } else {
        form.content = "";
      }
    } else if (newVal) {
      // Reset for new entry
      form.title = "";
      form.tag = "";
      form.date = new Date().toISOString().split("T")[0];
      form.readTime = "5 min read";
      form.desc = "";
      form.image = "";
      form.content = ""; // Reset content
    }
  },
);

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
      form.image = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const handleSave = () => {
  // 验证表单数据
  if (!form.title.trim()) {
    alert("请输入文章标题");
    return;
  }

  if (!form.desc.trim()) {
    alert("请输入文章摘要");
    return;
  }

  // 验证封面图片URL
  if (
    form.image &&
    !isValidUrl(form.image) &&
    !form.image.startsWith("data:")
  ) {
    alert("请上传有效的图片");
    return;
  }

  // 创建处理后的表单数据，包含XSS防护
  const processedForm = {
    title: escapeHtml(form.title.trim()),
    tag: escapeHtml(form.tag.trim()),
    date: form.date,
    readTime: form.readTime,
    desc: escapeHtml(form.desc.trim()),
    image: form.image,
    content: [],
  };

  // 处理文章内容
  if (form.content) {
    processedForm.content = form.content.split(/\n\n+/).map((block) => {
      if (block.startsWith("```") && block.endsWith("```")) {
        // 代码块不转义，保持原始格式
        return { code: block.substring(3, block.length - 3).trim() };
      } else {
        // 文本内容进行HTML转义
        return { text: escapeHtml(block.trim()) };
      }
    });
  }

  emit("save", processedForm);
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
