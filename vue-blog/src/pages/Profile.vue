<template>
  <div>
    <div class="max-w-[1200px] mx-auto px-4 md:px-10 py-10 space-y-8">
      <!-- Top Profile Card -->
      <section
        class="glass-panel rounded-[24px] p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden"
      >
        <div class="relative">
          <div
            class="w-28 h-28 rounded-full border-4 border-white dark:border-slate-800 shadow-lg overflow-hidden"
          >
            <img
              :src="profile.avatar"
              alt="Avatar"
              class="w-full h-full object-cover"
            />
          </div>
          <div
            class="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-4 border-white dark:border-slate-800 rounded-full"
          ></div>
        </div>

        <div class="flex-1 text-center md:text-left space-y-3">
          <h1 class="text-3xl font-bold text-slate-900 dark:text-white">
            {{ profile.name }}
          </h1>
          <p class="text-slate-500 text-sm dark:text-slate-400">
            {{ profile.bio }}
          </p>
          <div class="flex flex-wrap justify-center md:justify-start gap-2">
            <span
              v-for="tag in profile.tags"
              :key="tag.label"
              :class="tag.bg + ' ' + tag.color"
              class="px-3 py-0.5 rounded-md text-xs font-semibold flex items-center justify-center"
            >
              {{ tag.label }}
            </span>
            <button
              @click="showTagModal = true"
              class="px-3 py-0.5 rounded-md text-xs font-semibold border border-dashed border-slate-300 dark:border-slate-600 text-slate-400 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/50 transition-all flex items-center justify-center"
            >
              + 添加
            </button>
          </div>
        </div>

        <button
          @click="showEditModal = true"
          class="px-8 py-2.5 bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/20 hover:scale-105 active:scale-95 transition-all"
        >
          编辑资料
        </button>
      </section>

      <!-- Stats Row -->
      <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="glass-panel rounded-[24px] p-8 flex flex-col items-center text-center group hover:-translate-y-1 transition-all duration-300"
        >
          <div
            :class="stat.iconBg"
            class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
          >
            <span
              class="material-symbols-outlined text-[28px]"
              :class="stat.iconColor"
              >{{ stat.icon }}</span
            >
          </div>
          <div class="text-2xl font-bold text-slate-900 dark:text-white">
            {{ stat.value }}
          </div>
          <div class="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {{ stat.label }}
          </div>
        </div>
      </section>

      <!-- Main Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Left Column -->
        <div class="lg:col-span-8 space-y-8">
          <!-- Project Showcase -->
          <section class="glass-panel rounded-[24px] p-8">
            <div class="flex justify-between items-center mb-8">
              <h2 class="text-xl font-bold text-slate-900 dark:text-white">
                项目展示
              </h2>
              <router-link
                to="/projects"
                class="text-blue-500 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
              >
                查看全部
                <span class="material-symbols-outlined text-sm"
                  >arrow_forward</span
                >
              </router-link>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div
                v-for="project in projects"
                :key="project.title"
                class="group cursor-pointer"
              >
                <div
                  class="rounded-2xl overflow-hidden mb-4 aspect-[16/10] relative shadow-sm border border-slate-100 dark:border-slate-800"
                >
                  <img
                    :src="project.image"
                    :alt="project.title"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h3
                  class="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors"
                >
                  {{ project.title }}
                </h3>
                <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {{ project.desc }}
                </p>
              </div>
            </div>
          </section>

          <!-- Achievements -->
          <section class="glass-panel rounded-[24px] p-8">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-8">
              我的成就
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                v-for="ach in achievements"
                :key="ach.title"
                class="p-6 rounded-2xl border border-slate-50 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/30 flex items-center gap-4 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition-all group"
              >
                <div
                  :class="ach.bg"
                  class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-transform group-hover:scale-110"
                >
                  <span class="material-symbols-outlined" :class="ach.color">{{
                    ach.icon
                  }}</span>
                </div>
                <div>
                  <h4 class="font-bold text-slate-900 dark:text-white">
                    {{ ach.title }}
                  </h4>
                  <p class="text-sm text-slate-500 dark:text-slate-400">
                    {{ ach.desc }}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- Right Column -->
        <div class="lg:col-span-4 space-y-8">
          <!-- Account Settings -->
          <section class="glass-panel rounded-[24px] p-8">
            <div class="flex items-center gap-3 mb-8">
              <span class="material-symbols-outlined text-blue-500"
                >settings</span
              >
              <h2 class="text-lg font-bold text-slate-900 dark:text-white">
                账户设置
              </h2>
            </div>
            <div class="space-y-1">
              <div
                v-for="(item, idx) in settings"
                :key="idx"
                @click="handleSettingClick(item)"
                class="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer group transition-all"
              >
                <div class="flex items-center gap-4">
                  <span
                    class="material-symbols-outlined text-slate-400 group-hover:text-blue-500 transition-colors"
                    >{{ item.icon }}</span
                  >
                  <span
                    class="text-sm font-medium text-slate-700 dark:text-slate-300"
                    >{{ item.label }}</span
                  >
                </div>
                <div
                  v-if="item.type === 'toggle'"
                  @click.stop="item.action"
                  class="w-10 h-5 rounded-full relative p-0.5 cursor-pointer transition-colors duration-300"
                  :class="
                    isDark ? 'bg-blue-500' : 'bg-slate-200 dark:bg-slate-700'
                  "
                >
                  <div
                    class="w-4 h-4 bg-white rounded-full shadow-sm absolute transition-all duration-300"
                    :style="{ left: isDark ? '22px' : '2px' }"
                  ></div>
                </div>
                <span
                  v-else
                  class="material-symbols-outlined text-slate-300 dark:text-slate-600 text-sm"
                  >chevron_right</span
                >
              </div>
            </div>
          </section>

          <!-- Premium Card -->
          <section
            class="rounded-[24px] p-8 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white space-y-6 shadow-xl shadow-purple-200 dark:shadow-none"
          >
            <h3 class="text-xl font-bold">升级至高级版</h3>
            <p class="text-sm text-white/80 leading-relaxed">
              解锁自定义域名、深度数据分析和优先技术支持。
            </p>
            <button
              @click="handleUpgrade"
              class="w-full py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-slate-50 transition-colors"
            >
              立即升级
            </button>
          </section>

          <!-- Recent Activity -->
          <section class="glass-panel rounded-[24px] p-8">
            <div class="flex items-center gap-3 mb-8">
              <span class="material-symbols-outlined text-pink-500"
                >history</span
              >
              <h2 class="text-lg font-bold text-slate-900 dark:text-white">
                最近活动
              </h2>
            </div>
            <div
              class="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800"
            >
              <div
                v-for="(act, idx) in activities"
                :key="idx"
                class="relative pl-8 group"
              >
                <div
                  :class="act.dotColor"
                  class="absolute left-0 top-1.5 w-6 h-6 rounded-full border-4 border-white dark:border-slate-900 shadow-sm flex items-center justify-center z-10"
                >
                  <div class="w-1.5 h-1.5 rounded-full bg-white"></div>
                </div>
                <div class="space-y-1">
                  <div
                    class="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 transition-colors"
                  >
                    {{ act.title }}
                  </div>
                  <div class="text-xs text-slate-400">{{ act.time }}</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <!-- Edit Modal -->
      <ProfileEditModal
        :show="showEditModal"
        :initial-data="{
          name: profile.name,
          bio: profile.bio,
          avatar: profile.avatar,
        }"
        @close="showEditModal = false"
        @save="updateProfile"
      />

      <!-- Tag Manager Modal -->
      <TagManagerModal
        :show="showTagModal"
        :initial-tags="profile.tags"
        @close="showTagModal = false"
        @save="handleSaveTags"
      />

      <!-- Security Modal -->
      <SecuritySettingsModal
        :show="showSecurityModal"
        @close="showSecurityModal = false"
      />

      <!-- Notification Modal -->
      <NotificationCenterModal
        :show="showNotificationModal"
        @close="showNotificationModal = false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useTheme } from "../composables/useTheme";
