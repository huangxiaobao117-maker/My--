<template>
  <div class="max-w-[1200px] mx-auto px-4 md:px-10 py-16 space-y-24">
    <!-- Hero Section -->
    <section class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
      <div class="lg:col-span-5 relative group">
        <div
          class="absolute -inset-4 bg-gradient-to-tr from-blue-400 to-pink-400 opacity-20 blur-2xl group-hover:opacity-30 transition-opacity"
        ></div>
        <div
          class="relative rounded-[32px] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800"
        >
          <img
            :src="heroData.avatar"
            :alt="heroData.name"
            class="w-full h-full object-cover aspect-[4/5]"
          />
          <!-- Edit Overlay for Avatar -->
          <div
            v-if="isEditMode"
            @click="showHeroModal = true"
            class="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <span class="material-symbols-outlined text-white text-4xl mb-2"
              >edit_square</span
            >
            <span class="text-white font-bold">编辑基本资料</span>
          </div>
        </div>
      </div>
      <div class="lg:col-span-7 space-y-8">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-4">
            <h1 class="text-4xl md:text-5xl font-bold text-blue-500">
              你好，我是 {{ heroData.name }}
            </h1>
            <button
              v-if="isEditMode"
              @click="showHeroModal = true"
              class="p-2 rounded-xl bg-blue-50 text-blue-500 hover:bg-blue-100 transition-colors"
            >
              <span class="material-symbols-outlined text-[20px]">edit</span>
            </button>
          </div>
          <button
            @click="isEditMode = !isEditMode"
            :class="
              isEditMode
                ? 'bg-blue-500 text-white'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-400'
            "
            class="px-4 py-2 rounded-xl text-sm font-bold transition-all hover:scale-105 active:scale-95"
          >
            {{ isEditMode ? "完成编辑" : "进入编辑模式" }}
          </button>
        </div>
        <div
          class="space-y-6 text-slate-600 dark:text-slate-400 text-[16px] leading-[1.8]"
        >
          <p v-for="(p, index) in heroData.bio" :key="index">{{ p }}</p>
        </div>
      </div>
    </section>

    <!-- Tech Stack -->
    <section class="space-y-12">
      <div class="flex justify-center items-center gap-4 relative">
        <h2
          class="text-2xl font-bold text-center text-slate-900 dark:text-white"
        >
          技术栈与专业领域
        </h2>
        <button
          v-if="isEditMode"
          @click="openTechModal(null)"
          class="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        >
          <span class="material-symbols-outlined text-[20px]">add</span>
        </button>
      </div>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(tech, index) in techStack"
          :key="tech.name"
          class="glass-panel rounded-2xl p-8 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300 relative"
        >
          <div
            v-if="isEditMode"
            class="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <button
              @click="openTechModal(index)"
              class="p-1.5 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100"
            >
              <span class="material-symbols-outlined text-sm">edit</span>
            </button>
            <button
              @click="removeTech(index)"
              class="p-1.5 rounded-lg bg-pink-50 text-pink-500 hover:bg-pink-100"
            >
              <span class="material-symbols-outlined text-sm">delete</span>
            </button>
          </div>
          <div class="w-12 h-12 flex items-center justify-center mb-6">
            <span
              class="material-symbols-outlined text-3xl"
              :class="tech.color"
              >{{ tech.icon }}</span
            >
          </div>
          <h3 class="font-bold text-slate-900 dark:text-white mb-2">
            {{ tech.name }}
          </h3>
          <p class="text-[12px] text-slate-400 mb-6 leading-relaxed">
            {{ tech.desc }}
          </p>
          <div
            class="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-auto"
          >
            <div
              class="h-full bg-gradient-to-r"
              :class="tech.gradient"
              :style="{ width: tech.level + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Growth Path -->
    <section class="space-y-16">
      <div class="flex justify-center items-center gap-4">
        <h2
          class="text-2xl font-bold text-center text-slate-900 dark:text-white"
        >
          成长轨迹
        </h2>
        <button
          v-if="isEditMode"
          @click="openTimelineModal(null)"
          class="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        >
          <span class="material-symbols-outlined text-[20px]">add</span>
        </button>
      </div>
      <div
        class="max-w-4xl mx-auto space-y-12 relative before:absolute before:left-[21px] before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800"
      >
        <div
          v-for="(milestone, index) in milestones"
          :key="index"
          class="relative pl-16 group"
        >
          <div
            :class="milestone.dotColor"
            class="absolute left-0 top-1.5 w-11 h-11 rounded-full border-4 border-white dark:border-slate-950 shadow-md flex items-center justify-center z-10 transition-transform group-hover:scale-110"
          >
            <span class="material-symbols-outlined text-white text-[20px]">{{
              milestone.icon
            }}</span>
          </div>
          <div
            class="glass-panel rounded-2xl p-8 hover:shadow-lg transition-all relative"
          >
            <div
              v-if="isEditMode"
              class="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <button
                @click="openTimelineModal(index)"
                class="p-2 rounded-xl bg-blue-50 text-blue-500 hover:bg-blue-100"
              >
                <span class="material-symbols-outlined text-[18px]">edit</span>
              </button>
              <button
                @click="removeMilestone(index)"
                class="p-2 rounded-xl bg-pink-50 text-pink-500 hover:bg-pink-100"
              >
                <span class="material-symbols-outlined text-[18px]"
                  >delete</span
                >
              </button>
            </div>
            <span class="text-[13px] font-bold" :class="milestone.textColor">{{
              milestone.date
            }}</span>
            <h3
              class="text-xl font-bold text-slate-900 dark:text-white mt-2 mb-4"
            >
              {{ milestone.title }}
            </h3>
            <p
              class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed"
            >
              {{ milestone.desc }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <ContactCard />

    <!-- Modals -->
    <AboutHeroEditModal
      :show="showHeroModal"
      :initial-data="heroData"
      @close="showHeroModal = false"
      @save="saveHero"
    />
    <TechStackEditModal
      :show="showTechModal"
      :is-edit="!!currentEditIndex !== null"
      :initial-data="currentEditData"
      @close="showTechModal = false"
      @save="saveTech"
    />
    <TimelineEditModal
      :show="showTimelineModal"
      :is-edit="!!currentEditIndex !== null"
      :initial-data="currentEditData"
      @close="showTimelineModal = false"
      @save="saveMilestone"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import TechStackEditModal from "../components/TechStackEditModal.vue";
import TimelineEditModal from "../components/TimelineEditModal.vue";
import AboutHeroEditModal from "../components/AboutHeroEditModal.vue";
import ContactCard from "../components/ContactCard.vue";

const isEditMode = ref(false);
const showTechModal = ref(false);
const showTimelineModal = ref(false);
const showHeroModal = ref(false);
const currentEditIndex = ref(null);
const currentEditData = ref(null);

// Initial Data
const defaultHeroData = {
  name: "某某某",
  avatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCrP0o3oulwdlpTGuwTLrqYIca3v6uLIbBNejSfwbbBdnwPU-uDmUM7cbR1GSCabqt_ji2R7wkjS0AoXWYM3wHu6RHJPow5XUX-4c0t_98Q8kgTnK6bCS8NmHDtbbUqpJewmWgSel8hm_YTI0NH6Eq-O8QLTfBoK3YaLUr1F9B36_dWQ7vflUW7j-pHtxWFC_hT2wxtehZ6j-wjo2qGm7bGLqXMmjro8HF0cffGiaGJ08C72Qp3XI1fkCWO-DcHqUiGDe9ltZ17dQA",
  bio: [
    "我是一名热衷于构建次世代数字体验的全栈开发工程师与 UI 设计师。在代码与美学的交界处，我致力于寻找技术深度与用户感知之间的完美平衡。",
    "自 2018 年开始接触前端技术以来，我不仅沉溺于 Vue 3 与 TypeScript 带来的高效逻辑，更痴迷于通过 CSS 艺术与细腻动效构建出如丝般顺滑的交互界面。",
    "在这里，我分享我的技术洞察、设计心得以及关于生活点滴的感悟。希望我的文字与作品能为你带来灵感，或是在解决某个技术难题时助你一臂之力。",
  ],
};

const heroData = reactive({ ...defaultHeroData });

const defaultTechStack = [
  {
    name: "Vue.js",
    desc: "Vue 3 / Composition API / Vite",
    icon: "web",
    color: "text-blue-500",
    gradient: "from-blue-400 to-blue-600",
    level: 95,
  },
  {
    name: "TypeScript",
    desc: "Strongly Typed / Interface / Generics",
    icon: "code",
    color: "text-pink-500",
    gradient: "from-pink-400 to-pink-600",
    level: 90,
  },
  {
    name: "Tailwind CSS",
    desc: "Modern Styling / Design Tokens",
    icon: "palette",
    color: "text-blue-400",
    gradient: "from-blue-300 to-blue-500",
    level: 85,
  },
  {
    name: "Node.js",
    desc: "Express / NestJS / Prisma",
    icon: "terminal",
    color: "text-purple-500",
    gradient: "from-purple-400 to-purple-600",
    level: 80,
  },
];

const defaultMilestones = [
  {
    date: "2023 - 至今",
    title: "资深前端开发 & 独立创作者",
    desc: "专注于次世代 UI 系统开发，构建开源项目，并开始在主流技术社区分享深度架构文章。",
    icon: "rocket_launch",
    dotColor: "bg-blue-400",
    textColor: "text-blue-500",
  },
  {
    date: "2021 - 2023",
    title: "核心开发工程师 @ 某科技大厂",
    desc: "主导了企业级中台系统的 Vue 3 迁移工作，显著提升了页面渲染性能与团队开发效率。",
    icon: "domain",
    dotColor: "bg-pink-400",
    textColor: "text-pink-500",
  },
  {
    date: "2017 - 2021",
    title: "计算机科学与技术 学士",
    desc: "在校期间不仅掌握了扎实的计算机理论，还通过多个实践项目确立了对自研技术的热爱。",
    icon: "school",
    dotColor: "bg-purple-400",
    textColor: "text-purple-500",
  },
];

const techStack = reactive([]);
const milestones = reactive([]);

onMounted(() => {
  const savedHero = localStorage.getItem("about_hero");
  const savedTech = localStorage.getItem("about_tech");
  const savedMilestones = localStorage.getItem("about_timeline");

  if (savedHero) Object.assign(heroData, JSON.parse(savedHero));
  Object.assign(
    techStack,
    savedTech ? JSON.parse(savedTech) : defaultTechStack,
  );
  Object.assign(
    milestones,
    savedMilestones ? JSON.parse(savedMilestones) : defaultMilestones,
  );
});

watch(
  [heroData, techStack, milestones],
  () => {
    localStorage.setItem("about_hero", JSON.stringify(heroData));
    localStorage.setItem("about_tech", JSON.stringify(techStack));
    localStorage.setItem("about_timeline", JSON.stringify(milestones));
  },
  { deep: true },
);

const saveHero = (data) => {
  Object.assign(heroData, data);
};

const openTechModal = (index) => {
  currentEditIndex.value = index;
  currentEditData.value = index !== null ? { ...techStack[index] } : null;
  showTechModal.value = true;
};

const saveTech = (data) => {
  if (currentEditIndex.value !== null) {
    techStack[currentEditIndex.value] = data;
  } else {
    techStack.push(data);
  }
};

const removeTech = (index) => {
  if (confirm("确定要删除这项技术吗？")) {
    techStack.splice(index, 1);
  }
};

const openTimelineModal = (index) => {
  currentEditIndex.value = index;
  currentEditData.value = index !== null ? { ...milestones[index] } : null;
  showTimelineModal.value = true;
};

const saveMilestone = (data) => {
  if (currentEditIndex.value !== null) {
    milestones[currentEditIndex.value] = data;
  } else {
    milestones.unshift(data); // Add to top for timeline
  }
};

const removeMilestone = (index) => {
  if (confirm("确定要删除这段轨迹吗？")) {
    milestones.splice(index, 1);
  }
};

const socialIcons = ["alternate_email", "share", "image"];
</script>
