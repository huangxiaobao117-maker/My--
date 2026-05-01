<template>
  <div>
    <div class="max-w-[1200px] mx-auto px-4 md:px-10 py-16 space-y-16">
      <header class="text-center space-y-4 max-w-2xl mx-auto relative">
        <router-link
          to="/profile"
          class="absolute left-0 top-0 inline-flex items-center gap-2 text-slate-500 hover:text-blue-500 transition-colors group"
        >
          <span
            class="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform"
            >arrow_back</span
          >
          返回个人资料
        </router-link>
        <h1
          class="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight"
        >
          我的项目
        </h1>
        <p class="text-slate-500 dark:text-slate-400 text-lg">
          在这里管理和展示您的精彩项目。
        </p>
      </header>

      <div class="space-y-8">
        <!-- Project Categories -->
        <div class="flex flex-wrap justify-center gap-4">
          <button
            @click="selectedCategory = '所有项目'"
            :class="{
              'bg-blue-500 text-white': selectedCategory === '所有项目',
              'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400':
                selectedCategory !== '所有项目',
            }"
            class="px-5 py-2 rounded-full font-semibold transition-colors"
          >
            所有项目
          </button>
          <button
            v-for="category in uniqueCategories"
            :key="category"
            @click="selectedCategory = category"
            :class="{
              'bg-blue-500 text-white': selectedCategory === category,
              'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400':
                selectedCategory !== category,
            }"
            class="px-5 py-2 rounded-full font-semibold transition-colors"
          >
            {{ category }}
          </button>
        </div>

        <!-- Project List -->
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          <!-- Add New Project Card -->
          <div
            @click="openEditModal(null)"
            class="glass-panel rounded-[32px] p-8 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition-colors border-2 border-dashed border-slate-200 dark:border-slate-800"
          >
            <span class="material-symbols-outlined text-6xl text-blue-500 mb-4"
              >add_circle</span
            >
            <h3 class="text-xl font-bold text-slate-900 dark:text-white">
              上传新项目
            </h3>
            <p class="text-slate-500 dark:text-slate-400 text-sm mt-2">
              点击此处上传您的项目代码或文件夹
            </p>
          </div>

          <!-- Project Cards -->
          <article
            v-for="(project, index) in filteredProjects"
            :key="project.id"
            class="glass-panel rounded-[32px] overflow-hidden group hover:-translate-y-2 transition-all duration-500 relative flex flex-col h-full"
          >
            <!-- Edit Actions Overlay -->
            <div class="absolute top-4 right-4 z-10 flex gap-2">
              <button
                @click.stop="openEditModal(index)"
                class="w-9 h-9 rounded-full bg-white/90 dark:bg-slate-900/90 text-blue-500 shadow-lg flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all"
              >
                <span class="material-symbols-outlined text-[18px]">edit</span>
              </button>
              <button
                @click.stop="removeProject(index)"
                class="w-9 h-9 rounded-full bg-white/90 dark:bg-slate-900/90 text-pink-500 shadow-lg flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all"
              >
                <span class="material-symbols-outlined text-[18px]">delete</span>
              </button>
            </div>

            <!-- Cover Image -->
            <div class="aspect-[16/10] overflow-hidden relative">
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
              ></div>
            </div>

            <!-- Content -->
            <div class="p-8 flex flex-col flex-1 space-y-5">
              <div class="flex items-center gap-3">
                <span
                  class="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[11px] font-bold rounded-full uppercase tracking-wider"
                  >{{ project.category }}</span
                >
              </div>

              <h3
                class="text-xl font-bold text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2"
              >
                {{ project.title }}
              </h3>

              <p
                class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-3"
              >
                {{ project.desc }}
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>

    <!-- Project Edit Modal -->
    <ProjectEditModal
      :show="showProjectEditModal"
      :is-edit="currentEditProjectIndex !== null"
      :initial-data="currentEditProjectData"
      @close="showProjectEditModal = false"
      @save="saveProject"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import ProjectEditModal from "../components/ProjectEditModal.vue";
import { computed } from "vue";

const showProjectEditModal = ref(false);
const currentEditProjectIndex = ref(null);
const currentEditProjectData = ref(null);

const defaultProjects = [
  {
    id: "p1",
    title: "Nebula UI 框架",
    desc: "一套基于 Vue 3 的次世代设计系统组件库。",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    category: "前端开发",
    code: "<!-- Initial code for Nebula UI Framework -->\n<template>\n  <div>\n    <h1>Nebula UI</h1>\n    <p>A next-gen design system for Vue 3.</p>\n  </div>\n</template>\n\n<script setup>\n// ... code here\n<\/script>",
  },
  {
    id: "p2",
    title: "DataViz 可视化工具",
    desc: "让复杂的数据分析变得简单且富有美感。",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    category: "后端服务", // Changed to backend service for example
    code: "<!-- Initial code for DataViz Tool -->\n<template>\n  <div>\n    <h1>DataViz Tool</h1>\n    <p>Visualize your data beautifully.</p>\n  </div>\n</template>\n\n<script setup>\n// ... code here\n<\/script>",
  },
];

const projects = reactive([]);

const saveProjectsToLocalStorage = () => {
  localStorage.setItem("user_projects", JSON.stringify(projects));
};

onMounted(() => {
  const savedProjects = localStorage.getItem("user_projects");
  if (savedProjects) {
    Object.assign(projects, JSON.parse(savedProjects));
  } else {
    Object.assign(projects, defaultProjects);
    saveProjectsToLocalStorage(); // Save default projects on first load
  }
});

watch(
  projects,
  () => {
    saveProjectsToLocalStorage();
  },
  { deep: true },
);

const openEditModal = (index) => {
  if (index !== null) {
    currentEditProjectIndex.value = index;
    currentEditProjectData.value = { ...projects[index] };
  } else {
    currentEditProjectIndex.value = null;
    currentEditProjectData.value = null;
  }
  showProjectEditModal.value = true;
};

const saveProject = (projectData) => {
  if (currentEditProjectIndex.value !== null) {
    projects[currentEditProjectIndex.value] = { ...projectData };
  } else {
    // Generate a simple unique ID for new projects
    projectData.id =
      "p" +
      (projects.length > 0
        ? Math.max(...projects.map((p) => parseInt(p.id.substring(1)))) + 1
        : 1);
    projects.unshift(projectData); // Add new project to the beginning
  }
};

const selectedCategory = ref("所有项目");

const uniqueCategories = computed(() => {
  const categories = new Set(projects.map((p) => p.category));
  return Array.from(categories);
});

const filteredProjects = computed(() => {
  if (selectedCategory.value === "所有项目") {
    return projects;
  }
  return projects.filter(
    (project) => project.category === selectedCategory.value,
  );
});

const removeProject = (index) => {
  if (confirm("确定要删除这个项目吗？")) {
    projects.splice(index, 1);
  }
};
</script>

<style scoped>
/* Scoped styles for Projects page */
</style>
