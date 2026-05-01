<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center p-4"
  >
    <div
      class="absolute inset-0 bg-black/50 backdrop-blur-sm"
      @click="$emit('close')"
    ></div>

    <div
      class="relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md p-6 animate-scale-in"
    >
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold text-slate-900 dark:text-white">管理标签</h2>
        <button
          @click="$emit('close')"
          class="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          <span class="material-symbols-outlined text-slate-500">close</span>
        </button>
      </div>

      <div class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            当前标签
          </label>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in currentTags"
              :key="tag.label"
              :class="tag.bg + ' ' + tag.color"
              class="px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1 group"
            >
              {{ tag.label }}
              <button
                @click="removeTag(tag.label)"
                class="w-4 h-4 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors"
              >
                <span class="material-symbols-outlined text-xs">close</span>
              </button>
            </span>
            <span
              v-if="currentTags.length === 0"
              class="text-slate-400 text-sm"
            >
              暂无标签，点击下方推荐标签添加
            </span>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            添加自定义标签
          </label>
          <div class="flex gap-2">
            <input
              v-model="newTagInput"
              @keyup.enter="addCustomTag"
              type="text"
              placeholder="输入标签名称..."
              class="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              @click="addCustomTag"
              :disabled="!newTagInput.trim()"
              class="px-4 py-2.5 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              添加
            </button>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            推荐标签
          </label>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="tag in recommendedTags"
              :key="tag.label"
              @click="addTag(tag)"
              :class="[
                tag.bg + ' ' + tag.color,
                'px-3 py-1.5 rounded-full text-sm font-medium transition-all hover:scale-105',
                isTagAdded(tag.label) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              ]"
            >
              {{ tag.label }}
            </button>
          </div>
        </div>
      </div>

      <div class="flex gap-3 mt-8">
        <button
          @click="$emit('close')"
          class="flex-1 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
        >
          取消
        </button>
        <button
          @click="handleSave"
          class="flex-1 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
        >
          保存
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  show: Boolean,
  initialTags: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["close", "save"]);

const currentTags = ref([...props.initialTags]);
const newTagInput = ref("");

const recommendedTags = [
  { label: "Vue 3", bg: "bg-blue-50", color: "text-blue-500" },
  { label: "前端开发", bg: "bg-green-50", color: "text-green-500" },
  { label: "TypeScript", bg: "bg-blue-50", color: "text-blue-600" },
  { label: "React", bg: "bg-cyan-50", color: "text-cyan-500" },
  { label: "UI设计", bg: "bg-pink-50", color: "text-pink-500" },
  { label: "UX设计", bg: "bg-purple-50", color: "text-purple-500" },
  { label: "数字游民", bg: "bg-indigo-50", color: "text-indigo-500" },
  { label: "动漫爱好者", bg: "bg-red-50", color: "text-red-500" },
  { label: "游戏玩家", bg: "bg-emerald-50", color: "text-emerald-500" },
  { label: "二次元文化", bg: "bg-indigo-50", color: "text-indigo-600" },
  { label: "Cosplay", bg: "bg-yellow-50", color: "text-yellow-600" },
  { label: "ACGN", bg: "bg-teal-50", color: "text-teal-500" },
  { label: "摄影", bg: "bg-orange-50", color: "text-orange-500" },
  { label: "音乐", bg: "bg-pink-50", color: "text-pink-600" },
  { label: "旅行", bg: "bg-green-50", color: "text-green-600" },
  { label: "美食", bg: "bg-amber-50", color: "text-amber-500" },
  { label: "健身", bg: "bg-red-50", color: "text-red-600" },
  { label: "阅读", bg: "bg-blue-50", color: "text-blue-400" },
  { label: "写作", bg: "bg-purple-50", color: "text-purple-600" },
  { label: "创业", bg: "bg-indigo-50", color: "text-indigo-500" },
];

const colorSchemes = [
  { bg: "bg-blue-50", color: "text-blue-500" },
  { bg: "bg-green-50", color: "text-green-500" },
  { bg: "bg-pink-50", color: "text-pink-500" },
  { bg: "bg-purple-50", color: "text-purple-500" },
  { bg: "bg-indigo-50", color: "text-indigo-500" },
  { bg: "bg-yellow-50", color: "text-yellow-600" },
  { bg: "bg-teal-50", color: "text-teal-500" },
  { bg: "bg-red-50", color: "text-red-500" },
];

const isTagAdded = (label) => {
  return currentTags.value.some((tag) => tag.label === label);
};

const addTag = (tag) => {
  if (!isTagAdded(tag.label)) {
    currentTags.value.push({ ...tag });
  }
};

const removeTag = (label) => {
  currentTags.value = currentTags.value.filter((tag) => tag.label !== label);
};

const addCustomTag = () => {
  const label = newTagInput.value.trim();
  if (!label || isTagAdded(label)) return;

  const scheme = colorSchemes[currentTags.value.length % colorSchemes.length];
  currentTags.value.push({ label, ...scheme });
  newTagInput.value = "";
};

const handleSave = () => {
  emit("save", currentTags.value);
};
</script>

<style scoped>
.animate-scale-in {
  animation: scaleIn 0.2s ease-out;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