import { useProfile } from "../composables/useProfile";
import { useArticles } from "../composables/useArticles";
import ProfileEditModal from "../components/ProfileEditModal.vue";
import SecuritySettingsModal from "../components/SecuritySettingsModal.vue";
import NotificationCenterModal from "../components/NotificationCenterModal.vue";
import TagManagerModal from "../components/TagManagerModal.vue";

const { isDark, toggleTheme } = useTheme();
const { profile, updateProfile, updateFollowersCount, updateTotalReads } =
  useProfile();
const { articles } = useArticles();

const showEditModal = ref(false);
const showSecurityModal = ref(false);
const showNotificationModal = ref(false);
const showTagModal = ref(false);

// 动态计算已发布文章数量
const publishedArticlesCount = computed(() => articles.length);

// 动态计算累计阅读数量
const totalReads = computed(() =>
  articles.reduce((sum, article) => sum + (article.readCount || 0), 0),
);

const stats = computed(() => [
  {
    label: "已发布文章",
    value: publishedArticlesCount.value,
    icon: "description",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    label: "累计阅读",
    value: totalReads.value,
    icon: "visibility",
    iconBg: "bg-pink-50",
    iconColor: "text-pink-500",
  },
  {
    label: "关注者",
    value: profile.followersCount,
    icon: "group",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
  },
]);

const projects = [
  {
    title: "Nebula UI 框架",
    desc: "一套基于 Vue 3 的次世代设计系统组件库。",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "DataViz 可视化工具",
    desc: "让复杂的数据分析变得简单且富有美感。",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  },
];

const achievements = [
  {
    title: "优质创作者",
    desc: "连续30天发布高质量内容",
    icon: "workspace_premium",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    title: "代码布道者",
    desc: "开源项目星数突破 1000",
    icon: "code",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
];

const settings = [
  {
    icon: "person",
    label: "个人资料",
    action: () => {
      showEditModal.value = true;
    },
  },
  {
    icon: "lock",
    label: "账号安全",
    action: () => {
      showSecurityModal.value = true;
    },
  },
  {
    icon: "notifications",
    label: "通知中心",
    action: () => {
      showNotificationModal.value = true;
    },
  },
  { icon: "dark_mode", label: "深色模式", type: "toggle", action: toggleTheme },
];

const activities = [
  {
    title: "发布了新文章",
    time: "2 小时前 · 关于 Vue 3.4 新特性",
    dotColor: "bg-blue-500",
  },
  {
    title: "收到了新回复",
    time: "5 小时前 · 来自 @设计狮王",
    dotColor: "bg-pink-500",
  },
];

const handleSettingClick = (item) => {
  if (item.type !== "toggle" && item.action) {
    item.action();
  }
};

const handleUpgrade = () => {
  alert("感谢关注！高级版功能即将上线。");
};

const handleSaveTags = (tags) => {
  profile.tags = tags;
  localStorage.setItem("user_profile", JSON.stringify(profile));
  showTagModal.value = false;
};
</script>
