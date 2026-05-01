import { reactive, onMounted, watch } from "vue";
import { useActivities } from "./useActivities"; // 导入 useActivities

const { addActivity } = useActivities(); // 获取 addActivity 方法

// 初始文章数据
const defaultArticles = [
  {
    title: "Vue 3 组合式 API 的最佳实践与陷阱规避",
    tag: "技术方案",
    date: "2026-04-30",
    readTime: "8 min read",
    readCount: 0, // 新增阅读计数
    desc: "深入解析如何利用组合式函数重构复杂组件逻辑。我们将探讨逻辑复用的新范式，以及如何避免常见的响应式状态丢失问题，构建可维护的大型应用。",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    content: [
      {
        title: "一、为什么选择组合式 API？",
        text: "组合式 API (Composition API) 不仅仅是 Vue 3 的一个新功能，它代表了前端逻辑组织方式的一次重大飞跃。相比于选项式 API (Options API)，它解决了大型组件逻辑碎片化的问题，让相关联的代码能够紧凑地聚合在一起。",
      },
      {
        title: "二、逻辑复用的艺术",
        text: "通过自定义 Hook (use-functions)，我们可以像拼乐高一样组合功能。这不仅提高了代码的可测试性，更实现了真正的逻辑跨组件复用。",
        code: "export function useMouse() {\\n  const x = ref(0)\\n  const y = ref(0)\\n  // ... 逻辑实现\\n  return { x, y }\\n}",
      },
      {
        title: "三、常见陷阱：响应式丢失",
        text: "很多初学者在解构 props 或 reactive 对象时会丢失响应式。使用 toRefs 或 toRef 是保持数据链接的关键。",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    title: "Tailwind CSS v4: 为什么你应该现在就开始迁移",
    tag: "前端前沿",
    date: "2026-04-28",
    readTime: "6 min read",
    readCount: 0,
    desc: "全新的 CSS-first 引擎，更快的构建速度，以及更简洁的配置方式。本文将带你领略 Tailwind CSS v4 的核心变化，并提供平滑迁移指南。",
    image:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=800&q=80",
    content: [
      {
        title: "一、全新的氧化引擎",
        text: "Tailwind CSS v4 采用了全新的氧化引擎 (Oxide engine)，构建速度提升了 10 倍以上。它不再依赖于繁琐的 JavaScript 配置文件，而是回归 CSS 本身。",
      },
      {
        title: "二、配置的终结",
        text: "在 v4 中，你可以在 CSS 文件中直接定义主题变量，利用 @theme 指令实现零配置启动。",
        code: '@theme {\\n  --color-primary: #3b82f6;\\n  --font-sans: "Inter", sans-serif;\\n}',
      },
      {
        title: "三、迁移建议",
        text: "虽然 v4 带来了巨大的性能提升，但如果你使用了大量复杂的自定义插件，建议先在小型项目中试水。对于大多数标准项目，迁移过程非常丝滑。",
      },
    ],
  },
  {
    title: "设计系统中的微动效：提升用户体验的秘诀",
    tag: "UI/UX 设计",
    date: "2026-04-25",
    readTime: "5 min read",
    readCount: 0,
    desc: "不仅仅是视觉上的点缀，微动效能提供关键的交互反馈。探索如何在不分散用户注意力的情况下，利用细腻的动画提升产品的整体高级感。",
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80",
    content: [
      {
        title: "一、动效的“目的性”",
        text: "好的动效应该是无形的。它不应该只是为了酷炫，而应该引导用户的视觉重心，或者解释界面的空间关系。",
      },
      {
        title: "二、物理法则的模拟",
        text: "通过缓动函数 (Easing functions) 模拟真实的物理惯性。避免使用生硬的线性动画，让每一个点击反馈都充满生命力。",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "三、性能考量",
        text: "优先使用 transform 和 opacity 属性进行动画，这样可以充分利用 GPU 加速，确保在各种设备上都能达到 60fps。",
      },
    ],
  },
  {
    title: "2026 年全栈开发者生存指南",
    tag: "职业发展",
    date: "2026-04-20",
    readTime: "12 min read",
    readCount: 0,
    desc: "在 AI 时代，全栈开发的定义正在发生变化。从云原生架构到大模型集成，我们需要掌握哪些核心竞争力才能保持领先？",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    content: [
      {
        title: "一、T 型人才的进化",
        text: "过去我们追求“全”，现在我们追求“深”。在掌握基础的后端技能之余，你需要在一个垂直领域（如实时通信、复杂可视化或安全）拥有专家级的见解。",
      },
      {
        title: "二、拥抱 AI 工作流",
        text: "AI 不会取代开发者，但使用 AI 的开发者会取代不使用的。学习如何编写高质量的提示词，利用 Copilot 提升编码效率是必修课。",
        code: "// 利用 AI 辅助生成的复杂正则\\nconst emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\\\.[a-zA-Z]{2,}$/;",
      },
      {
        title: "三、软技能的重要性",
        text: "沟通、共情和解决问题的能力在远程办公时代愈发重要。技术只是工具，创造价值才是核心。",
      },
    ],
  },
  {
    title: "TypeScript 高级技巧：利用类型体操优化 API 设计",
    tag: "技术深度",
    date: "2026-04-15",
    readTime: "10 min read",
    readCount: 0,
    desc: "超越基础的 Interface 和 Type。深入学习泛型约束、条件类型和映射类型，让你的 API 库不仅好用，而且类型安全到极致。",
    image:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=800&q=80",
    content: [
      {
        title: "一、泛型的威力",
        text: "泛型让我们的代码具备了处理多种数据类型的能力，同时保持严格的类型检查。它是构建高质量工具库的基石。",
      },
      {
        title: "二、条件类型 (Conditional Types)",
        text: "根据输入类型的不同，自动推导出输出类型。这让我们的 API 能够根据参数动态调整返回值的结构。",
        code: "type IsString<T> = T extends string ? true : false;",
      },
      {
        title: "三、映射类型与模版字符串",
        text: "TypeScript 的模版字符串类型让我们可以实现非常复杂的字符串操作，比如自动生成 API 路径或者 CSS 类名。",
      },
    ],
  },
  {
    title: "响应式设计的未来：超越媒体查询",
    tag: "Web 开发",
    date: "2026-04-10",
    readTime: "7 min read",
    readCount: 0,
    desc: "容器查询 (Container Queries) 已经到来。了解如何构建真正组件化的响应式布局，让 UI 组件在任何容器中都能完美呈现。",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    content: [
      {
        title: "一、媒体查询的局限性",
        text: "媒体查询基于视口 (Viewport) 大小，这在构建复杂的 Dashboard 或多级嵌套布局时显得力不从心。组件无法感知自己所在的实际容器大小。",
      },
      {
        title: "二、容器查询 (Container Queries)",
        text: "这是 Web 设计的一次革命。组件现在可以根据父容器的大小来改变自己的样式，实现了真正的样式隔离与封装。",
        code: ".card {\\n  container-type: inline-size;\\n}\\n@container (min-width: 400px) {\\n  .card-layout { display: flex; }\\n}",
      },
      {
        title: "三、设计思维的转变",
        text: "从“为页面设计”转向“为组件设计”。每一个组件都是一个自适应的小生态系统。",
      },
    ],
  },
];

// 创建一个响应式对象，用于存储文章列表
const articles = reactive([]);

// 保存文章到 localStorage
const saveArticlesToLocalStorage = () => {
  localStorage.setItem("blog_articles", JSON.stringify(articles));
};

export function useArticles() {
  onMounted(() => {
    const savedArticles = localStorage.getItem("blog_articles");
    if (savedArticles) {
      Object.assign(articles, JSON.parse(savedArticles));
    } else {
      Object.assign(articles, defaultArticles);
      saveArticlesToLocalStorage(); // 保存默认文章
    }
  });

  // 监听文章列表的任何变化，并保存到 localStorage
  watch(
    articles,
    () => {
      saveArticlesToLocalStorage();
    },
    { deep: true },
  );

  // 添加文章
  const addArticle = (newArticle) => {
    articles.unshift(newArticle);
  };

  // 更新文章
  const updateArticle = (index, updatedArticle) => {
    articles[index] = updatedArticle;
  };

  // 删除文章
  const removeArticle = (index) => {
    articles.splice(index, 1);
  };

  // 增加文章阅读计数
  const incrementReadCount = (index) => {
    if (articles[index]) {
      articles[index].readCount = (articles[index].readCount || 0) + 1;
    }
  };

  return {
    articles,
    addArticle,
    updateArticle,
    removeArticle,
    incrementReadCount,
  };
}
