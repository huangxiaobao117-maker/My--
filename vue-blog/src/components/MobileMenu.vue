<template>
  <!-- 汉堡菜单按钮 -->
  <button
    @click="isOpen = !isOpen"
    class="md:hidden p-2 hover:bg-slate-50 rounded-full transition-all"
    aria-label="Toggle menu"
  >
    <span
      class="material-symbols-outlined text-slate-600 text-[24px]"
    >{{ isOpen ? 'close' : 'menu' }}</span>
  </button>

  <!-- 移动端菜单遮罩 -->
  <Transition name="slide">
    <div
      v-if="isOpen"
      class="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
      @click="isOpen = false"
    ></div>
  </Transition>

  <!-- 移动端菜单面板 -->
  <Transition name="slide-right">
    <div
      v-if="isOpen"
      class="md:hidden fixed top-0 right-0 z-50 w-72 h-full bg-white shadow-xl"
    >
      <div class="p-6">
        <!-- 菜单头部 -->
        <div class="flex items-center justify-between mb-8">
          <span class="text-lg font-bold text-slate-900">菜单</span>
          <button
            @click="isOpen = false"
            class="p-2 hover:bg-slate-50 rounded-full transition-all"
          >
            <span class="material-symbols-outlined text-slate-600">close</span>
          </button>
        </div>

        <!-- 导航链接 -->
        <nav class="space-y-1">
          <router-link
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            @click="isOpen = false"
            class="block px-4 py-3 rounded-xl text-[15px] font-medium transition-all"
            :class="
              $route.path === link.path
                ? 'bg-blue-50 text-blue-600'
                : 'text-slate-600 hover:bg-slate-50'
            "
          >
            {{ link.name }}
          </router-link>
        </nav>

        <!-- 分隔线 -->
        <div class="border-t border-slate-100 my-6"></div>

        <!-- 用户信息 -->
        <div class="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
          <img
            :src="profile.avatar"
            alt="Avatar"
            class="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div class="font-medium text-slate-900">{{ profile.name }}</div>
            <div class="text-sm text-slate-500">{{ profile.bio }}</div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from "vue";
import { useProfile } from "../composables/useProfile";

const { profile } = useProfile();
const isOpen = ref(false);

const navLinks = [
  { name: "首页", path: "/" },
  { name: "文章", path: "/articles" },
  { name: "个人", path: "/profile" },
  { name: "关于", path: "/about" },
];
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}
</style>
