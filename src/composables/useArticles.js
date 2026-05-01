import { reactive, onMounted, watch } from "vue";
import { useActivities } from "./useActivities";

const { addActivity } = useActivities();

// 初始文章数据
const defaultArticles = [
  {
    title: "Vue 3 组合式 API 的最佳实践与陷阱规避",
    tag: "技术方案",
    date: "2026-04-30",
    readTime: "8 min read",
    readCount: 0,
    desc: "深入解析如何利用组合式函数重构复杂组件逻辑。",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    tags: ["Vue 3", "组合式 API"],
    content: [
      {
        title: "一、为什么选择组合式 API？",
        text: "组合式 API (Composition API) 代表了前端逻辑组织方式的一次重大飞跃。",
      },
      {
        title: "二、逻辑复用的艺术",
        text: "通过自定义 Hook，我们可以像拼乐高一样组合功能。",
        code: "export function useMouse() { const x = ref(0); return { x, y }; }",
      },
      {
        title: "三、常见陷阱：响应式丢失",
        text: "使用 toRefs 或 toRef 是保持数据链接的关键。",
      },
    ],
  },
  {
    title: "Tailwind CSS v4: 为什么你应该现在就开始迁移",
    tag: "前端前沿",
    date: "2026-04-28",
    readTime: "6 min read",
    readCount: 0,
    desc: "全新的 CSS-first 引擎，更快的构建速度。",
    image:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=800&q=80",
    tags: ["CSS", "Tailwind"],
    content: [
      {
        title: "一、全新的氧化引擎",
        text: "Tailwind CSS v4 构建速度提升了 10 倍以上。",
      },
      {
        title: "二、配置的终结",
        text: "在 v4 中，你可以在 CSS 文件中直接定义主题变量。",
      },
    ],
  },
  {
    title: "设计系统中的微动效：提升用户体验的秘诀",
    tag: "UI/UX 设计",
    date: "2026-04-25",
    readTime: "5 min read",
    readCount: 0,
    desc: "微动效能提供关键的交互反馈。",
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80",
    tags: ["UI/UX", "动效"],
    content: [
      { title: "一、动效的目的性", text: "好的动效应引导用户的视觉重心。" },
    ],
  },
];

const articles = reactive([]);

export function useArticles() {
  onMounted(() => {
    const savedArticles = localStorage.getItem("blog_articles");
    if (savedArticles) {
      Object.assign(articles, JSON.parse(savedArticles));
    } else {
      Object.assign(articles, defaultArticles);
      localStorage.setItem("blog_articles", JSON.stringify(defaultArticles));
    }
  });

  watch(
    articles,
    () => {
      localStorage.setItem("blog_articles", JSON.stringify(articles));
    },
    { deep: true },
  );

  const addArticle = (newArticle) => {
    articles.unshift(newArticle);
    addActivity(`发布了新文章: ${newArticle.title}`);
  };

  const updateArticle = (index, updatedArticle) => {
    articles[index] = updatedArticle;
  };

  const removeArticle = (index) => {
    const title = articles[index]?.title || "未知文章";
    articles.splice(index, 1);
    addActivity(`删除了文章: ${title}`);
  };

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
